import type { CSSProperties } from "vue";

export interface BookImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Spring {
  stiffness: number;
  mass: number;
  damping: number;
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface Props {
  spring?: Spring;
  width?: number;
  height?: number;
  scale?: number;
  depth?: number;
  front?: BookImage;
  back?: BookImage;
  spine?: BookImage;
  side?: string;
  sizes?: string;
  top?: string;
  bottom?: string;
  rotate?: boolean;
  duration?: number;
  drag?: boolean;
  initial?: Vec2;
  animate?: Vec2;
  hover?: Vec2;
  pauseOnHover?: boolean;
  triggerHover?: boolean;
  start?: boolean;
  style?: CSSProperties;
}
