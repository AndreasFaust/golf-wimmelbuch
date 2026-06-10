import { useScroll, useTransform, type MotionValue } from "motion-v";

export function useParallaxHeader({ speed = 3, opacity = 0.003 }) {
  const { scrollY } = useScroll();
  // `motion-v` pulls types from `framer-motion`, but `useScroll()` returns a
  // MotionValue from the (hoisted) `motion-dom` package. Bridge the mismatch.
  const scrollYForTransform = scrollY as unknown as MotionValue<number>;
  return {
    y: useTransform(scrollYForTransform, (value: number) => {
      return value * speed * -0.1;
    }),
    opacity: useTransform(scrollYForTransform, (value: number) => {
      return Math.max(1 - value * opacity, 0);
    }),
  };
}
