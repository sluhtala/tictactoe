import { Button } from "../components/button";

export const RulesModalContent = (props: { onReturn: () => void }) => {
  return (
    <>
      <h2>Rules</h2>
      <p>Players take turns putting their marks in empty squares.</p>
      <p>
        The first player to get 3 marks in a row (up, down, across, or
        diagonally) is the winner. When all 9 squares are full, the game is
        over. If no player has 3 marks in a row, the game ends in a tie.
      </p>
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          return props.onReturn();
        }}
        aria-label="return"
      >
        Return
      </Button>
    </>
  );
};
