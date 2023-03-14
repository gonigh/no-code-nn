import type { Rect } from "@/utils/draw";

export interface NodeInterface {
  id: number;
  rect?: Rect;
  x: number;
  y: number;
}
