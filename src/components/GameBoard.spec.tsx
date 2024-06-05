import { useGameConfig } from "@/systems/useGameConfig";
import { GameBoard } from "./GameBoard";
import { screen, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useEffect } from "react";

const Container = () => {
  const config = useGameConfig();
  useEffect(() => {
    if (config.players.x.name !== "test_player") {
      const configs = {
        x: { name: "test_player", ai: false },
        o: { name: "O", ai: false },
      };
      config.setPlayerConfigs(configs.x, configs.o);
      config.setGameState("playing");
    }
  }, [config]);
  return (
    <GameBoard config={config} onRestart={() => null} onPause={() => null} />
  );
};

describe("game", () => {
  it("can be played", () => {
    act(() => {
      render(<Container />);
    });
    expect(screen.getByText(/test_player/)).toBeInTheDocument();

    act(function () {
      screen.getByLabelText("Cell 1-1").click();
    });

    act(function () {
      screen.getByLabelText("Cell 2-1").click();
    });

    act(function () {
      screen.getByLabelText("Cell 1-2").click();
    });
    act(function () {
      screen.getByLabelText("Cell 2-2").click();
    });

    act(function () {
      screen.getByLabelText("Cell 1-3").click();
    });

    expect(screen.getByText(/winner/)).toBeInTheDocument();
    expect(screen.getByText(/test_player/)).toBeInTheDocument();
  });
});
