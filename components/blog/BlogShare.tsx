"use client";

import { Link2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./Blog.module.css";

interface BlogShareLabels {
  title: string;
  intro: string;
  facebook: string;
  linkedin: string;
  x: string;
  instagram: string;
  copy: string;
  copied: string;
  instagramLabel: string;
  copyLabel: string;
}

interface BlogShareProps {
  url: string;
  title: string;
  labels: BlogShareLabels;
}

const socialIcons = {
  facebook: "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.02 4.388 11.01 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.931-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.083 24 18.092 24 12.073Z",
  instagram: "M7.8 2h8.4A5.806 5.806 0 0 1 22 7.8v8.4a5.806 5.806 0 0 1-5.8 5.8H7.8A5.806 5.806 0 0 1 2 16.2V7.8A5.806 5.806 0 0 1 7.8 2Zm0 2A3.805 3.805 0 0 0 4 7.8v8.4A3.805 3.805 0 0 0 7.8 20h8.4a3.805 3.805 0 0 0 3.8-3.8V7.8A3.805 3.805 0 0 0 16.2 4H7.8Zm8.7 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25Z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126Zm1.777 13.019H3.558V9h3.556v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.293 19.492h2.039L6.486 3.24H4.298l13.31 17.405Z",
} as const;

function shareUrl(platform: "facebook" | "linkedin" | "x", url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  if (platform === "facebook") {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  }

  if (platform === "linkedin") {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  }

  return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
}

function SocialIcon({ icon }: { icon: keyof typeof socialIcons }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path d={socialIcons[icon]} />
    </svg>
  );
}

export function BlogShare({ url, title, labels }: BlogShareProps) {
  const [status, setStatus] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  function announceCopied() {
    setStatus(labels.copied);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setStatus(""), 3000);
  }

  async function copyLink() {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      announceCopied();
      return;
    }

    const field = document.createElement("textarea");
    field.value = url;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    document.body.removeChild(field);
    announceCopied();
  }

  return (
    <section className={styles.share} aria-labelledby="article-share-title">
      <h2 id="article-share-title">{labels.title}</h2>
      <p>{labels.intro}</p>
      <div className={styles.shareActions}>
        <a href={shareUrl("facebook", url, title)} target="_blank" rel="noopener noreferrer" className={styles.shareButton}>
          <SocialIcon icon="facebook" />
          {labels.facebook}
        </a>
        <button type="button" className={styles.shareButton} onClick={copyLink} aria-label={labels.instagramLabel}>
          <SocialIcon icon="instagram" />
          {labels.instagram}
        </button>
        <a href={shareUrl("linkedin", url, title)} target="_blank" rel="noopener noreferrer" className={styles.shareButton}>
          <SocialIcon icon="linkedin" />
          {labels.linkedin}
        </a>
        <a href={shareUrl("x", url, title)} target="_blank" rel="noopener noreferrer" className={styles.shareButton}>
          <SocialIcon icon="x" />
          {labels.x}
        </a>
        <button type="button" className={styles.shareButton} onClick={copyLink} aria-label={labels.copyLabel}>
          <Link2 size={16} aria-hidden="true" />
          {labels.copy}
        </button>
      </div>
      <p className={styles.shareStatus} aria-live="polite">{status}</p>
    </section>
  );
}
