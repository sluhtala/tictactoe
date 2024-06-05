import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  useMemo,
} from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: none;
  font-family: inherit;
  font-size: inherit;
  & > span {
    display: none;
  }

  &:hover {
    & > span {
      display: block;
    }
    opacity: 0.2;
  }
`;

const CellContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: none;
`;

interface CellButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  renderOnHover?: () => ReactNode;
}

const CellButton = ({ renderOnHover, ...rest }: CellButtonProps) => {
  return (
    <Button {...rest} aria-label={"Cell " + rest.id}>
      <span>{renderOnHover?.()}</span>
    </Button>
  );
};

interface TTCellProps {
  id: string;
  handler: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  renderOnHover?: () => ReactNode;
  renderPlayer: (() => ReactNode) | null;
}

export const TTCell = ({
  id,
  handler,
  disabled,
  renderOnHover,
  renderPlayer,
}: TTCellProps) => {
  const cell = useMemo(() => {
    if (renderPlayer === null) {
      return (
        <CellButton
          disabled={disabled}
          id={id}
          onClick={(e) => {
            handler(e);
          }}
          renderOnHover={renderOnHover}
        />
      );
    }
    return renderPlayer();
  }, [renderPlayer, disabled, id, renderOnHover, handler]);

  return <CellContainer>{cell}</CellContainer>;
};
