import { Cell } from "@/types";
import _ from "lodash";
import { useState } from "react";

export const initGrid = (y: number, x: number): Cell[][] => {
  return _.range(y).map(() => _.range(x).map(() => null));
};

export const useGridState = () => {
  const [state, setState] = useState<Cell[][]>(initGrid(3, 3));

  const setGridState = (y: number, x: number, type: Cell) => {
    if (state[y] === undefined) {
      return;
    }
    const newState = _.cloneDeep(state);
    if (y !== undefined && x !== undefined) {
      newState[y]![x] = type;
      setState(newState);
    }
    return newState;
  };

  const resetState = () => {
    setState(initGrid(3, 3));
  };

  return [state, setGridState, resetState] as const;
};
