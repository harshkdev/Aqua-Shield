"use client";

import { motion, useReducedMotion } from "framer-motion";

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
  const transition = shouldReduce
    ? { duration: 0 }
    : { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay };

  return (
    <motion.div
      className={className}
      initial={
        shouldReduce
          ? {}
          : { opacity: 0, y: 60, scale: 0.98, filter: "blur(8px)" }
      }
      whileInView={
        shouldReduce
          ? {}
          : { opacity: 1, y: 0, scale: 1.0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={transition}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
};


