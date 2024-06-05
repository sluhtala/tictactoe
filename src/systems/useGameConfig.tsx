import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { checkGridState } from "./checkGridState";
import { Player, GameState, Cell, Players } from "../types";
import { useGridState } from "./useGridState";
import { colors } from "@/constants";
import { lighten } from "polished";
import { getAiMove } from "./getAiMove";

const defaultPlayers: Players = {
  x: {
    name: "X",
    color: lighten(0.1, colors.accent1),
    cellType: "x",
    ai: false,
    render: () => (
      <h2
        aria-label="player x mark"
        style={{ color: lighten(0.1, colors.accent1) }}
      >
        X
      </h2>
    ),
  },
  o: {
    name: "O",
    color: lighten(0.08, colors.accent2),
    cellType: "o",
    ai: false,
    render: () => (
      <h2
        aria-label="player o mark"
        style={{ color: lighten(0.08, colors.accent2) }}
      >
        O
      </h2>
    ),
  },
};

export interface GameConfig {
  turn: Player;
  gridState: Cell[][];
  playTurn: (y: number, x: number) => void;
  restartGame: () => void;
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  winner?: Player;
  players: Players;
  setPlayerConfigs: (
    x: { name: string; ai: boolean },
    o: { name: string; ai: boolean }
  ) => void;
}

export const useGameConfig = (): GameConfig => {
  const [players, setPlayers] = useState(defaultPlayers);
  const [turn, setTurn] = useState<Player>(players.x);
  const [winner, setWinner] = useState<Player | undefined>();
  const [gameState, setGameState] = useState<GameState>("main");
  const [gridState, setGridState, resetGridState] = useGridState();

  const setPlayerConfigs = (
    x: { name: string; ai: boolean },
    o: { name: string; ai: boolean }
  ) => {
    const configs = {
      x: { ...players.x, name: x.name, ai: x.ai },
      o: { ...players.o, name: o.name, ai: o.ai },
    };
    setPlayers(configs);
    setTurn(configs[turn.cellType]);
  };

  const restartGame = () => {
    resetGridState();
    setGameState("main");
    setWinner(undefined);
    setTurn(players.x);
  };

  const playTurn: GameConfig["playTurn"] = useCallback(
    (y, x) => {
      const newGridState = setGridState(y, x, turn.cellType);
      setTurn(turn.cellType === "x" ? players.o : players.x);
      if (!newGridState) {
        return;
      }

      const { gameState: newGameState, winner: newWinner } =
        checkGridState(newGridState);

      if (newWinner) {
        setWinner(players[newWinner]);
      }
      if (newGameState === "game-over") {
        setGameState("game-over");
      }
    },
    [players, setGridState, turn.cellType]
  );

  useEffect(() => {
    if (gameState !== "playing" || !turn.ai) {
      return;
    }

    getAiMove(gridState).then((aiMove) => {
      if (aiMove) {
        playTurn(aiMove.y, aiMove.x);
      }
    });
  }, [playTurn, gameState, turn, winner, gridState]);

  return {
    turn,
    gridState,
    playTurn,
    restartGame,
    gameState,
    winner,
    players,
    setPlayerConfigs,
    setGameState,
  };
};
