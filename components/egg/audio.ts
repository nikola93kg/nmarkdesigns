/**
 * Procedural sound engine for the hidden "Flappy Flight" easter egg.
 *
 * All audio is synthesised with the Web Audio API (no files to download or
 * cache). The AudioContext is created lazily on the first user gesture so
 * mobile autoplay policies are respected, and the mute preference lives in
 * localStorage. Kept framework-free so it can be used from plain canvas code.
 */

export type EggSoundName = "flap" | "score" | "crash" | "start" | "unmute";

const STORAGE_KEY = "coolBotMuted";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;

try {
  muted = localStorage.getItem(STORAGE_KEY) === "1";
} catch {
  /* private mode */
}

function ensureContext(): AudioContext | null {
  if (!ctx) {
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

interface ToneOptions {
  type?: OscillatorType;
  from: number;
  to?: number;
  duration: number;
  gain?: number;
  delay?: number;
}

function tone({ type = "square", from, to, duration, gain = 0.16, delay = 0 }: ToneOptions) {
  const audio = ensureContext();
  if (!audio || !master || muted) return;
  const start = audio.currentTime + delay;
  const osc = audio.createOscillator();
  const env = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(20, from), start);
  if (to !== undefined) osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), start + duration);
  env.gain.setValueAtTime(0.0001, start);
  env.gain.exponentialRampToValueAtTime(gain, start + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(env).connect(master);
  osc.start(start);
  osc.stop(start + duration + 0.03);
}

function noise(duration: number, gain = 0.22, filterHz = 1400, delay = 0) {
  const audio = ensureContext();
  if (!audio || !master || muted) return;
  const start = audio.currentTime + delay;
  const frames = Math.floor(audio.sampleRate * duration);
  const buffer = audio.createBuffer(1, frames, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  const source = audio.createBufferSource();
  source.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(filterHz, start);
  filter.frequency.exponentialRampToValueAtTime(220, start + duration);
  const env = audio.createGain();
  env.gain.setValueAtTime(gain, start);
  env.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter).connect(env).connect(master);
  source.start(start);
}

const voices: Record<EggSoundName, () => void> = {
  // airy wing flap
  flap: () => {
    tone({ type: "triangle", from: 620, to: 300, duration: 0.11, gain: 0.13 });
    noise(0.07, 0.08, 900);
  },
  // two-note chime when a tower is cleared
  score: () => {
    tone({ type: "square", from: 880, duration: 0.09, gain: 0.1 });
    tone({ type: "square", from: 1320, duration: 0.13, gain: 0.1, delay: 0.08 });
  },
  // frosty crash with a descending slide
  crash: () => {
    noise(0.3, 0.3, 2200);
    tone({ type: "sawtooth", from: 320, to: 60, duration: 0.45, gain: 0.16, delay: 0.04 });
  },
  // launch arpeggio
  start: () => {
    [523, 659, 784].forEach((hz, i) =>
      tone({ type: "triangle", from: hz, duration: 0.12, gain: 0.11, delay: i * 0.07 }),
    );
  },
  // confirmation blip after unmuting
  unmute: () => tone({ type: "sine", from: 700, to: 1100, duration: 0.16, gain: 0.12 }),
};

export function playEggSound(name: EggSoundName) {
  voices[name]();
}

export function isEggMuted(): boolean {
  return muted;
}

/** Flip the preference; unmuting plays a blip so the user hears it works. */
export function toggleEggMute(): boolean {
  muted = !muted;
  try {
    localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (!muted) playEggSound("unmute");
  return muted;
}

/** Call from the first pointer/key gesture so mobile browsers unlock audio. */
export function primeEggAudio() {
  ensureContext();
}
