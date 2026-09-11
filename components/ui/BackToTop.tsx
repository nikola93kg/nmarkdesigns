"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            const scrollHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const currentProgress =
                scrollHeight > 0 ? scrollTop / scrollHeight : 0;

            setProgress(currentProgress);
            setVisible(scrollTop > 300);
        };

        updateScrollProgress();

        window.addEventListener("scroll", updateScrollProgress, {
            passive: true,
        });

        window.addEventListener("resize", updateScrollProgress);

        return () => {
            window.removeEventListener("scroll", updateScrollProgress);
            window.removeEventListener("resize", updateScrollProgress);
        };
    }, []);

    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progress);

    const scrollToTop = () => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Nazad na vrh stranice"
            className={`
        fixed bottom-6 right-6 z-50
        flex size-14 items-center justify-center
        rounded-full
        bg-[#202024]
        text-white
        shadow-lg
        transition-all duration-300
        hover:scale-105
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-accent
        ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
            }
      `}
        >
            <svg
                className="absolute inset-0 size-full -rotate-90"
                viewBox="0 0 56 56"
                aria-hidden="true"
            >
                <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent/20"
                />

                <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="text-accent"
                />
            </svg>

            <ArrowUp
                className="relative z-10 size-7"
                strokeWidth={3}
                aria-hidden="true"
            />
        </button>
    );
}