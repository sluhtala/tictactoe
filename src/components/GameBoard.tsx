import { colors } from "@/constants";
import { GameConfig } from "@/systems/useGameConfig";
import styled from "styled-components";
import { TTGrid } from "./TTGrid";
import { lighten } from "polished";
import { Button } from "./button";
import { TTCell } from "./TTCell";

const Container = styled.article`
  padding: 2rem;
  background-color: ${colors.primary};
  width: fit-content;
  border-radius: 16px;

  border: ${lighten(0.2, colors.primary)} 2px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 8px;
  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
`;

const TextSection = styled.section`
  min-height: 3rem;
  h2,
  p {
    margin: 0;
    text-align: center;
  }
`;

const PlayerName = styled.span<{ color: string }>`
  color: ${(p) => p.color};
  font-size: 1.2rem;
`;

export const GameBoard = ({
  config,
  onPause,
  onRestart,
}: {
  config: GameConfig;
  onPause: () => void;
  onRestart: () => void;
}) => {
  const renderCell = (y: number, x: number) => {
    const type = config.gridState?.[y]?.[x] || null;
    const disabled = config.gameState !== "playing" || config.turn.ai;
    return (
      <TTCell
        id={`${y + 1}-${x + 1}`}
        handler={() => config.playTurn(y, x)}
        disabled={disabled}
        renderOnHover={!disabled ? config.turn.render : undefined}
        renderPlayer={type ? config.players[type]?.render : null}
      />
    );
  };

  return (
    <Container>
      <TextSection>
        {config.gameState === "game-over" && config.winner && (
          <h2>
            The winner is{" "}
            <PlayerName color={config.winner.color}>
              {config.winner.name}
            </PlayerName>
          </h2>
        )}

        {config.gameState === "playing" && (
          <p>
            <PlayerName color={config.turn.color}>
              {config.turn.name}
            </PlayerName>
            , it's your turn.
          </p>
        )}
        {config.gameState === "game-over" && !config.winner && <h2>Tie</h2>}
      </TextSection>

      <TTGrid renderCell={renderCell} />

      {config.gameState === "playing" && (
        <>
          <Button
            size="small"
            onClick={() => onPause()}
            aria-label="pause game"
          >
            Pause
          </Button>
        </>
      )}
      {config.gameState === "game-over" && (
        <Button onClick={onRestart} size="large" color={config.winner?.color}>
          Restart
        </Button>
      )}
    </Container>
  );
};
