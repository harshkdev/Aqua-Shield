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
    : { duration: 0.55, ease: [0.215, 0.61, 0.355, 1], delay };

  return (
    <motion.div
      className={className}
      initial={shouldReduce ? {} : { opacity: 0, y: 36 }}
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={transition}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};


