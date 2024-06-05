import { Cell, Player, GameState } from "@/types";
import { initGrid } from "./useGridState";

export const checkGridState = (
  gridState: Cell[][],
): { gameState: GameState; winner?: Player["cellType"] } => {
  let hasNull = false;
  const copy = initGrid(3, 3);
  const diag1: Cell[] = [];
  const diag2: Cell[] = [];
  const result: { gameState: GameState; winner?: Player["cellType"] } = {
    gameState: "playing",
    winner: undefined,
  };

  const checkRow = (row: Cell[]) => {
    if (!row.includes("x") && !row.includes(null)) {
      result.gameState = "game-over";
      result.winner = "o";
    }
    if (!row.includes("o") && !row.includes(null)) {
      result.gameState = "game-over";
      result.winner = "x";
    }
  };

  gridState.forEach((row, i) => {
    if (row.includes(null)) {
      hasNull = true;
    }
    checkRow(row);
    row.forEach((cell, j) => {
      if (i === j) {
        diag1.push(cell);
      }
      if (i === row.length - 1 - j) {
        diag2.push(cell);
      }
      if (i === 0 && j === 0) {
        diag1.push(cell);
      }
      return (copy[j]![i] = cell);
    });
  });
  copy.forEach((row) => checkRow(row));
  checkRow(diag1);
  checkRow(diag2);
  if (hasNull === false) {
    result.gameState = "game-over";
  }
  return result;
};
