import { ReactNode } from "react";

export type Cell = "x" | "o" | null;
export type GameState = "main" | "playing" | "paused" | "game-over";

export interface Player {
  cellType: Exclude<Cell, null>;
  render: () => ReactNode;
  name: string;
  color: string;
  ai: boolean;
}

export type Players = { [k in Player["cellType"]]: Player };
