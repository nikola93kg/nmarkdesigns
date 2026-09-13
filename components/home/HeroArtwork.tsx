import Image from "next/image";
import styles from "./HeroArtwork.module.css";

const layers = [
  {
    id: "back-panel",
    src: "/images/hero-assets/back-panel.webp",
    width: 1536,
    height: 1024,
    className: styles.backPanel,
    preload: false,
  },
  {
    id: "dark-panel",
    src: "/images/hero-assets/dark-panel.webp",
    width: 1536,
    height: 1024,
    className: styles.darkPanel,
    preload: false,
  },
  {
    id: "tablet",
    src: "/images/hero-assets/tablet.webp",
    width: 1536,
    height: 1024,
    className: styles.tablet,
    preload: true,
  },
  {
    id: "phone",
    src: "/images/hero-assets/phone.webp",
    width: 1199,
    height: 1312,
    className: styles.phone,
    preload: false,
  },
  {
    id: "brand-card",
    src: "/images/hero-assets/brand-card.webp",
    width: 1536,
    height: 1024,
    className: styles.brandCard,
    preload: false,
  },
  {
    id: "white-card",
    src: "/images/hero-assets/white-card.webp",
    width: 1536,
    height: 1024,
    className: styles.whiteCard,
    preload: false,
  },
  {
    id: "pencil",
    src: "/images/hero-assets/pencil.webp",
    width: 1536,
    height: 1024,
    className: styles.pencil,
    preload: false,
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
          sizes="(min-width: 1280px) 656px, (min-width: 768px) 48vw, 94vw"
          quality={82}
          preload={layer.preload}
          className={`${styles.layer} ${layer.className}`}
          data-hero-artwork-layer={layer.id}
        />
      ))}
    </div>
  );
}
