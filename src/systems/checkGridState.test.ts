import { Cell } from "../types";
import { checkGridState } from "./checkGridState";

describe("game playing", () => {
  test("beginning", () => {
    const state: Cell[][] = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const result = checkGridState(state);
    expect(result.gameState).toBe("playing");
    expect(result.winner).toBe(undefined);
  });

  test("after first move", () => {
    const state: Cell[][] = [
      [null, null, null],
      [null, "x", null],
      [null, null, null],
    ];
    const result = checkGridState(state);
    expect(result.gameState).toBe("playing");
    expect(result.winner).toBe(undefined);
  });

  test("row filled", () => {
    const state: Cell[][] = [
      [null, null, null],
      ["o", "x", "o"],
      [null, null, null],
    ];
    const result = checkGridState(state);
    expect(result.gameState).toBe("playing");
    expect(result.winner).toBe(undefined);
  });
});

describe("game over", () => {
  test("tie", () => {
    const state: Cell[][] = [
      ["x", "o", "x"],
      ["x", "o", "o"],
      ["o", "x", "x"],
    ];
    const result = checkGridState(state);
    expect(result.gameState).toBe("game-over");
    expect(result.winner).toBe(undefined);
  });

  test("o wins last move", () => {
    const state: Cell[][] = [
      ["x", "o", "o"],
      ["x", "o", "o"],
      ["o", "x", "x"],
    ];
    const result = checkGridState(state);
    expect(result.gameState).toBe("game-over");
    expect(result.winner).toBe("o");
  });

  describe("x wins", () => {
    test("row", () => {
      const state: Cell[][] = [
        ["x", "x", "x"],
        [null, null, null],
        [null, null, null],
      ];
      const result = checkGridState(state);
      expect(result.gameState).toBe("game-over");
      expect(result.winner).toBe("x");
    });

    test("column", () => {
      const state: Cell[][] = [
        ["x", null, null],
        ["x", null, null],
        ["x", null, null],
      ];
      const result = checkGridState(state);
      expect(result.gameState).toBe("game-over");
      expect(result.winner).toBe("x");
    });

    test("diagonal", () => {
      const state: Cell[][] = [
        [null, null, "x"],
        [null, "x", null],
        ["x", null, null],
      ];
      const result = checkGridState(state);
      expect(result.gameState).toBe("game-over");
      expect(result.winner).toBe("x");
    });
  });
});
