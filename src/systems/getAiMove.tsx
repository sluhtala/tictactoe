import { Cell } from "@/types";

export const getAiMove = (
  gridState: Cell[][],
): Promise<{ y: number; x: number } | undefined> => {
  return new Promise((resolve) => {
    const emptyCells: { y: number; x: number }[] = [];
    gridState.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === null) {
          emptyCells.push({ y: i, x: j });
        }
      });
    });

    if (emptyCells.length === 0) {
      resolve(undefined);
    }
    const rnd = Math.floor(Math.random() * emptyCells.length);

    setTimeout(() => resolve(emptyCells[rnd]!), 450);
  });
};
