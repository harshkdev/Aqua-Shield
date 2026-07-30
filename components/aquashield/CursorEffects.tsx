"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CursorEffects() {
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    pendingRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current !== null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const pos = pendingRef.current;
      if (!pos) return;

      const glow = document.getElementById("cursor-glow");
      if (glow) {
        glow.style.left = `${pos.x}px`;
        glow.style.top = `${pos.y}px`;
      }
    });
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const ripple = document.createElement("div");
    ripple.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(0, 194, 209, 0.3);
      transform: translate(-50%, -50%) scale(0);
      animation: ripple 0.6s ease-out forwards;
      pointer-events: none;
      z-index: 9998;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleClick]);

  return (
    <div
      id="cursor-glow"
      className="cursor-glow hidden lg:block"
      style={{
        background:
          "radial-gradient(circle, rgba(0, 194, 209, 0.06) 0%, transparent 70%)",
        opacity: 0.8,
      }}
    />
  );
}
