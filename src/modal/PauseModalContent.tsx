import styled from "styled-components";
import { Button } from "../components/button";

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const PauseModalContent = (props: {
  onClose: () => void;
  onRestart: () => void;
}) => {
  return (
    <>
      <h3>Paused</h3>
      <ButtonsContainer>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            return props.onRestart();
          }}
          aria-label="restart game"
        >
          Restart
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            return props.onClose();
          }}
          aria-label="continue the game"
        >
          Continue
        </Button>
      </ButtonsContainer>
    </>
  );
};
