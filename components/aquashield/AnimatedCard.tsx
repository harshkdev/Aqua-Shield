"use client";

import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export const AnimatedCard = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const shouldReduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");

  useMotionValueEvent(scrollY, "change", (current) => {
    const prev = scrollY.getPrevious() ?? 0;
    const diff = current - prev;
    if (Math.abs(diff) > 2) {
      setScrollDir(diff > 0 ? "down" : "up");
    }
  });

  const transition = shouldReduce
    ? { duration: 0 }
    : { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay * 0.3 };

  // Symmetrical Directional Offset:
  // When scrolling DOWN: upcoming cards animate up from below (+48px)
  // When scrolling UP: returning cards animate down from above (-48px)
  const yOffset = scrollDir === "down" ? 48 : -48;

  return (
    <motion.div
      className={className}
      initial={
        shouldReduce
          ? {}
          : { opacity: 0, y: yOffset }
      }
      whileInView={
        shouldReduce
          ? {}
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: false, amount: 0.08 }}
      transition={transition}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};
