import Image from "next/image";
import styles from "./HeroArtwork.module.css";

const layers = [
  {
    id: "back-panel",
    src: "/images/hero-assets/back-panel.webp",
    width: 1536,
    height: 1024,
    className: styles.backPanel,
    fraction: 0.72,
    priority: true,
  },
  {
    id: "dark-panel",
    src: "/images/hero-assets/dark-panel.webp",
    width: 1536,
    height: 1024,
    className: styles.darkPanel,
    fraction: 0.49,
    priority: false,
  },
  {
    id: "tablet",
    src: "/images/hero-assets/tablet.webp",
    width: 1536,
    height: 1024,
    className: styles.tablet,
    fraction: 0.73,
    priority: true,
  },
  {
    id: "phone",
    src: "/images/hero-assets/phone.webp",
    width: 1199,
    height: 1312,
    className: styles.phone,
    fraction: 0.29,
    priority: false,
  },
  {
    id: "brand-card",
    src: "/images/hero-assets/brand-card.webp",
    width: 1536,
    height: 1024,
    className: styles.brandCard,
    fraction: 0.28,
    priority: false,
  },
] as const;

export function HeroArtwork() {
  return (
    <div className={styles.artwork} aria-hidden="true" data-hero-artwork>
      {layers.map((layer) => (
        <Image
          key={layer.id}
          src={layer.src}
          alt=""
          width={layer.width}
          height={layer.height}
          sizes={`(min-width: 1280px) ${576 * layer.fraction}px, (min-width: 1024px) calc((100vw - 128px) * ${0.4792 * layer.fraction}), (min-width: 768px) ${656 * layer.fraction}px, (min-width: 416px) ${376 * layer.fraction}px, calc((100vw - 40px) * ${layer.fraction})`}
          quality={75}
          priority={layer.priority}
          className={`${styles.layer} ${layer.className}`}
          data-hero-artwork-layer={layer.id}
        />
      ))}
    </div>
  );
}
