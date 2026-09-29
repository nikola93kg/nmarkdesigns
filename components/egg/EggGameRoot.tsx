"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Music2, Music4, Pause, Play, RotateCcw, X } from "lucide-react";
import { playEggSound, primeEggAudio, toggleEggMute } from "@/components/egg/audio";
import type { Locale } from "@/lib/i18n";

const AVATAR_URL =
  "https://d2lm3begjhzc49.cloudfront.net/chat-uploads/chat/user/6aac5cd8178660133e3235fd/6aba3848022aebc64a1e0ce4/fc523915-ChatGPT_______25._____2026._23_08_54.png";

/* ------------------------------------------------------------------ *
 * Copy — the easter egg is bilingual, like the rest of the site
 * ------------------------------------------------------------------ */

const copy = {
  sr: {
    eyebrow: "COOL FRIDGE GUYS",
    title: "Flappy Flight",
    badge: "ROBOT IZDANJE",
    score: "POENI",
    best: "REKORD",
    start: "Letimo",
    loading: "Učitavanje avatara…",
    retry: "Pokušaj ponovo",
    resume: "Nastavi let",
    readyTitle: "Ohladi se. Leti visoko.",
    readyBody: "Proletni između zamrznutih tornjeva.",
    hint: "Savet: duži pritisak daje jači zamah.",
    pauseTitle: "Let je pauziran",
    pauseBody: "Daahni malo — tvoj let te čeka.",
    overTitle: "Dobar let!",
    newBest: "Novi rekord!",
    cleared: (score: number) => `${score} tornjeva proleteno.`,
    again: "Još jednom",
    footer: "RAZMAK / ↑ / DODIR za lete · P pauza · M zvuk · R restart",
    saved: "Najbolji rezultat se čuva u ovom pregledaču.",
    close: "Zatvori igricu i vrati se na studiju slučaja",
    mute: "Isključi zvuk",
    unmute: "Uključi zvuk",
    pauseAria: "Pauziraj igricu",
    resumeAria: "Nastavi igricu",
    restartAria: "Ponovo pokreni igricu",
    canvasLabel: "Flappy Flight. Razmak, strelica gore, klik ili dodir za let. P za pauzu, M za zvuk.",
  },
  en: {
    eyebrow: "COOL FRIDGE GUYS",
    title: "Flappy Flight",
    badge: "ROBOT EDITION",
    score: "SCORE",
    best: "BEST",
    start: "Let's fly",
    loading: "Loading avatar…",
    retry: "Retry avatar",
    resume: "Resume flight",
    readyTitle: "Stay cool. Fly high.",
    readyBody: "Navigate the frozen towers.",
    hint: "Tip: hold a little longer for a stronger flap.",
    pauseTitle: "Flight paused",
    pauseBody: "Take a breather — your flight is waiting.",
    overTitle: "Nice flight!",
    newBest: "New best!",
    cleared: (score: number) => `${score} towers cleared.`,
    again: "Fly again",
    footer: "SPACE / ↑ / TAP to fly · P pause · M sound · R restart",
    saved: "Your best score is saved on this browser.",
    close: "Close the game and return to the case study",
    mute: "Mute sound",
    unmute: "Unmute sound",
    pauseAria: "Pause the game",
    resumeAria: "Resume the game",
    restartAria: "Restart the game",
    canvasLabel: "Flappy Flight. Space, arrow up, click or tap to fly. P to pause, M for sound.",
  },
} as const;

/* ------------------------------------------------------------------ *
 * Virtual board size + physics. The canvas scales to fit, so desktop,
 * tablet and phone all share one coordinate system.
 * ------------------------------------------------------------------ */

const VW = 420;
const VH = 600;
const FLOOR = 560;
const ROBOT_X = 105;
const ROBOT_R = 23;
const GRAVITY = 880;
const FLAP = -315;
const HOLD_FLAP = -372; // stronger initial pop while the input is held
const HOLD_MAX = 0.26; // seconds of charge before lift caps out
const TOWER_W = 65;
const BEST_KEY = "coolBotBest";

type GameState = "ready" | "playing" | "paused" | "dead";

interface Tower {
  x: number;
  top: number;
  gap: number;
  passed: boolean;
  seed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  warm: boolean;
}

interface World {
  state: GameState;
  y: number;
  vy: number;
  score: number;
  best: number;
  towers: Tower[];
  particles: Particle[];
  spawn: number;
  clock: number;
  last: number;
  deadAt: number;
  holding: boolean;
  holdTime: number;
  shake: number;
  flash: number;
  pop: number;
  scale: number;
  loaded: boolean;
  raf: number;
}

interface Hud {
  state: GameState;
  score: number;
  best: number;
  newBest: boolean;
  phase: "loading" | "ready" | "error";
}

export function EggGameRoot({ locale, backHref }: { locale: Locale; backHref: string }) {
  const t = copy[locale];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement | null>(null);
  const apiRef = useRef<{ flap: () => void; pause: () => void; reset: () => void } | null>(null);

  const [hud, setHud] = useState<Hud>({ state: "ready", score: 0, best: 0, newBest: false, phase: "loading" });
  const [muted, setMuted] = useState(false);

  const world = useRef<World>({
    state: "ready",
    y: 280,
    vy: 0,
    score: 0,
    best: 0,
    towers: [],
    particles: [],
    spawn: 0.9,
    clock: 0,
    last: 0,
    deadAt: 0,
    holding: false,
    holdTime: 0,
    shake: 0,
    flash: 0,
    pop: 0,
    scale: 1,
    loaded: false,
    raf: 0,
  });

  /* ------------------------------- engine -------------------------------- */

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const w = world.current;
    let cancelled = false;

    try {
      w.best = Number(localStorage.getItem(BEST_KEY)) || 0;
    } catch {
      w.best = 0;
    }
    setHud((prev) => ({ ...prev, best: w.best }));

    /* -------- flow -------- */

    const reset = () => {
      w.state = "playing";
      w.y = 275;
      w.vy = FLAP;
      w.score = 0;
      w.towers = [];
      w.particles = [];
      w.spawn = 0.9;
      w.holding = false;
      w.holdTime = 0;
      w.shake = 0;
      w.flash = 0;
      w.pop = 0;
      playEggSound("start");
      setHud((prev) => ({ ...prev, state: "playing", score: 0, newBest: false }));
    };

    const burst = (count: number, upward: boolean) => {
      for (let i = 0; i < count; i += 1) {
        w.particles.push({
          x: ROBOT_X - 10 + Math.random() * 10,
          y: w.y + (upward ? 12 : Math.random() * 22 - 11),
          vx: -(45 + Math.random() * 130),
          vy: upward ? 25 + Math.random() * 70 : (Math.random() - 0.5) * 280,
          life: 0.4 + Math.random() * 0.35,
          size: 1.4 + Math.random() * 2.6,
          warm: !upward && Math.random() > 0.62,
        });
      }
    };

    const die = () => {
      if (w.state !== "playing") return;
      w.state = "dead";
      w.deadAt = performance.now();
      w.shake = 1;
      w.flash = 1;
      burst(18, false);
      playEggSound("crash");
      const record = w.score > w.best;
      if (record) {
        w.best = w.score;
        try {
          localStorage.setItem(BEST_KEY, String(w.best));
        } catch {
          /* storage unavailable */
        }
      }
      setHud((prev) => ({ ...prev, state: "dead", score: w.score, best: w.best, newBest: record && w.score > 0 }));
    };

    const pause = () => {
      if (w.state === "playing") {
        w.state = "paused";
        w.holding = false;
        setHud((prev) => ({ ...prev, state: "paused" }));
      } else if (w.state === "paused") {
        w.state = "playing";
        w.last = performance.now();
        setHud((prev) => ({ ...prev, state: "playing" }));
      }
    };

    const flap = () => {
      primeEggAudio();
      if (w.state === "playing") {
        w.vy = HOLD_FLAP;
        w.holdTime = 0;
        playEggSound("flap");
        burst(5, true);
        return;
      }
      if (w.state === "ready") {
        reset();
        playEggSound("flap");
        return;
      }
      if (w.state === "dead" && performance.now() - w.deadAt > 450) {
        reset();
        playEggSound("flap");
        return;
      }
      if (w.state === "paused") pause();
    };

    apiRef.current = { flap, pause, reset };

    /* -------- responsive sizing -------- */

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const rect = stage.getBoundingClientRect();
      const scale = Math.max(0.2, Math.min(rect.width / VW, rect.height / VH));
      w.scale = scale;
      canvas.style.width = `${Math.round(VW * scale)}px`;
      canvas.style.height = `${Math.round(VH * scale)}px`;
      canvas.width = Math.round(VW * scale * dpr);
      canvas.height = Math.round(VH * scale * dpr);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    window.addEventListener("orientationchange", resize);

    /* -------- keyboard -------- */

    const liftKeys = ["Space", "ArrowUp", "KeyW"];
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "BUTTON" && event.code === "Space") return; // native button activation
      if (liftKeys.includes(event.code)) {
        event.preventDefault();
        if (!event.repeat) {
          w.holding = true;
          flap();
        }
        return;
      }
      if (event.repeat) return;
      if (event.code === "KeyP") pause();
      if (event.code === "KeyM") setMuted(toggleEggMute());
      if (event.code === "KeyR" && w.state !== "ready") reset();
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (liftKeys.includes(event.code)) w.holding = false;
    };
    const onVisibility = () => {
      if (document.hidden && w.state === "playing") pause();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("visibilitychange", onVisibility);

    /* -------- avatar -------- */

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      w.loaded = true;
      setHud((prev) => (prev.phase === "loading" ? { ...prev, phase: "ready" } : prev));
    };
    image.onerror = () => setHud((prev) => ({ ...prev, phase: "error" }));
    image.src = AVATAR_URL;
    avatarRef.current = image;

    /* -------- simulation -------- */

    const collides = (px: number, py: number, pw: number, ph: number) => {
      const nx = Math.max(px, Math.min(ROBOT_X, px + pw));
      const ny = Math.max(py, Math.min(w.y, py + ph));
      const dx = ROBOT_X - nx;
      const dy = w.y - ny;
      const r = ROBOT_R - 2; // forgiving hitbox
      return dx * dx + dy * dy < r * r;
    };

    const update = (dt: number) => {
      w.clock += dt;
      if (w.shake > 0) w.shake = Math.max(0, w.shake - dt * 3.2);
      if (w.flash > 0) w.flash = Math.max(0, w.flash - dt * 2.4);
      if (w.pop > 0) w.pop = Math.max(0, w.pop - dt * 1.6);

      w.particles = w.particles.filter((p) => (p.life -= dt) > 0);
      for (const p of w.particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 260 * dt;
      }

      if (w.state !== "playing") return;

      if (w.holding) {
        w.holdTime = Math.min(HOLD_MAX, w.holdTime + dt);
        const target = -700 - 200 * (w.holdTime / HOLD_MAX);
        w.vy += (target - w.vy) * Math.min(1, dt * 9);
      } else {
        w.vy += GRAVITY * dt;
      }
      w.y += w.vy * dt;

      const difficulty = Math.min(w.score / 22, 1);
      const speed = 155 + difficulty * 70;
      const gap = 182 - difficulty * 34;

      w.spawn -= dt;
      if (w.spawn <= 0) {
        const margin = 96;
        w.towers.push({
          x: VW + 30,
          top: margin + Math.random() * Math.max(40, FLOOR - gap - margin * 2),
          gap,
          passed: false,
          seed: Math.random(),
        });
        w.spawn = Math.max(1.05, 1.65 - difficulty * 0.45);
      }

      for (const tower of w.towers) {
        tower.x -= speed * dt;
        if (!tower.passed && tower.x + TOWER_W / 2 < ROBOT_X - ROBOT_R) {
          tower.passed = true;
          w.score += 1;
          w.pop = 1;
          playEggSound("score");
          setHud((prev) => ({ ...prev, score: w.score, best: w.best }));
        }
        if (
          collides(tower.x - 5, 0, TOWER_W + 10, tower.top) ||
          collides(tower.x - 5, tower.top + tower.gap, TOWER_W + 10, FLOOR - tower.top - tower.gap)
        ) {
          die();
          return;
        }
      }
      w.towers = w.towers.filter((tower) => tower.x > -120);

      if (w.y - ROBOT_R < 0) {
        w.y = ROBOT_R;
        w.vy = Math.max(w.vy, 60);
      }
      if (w.y + ROBOT_R >= FLOOR) {
        w.y = FLOOR - ROBOT_R;
        die();
      }
    };

    /* -------- drawing -------- */

    const circle = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawBackground = () => {
      const sky = ctx.createLinearGradient(0, 0, 0, VH);
      sky.addColorStop(0, "#0b2b4d");
      sky.addColorStop(0.55, "#175f88");
      sky.addColorStop(1, "#2c93b6");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, VW, VH);

      // aurora band — quiet nod to the portfolio violet accent
      ctx.save();
      ctx.globalAlpha = 0.15;
      const aurora = ctx.createLinearGradient(0, 0, VW, 0);
      aurora.addColorStop(0, "#ab7eff");
      aurora.addColorStop(0.5, "#6fe3ff");
      aurora.addColorStop(1, "#ab7eff");
      ctx.fillStyle = aurora;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(VW, 0);
      for (let x = VW; x >= 0; x -= 12) ctx.lineTo(x, 116 + Math.sin(x / 62 + w.clock * 0.5) * 26);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // moon glow
      ctx.fillStyle = "#eaf9ff14";
      circle(350, 76, 36);
      ctx.fillStyle = "#f4fdff2b";
      circle(350, 76, 22);

      // three parallax snow layers
      const counts = [26, 20, 14];
      const rates = [10, 22, 38];
      const tints = ["#bcecff30", "#dff6ff55", "#ffffff88"];
      for (let layer = 0; layer < 3; layer += 1) {
        ctx.fillStyle = tints[layer];
        for (let i = 0; i < counts[layer]; i += 1) {
          let drift = (i * 97 - w.clock * rates[layer] + layer * 4000) % (VW + 40);
          if (drift < 0) drift += VW + 40;
          const y = ((i * 149 + layer * 61) % 520) + Math.sin(w.clock * 0.8 + i) * 6;
          circle(drift - 20, y, layer + 0.6);
        }
      }

      // distant ice ridges
      ctx.fillStyle = "#75c5df26";
      for (let i = 0; i < 9; i += 1) {
        let base = (i * 80 - w.clock * 12) % (VW + 160);
        if (base < 0) base += VW + 160;
        base -= 80;
        ctx.beginPath();
        ctx.moveTo(base - 60, FLOOR);
        ctx.lineTo(base + 12, 352 + (i % 3) * 34);
        ctx.lineTo(base + 96, FLOOR);
        ctx.fill();
      }
    };

    const drawTower = (tower: Tower) => {
      const { x, top, gap } = tower;
      const gradient = ctx.createLinearGradient(x, 0, x + TOWER_W, 0);
      gradient.addColorStop(0, "#125f8c");
      gradient.addColorStop(0.42, "#6adcee");
      gradient.addColorStop(0.75, "#3fa9cd");
      gradient.addColorStop(1, "#1d7ba9");
      ctx.fillStyle = gradient;
      ctx.fillRect(x, 0, TOWER_W, top);
      ctx.fillRect(x, top + gap, TOWER_W, FLOOR - top - gap);

      // frost speckles, deterministic per tower
      ctx.fillStyle = "#ffffff2b";
      const lowerTop = top + gap + 20;
      const lowerHeight = Math.max(16, FLOOR - lowerTop - 24);
      for (let i = 0; i < 7; i += 1) {
        const sx = x + 8 + ((tower.seed * 977 + i * 53) % (TOWER_W - 16));
        if (top > 36) ctx.fillRect(sx, 12 + ((tower.seed * 311 + i * 137) % (top - 36)), 3, 3);
        ctx.fillRect(sx, lowerTop + ((tower.seed * 733 + i * 91) % lowerHeight), 3, 3);
      }

      // icy rims
      ctx.fillStyle = "#a8f2ff";
      ctx.fillRect(x - 5, top - 17, TOWER_W + 10, 17);
      ctx.fillRect(x - 5, top + gap, TOWER_W + 10, 17);
      ctx.fillStyle = "#ffffff55";
      ctx.fillRect(x - 5, top - 17, TOWER_W + 10, 4);
      ctx.fillRect(x - 5, top + gap, TOWER_W + 10, 4);

      // vertical sheen
      ctx.fillStyle = "#ffffff2e";
      ctx.fillRect(x + 10, 0, 5, Math.max(0, top - 17));
      ctx.fillRect(x + 10, top + gap + 17, 5, Math.max(0, FLOOR - top - gap - 17));
    };

    const drawGround = () => {
      ctx.fillStyle = "#9bedfa";
      ctx.fillRect(0, FLOOR, VW, 5);
      ctx.fillStyle = "#123650";
      ctx.fillRect(0, FLOOR + 5, VW, VH - FLOOR - 5);
      ctx.fillStyle = "#3a738c";
      const offset = (w.clock * 42) % 34;
      for (let i = -1; i < 14; i += 1) ctx.fillRect(i * 34 - offset, 578, 18, 3);
      ctx.fillStyle = "#ffffff12";
      for (let i = -1; i < 14; i += 1) ctx.fillRect(i * 34 - offset + 9, 590, 8, 2);
    };

    const drawRobot = () => {
      const bob = w.state === "ready" || w.state === "paused" ? 280 + Math.sin(w.clock * 3) * 9 : w.y;
      const tilt =
        w.state === "playing"
          ? Math.max(-0.42, Math.min(1.15, w.vy / 620))
          : w.state === "dead"
            ? 1.2
            : Math.sin(w.clock * 3) * 0.06;

      if (w.state === "playing") {
        ctx.fillStyle = "#8ef0ff20";
        for (let i = 1; i <= 4; i += 1) circle(ROBOT_X - i * 13, bob + (w.vy / 900) * i * 10, ROBOT_R - i * 4);
      }

      for (const p of w.particles) {
        const alpha = Math.round(Math.max(0, Math.min(1, p.life * 1.8)) * 220)
          .toString(16)
          .padStart(2, "0");
        ctx.fillStyle = `${p.warm ? "#ffd27a" : "#bff3ff"}${alpha}`;
        circle(p.x, p.y, p.size * Math.max(0.2, p.life * 2));
      }

      ctx.save();
      ctx.translate(ROBOT_X, bob);
      ctx.rotate(tilt);

      if (w.holding && w.state === "playing" && w.holdTime > 0.02) {
        ctx.strokeStyle = "#ffe27acc";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, ROBOT_R + 8, -Math.PI / 2, -Math.PI / 2 + (w.holdTime / HOLD_MAX) * Math.PI * 2);
        ctx.stroke();
      }

      ctx.shadowColor = "#42d8ff";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "#85eaff";
      circle(0, 0, ROBOT_R + 3);
      ctx.shadowBlur = 0;

      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, ROBOT_R, 0, Math.PI * 2);
      ctx.clip();
      const avatar = avatarRef.current;
      if (w.loaded && avatar) ctx.drawImage(avatar, 65, 65, 1120, 1120, -ROBOT_R, -ROBOT_R, ROBOT_R * 2, ROBOT_R * 2);
      else {
        ctx.fillStyle = "#1d5f83";
        ctx.fillRect(-ROBOT_R, -ROBOT_R, ROBOT_R * 2, ROBOT_R * 2);
        ctx.fillStyle = "#85eaff";
        circle(0, 0, ROBOT_R * 0.5);
      }
      ctx.restore();

      ctx.strokeStyle = "#eafcff88";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, ROBOT_R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const pixelScale = w.scale * dpr;
      ctx.setTransform(pixelScale, 0, 0, pixelScale, 0, 0);
      ctx.save();
      if (w.shake > 0) {
        const amp = w.shake * 7;
        ctx.translate((Math.random() - 0.5) * amp, (Math.random() - 0.5) * amp);
      }
      drawBackground();
      for (const tower of w.towers) drawTower(tower);
      drawGround();
      drawRobot();

      if (w.pop > 0) {
        const alpha = Math.round(Math.min(1, w.pop) * 230)
          .toString(16)
          .padStart(2, "0");
        ctx.fillStyle = `#eafcff${alpha}`;
        ctx.font = "700 26px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("+1", ROBOT_X + 74, w.y - 24 - (1 - w.pop) * 44);
      }
      if (w.flash > 0.7) {
        const alpha = Math.round((w.flash - 0.7) * 130)
          .toString(16)
          .padStart(2, "0");
        ctx.fillStyle = `#ffffff${alpha}`;
        ctx.fillRect(0, 0, VW, VH);
      }
      ctx.restore();
    };

    const frame = (time: number) => {
      if (cancelled) return;
      const dt = Math.min((time - w.last) / 1000 || 0, 1 / 30);
      w.last = time;
      if (w.state !== "paused") update(dt);
      render();
      w.raf = requestAnimationFrame(frame);
    };
    w.last = performance.now();
    w.raf = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(w.raf);
      observer.disconnect();
      window.removeEventListener("orientationchange", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("visibilitychange", onVisibility);
      image.onload = null;
      image.onerror = null;
      apiRef.current = null;
    };
  }, []);

  /* ------------------------------- pointer ------------------------------- */

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.button > 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    world.current.holding = true;
    apiRef.current?.flap();
  };
  const releaseHold = () => {
    world.current.holding = false;
  };

  /* ------------------------------- overlay ------------------------------- */

  const showPanel = hud.state !== "playing";
  const startDisabled = hud.state === "ready" && hud.phase === "loading";
  const startLabel =
    hud.state === "paused"
      ? t.resume
      : hud.state === "dead"
        ? t.again
        : hud.phase === "loading"
          ? t.loading
          : hud.phase === "error"
            ? t.retry
            : t.start;
  const panelTitle =
    hud.state === "paused"
      ? t.pauseTitle
      : hud.state === "dead"
        ? hud.newBest
          ? `${t.overTitle} ${t.newBest}`
          : t.overTitle
        : t.readyTitle;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#071323]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full w-full max-w-[560px] flex-col gap-3 p-3 sm:p-5">
        <header className="flex items-center justify-between gap-3 text-white">
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.2em] text-[#85b8d5]">{t.eyebrow}</p>
            <h2 className="truncate text-xl font-bold tracking-tight sm:text-2xl">{t.title}</h2>
          </div>
          <nav aria-label={t.title} className="flex shrink-0 items-center gap-2">
            <span className="hidden rounded-full border border-[#315371] px-3 py-1.5 text-xs text-[#92e6ff] md:inline">
              {t.badge}
            </span>
            <button
              type="button"
              onClick={() => setMuted(toggleEggMute())}
              aria-label={muted ? t.unmute : t.mute}
              aria-pressed={muted}
              className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-[#315371] text-[#92e6ff] transition hover:border-[#6fe3ff] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {muted ? <Music2 aria-hidden="true" size={18} /> : <Music4 aria-hidden="true" size={18} />}
            </button>
            <button
              type="button"
              onClick={() => apiRef.current?.pause()}
              aria-label={hud.state === "paused" ? t.resumeAria : t.pauseAria}
              disabled={hud.state === "ready" || hud.state === "dead"}
              className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-[#315371] text-[#92e6ff] transition hover:border-[#6fe3ff] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40"
            >
              {hud.state === "paused" ? <Play aria-hidden="true" size={18} /> : <Pause aria-hidden="true" size={18} />}
            </button>
            <button
              type="button"
              onClick={() => {
                primeEggAudio();
                apiRef.current?.reset();
              }}
              aria-label={t.restartAria}
              className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-[#315371] text-[#92e6ff] transition hover:border-[#6fe3ff] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <RotateCcw aria-hidden="true" size={18} />
            </button>
            <Link
              href={backHref}
              aria-label={t.close}
              className="grid min-h-11 min-w-11 place-items-center rounded-xl bg-[#6fe3ff] text-[#092036] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X aria-hidden="true" size={20} />
            </Link>
          </nav>
        </header>

        <div
          ref={stageRef}
          className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-3xl border border-[#427697] bg-[#0d2d50] shadow-[0_25px_90px_rgba(0,0,0,0.5)]"
        >
          <canvas
            ref={canvasRef}
            tabIndex={0}
            role="application"
            aria-label={t.canvasLabel}
            onPointerDown={onPointerDown}
            onPointerUp={releaseHold}
            onPointerCancel={releaseHold}
            onContextMenu={(event) => event.preventDefault()}
            className="block touch-none select-none outline-none"
          />

          <div className="pointer-events-none absolute left-5 top-4 right-5 flex justify-between text-[10px] tracking-[0.2em] text-[#bde9ff]">
            <div>
              {t.score}
              <b className="block text-[24px] tracking-normal text-white sm:text-[26px]">{hud.score}</b>
            </div>
            <div className="text-right">
              {t.best}
              <b className="block text-[24px] tracking-normal text-white sm:text-[26px]">{hud.best}</b>
            </div>
          </div>

          {showPanel && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071b33]/75 p-6 text-center backdrop-blur-[3px]">
              <img
                src={AVATAR_URL}
                alt=""
                aria-hidden="true"
                width={112}
                height={112}
                className="h-20 w-20 rounded-full object-cover shadow-[0_0_38px_rgba(54,202,255,0.55)] sm:h-24 sm:w-24"
              />
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">{panelTitle}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#c6e6f7]">
                {hud.state === "paused" ? (
                  t.pauseBody
                ) : hud.state === "dead" ? (
                  <>
                    {t.cleared(hud.score)} {t.best}: <strong className="text-white">{hud.best}</strong>
                  </>
                ) : (
                  <>
                    {t.readyBody}
                    <br />
                    <span className="text-[#8aa8be]">{t.hint}</span>
                  </>
                )}
              </p>
              <button
                type="button"
                disabled={startDisabled}
                onClick={() => {
                  primeEggAudio();
                  if (hud.state === "paused") apiRef.current?.pause();
                  else apiRef.current?.reset();
                }}
                className="mt-5 min-h-12 rounded-2xl bg-[#6fe3ff] px-8 py-3 text-[15px] font-extrabold text-[#092036] shadow-[0_6px_25px_rgba(50,201,255,0.25)] transition hover:bg-white focus-visible:outline-3 focus-visible:outline-white disabled:cursor-wait disabled:opacity-50"
              >
                {startLabel}
              </button>
            </div>
          )}
        </div>

        <footer className="text-center text-[11px] leading-relaxed text-[#8aa8be] sm:text-xs">
          {t.footer}
          <br />
          {t.saved}
        </footer>
      </div>
    </div>
  );
}
