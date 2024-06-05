import { Cell } from "@/types";
import { getAiMove } from "./getAiMove";

describe("Ai ", () => {
  test("returns an empty cell", async () => {
    const state: Cell[][] = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const result = await getAiMove(state);
    expect(result).not.toBe(undefined);
  });

  test("returns undefined", async () => {
    const state: Cell[][] = [
      ["x", "x", "x"],
      ["x", "x", "x"],
      ["x", "x", "x"],
    ];
    const result = await getAiMove(state);
    expect(result).toBe(undefined);
  });

  test("returns the last cell", async () => {
    const state: Cell[][] = [
      ["x", "x", "x"],
      ["x", "x", "x"],
      ["x", "x", null],
    ];
    const result = await getAiMove(state);
    expect(result).toEqual({ y: 2, x: 2 });
  });
});
