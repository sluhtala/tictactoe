import { ReactNode, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { colors } from "../constants";

const backdrop = css`
  &::backdrop {
    background: black;
    opacity: 0.4;
  }
`;

const Dialog = styled.dialog`
  margin: auto;
  border-radius: 8px;
  padding: 2rem;
  background-color: ${colors.primary};
  border: none;
  z-index: 100;
  box-shadow: #0000004b -7px 14px 7px 2px;
  max-width: 400px;
  ${backdrop}

  @media screen and (max-width: 600px) {
    max-width: 100%;
    width: 100%;
    min-height: 100vh;
    box-shadow: none;
    margin: 0;
    border-radius: 0px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

interface ModalProps {
  renderContent: () => ReactNode;
  isOpen: boolean;
}

export const Modal = (props: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Using ref is needed for css backdrop to work

    if (props.isOpen && ref && ref.current) {
      ref.current.showModal?.();
    } else {
      ref.current?.close?.();
    }
  }, [ref, props.isOpen]);

  return (
    <Dialog ref={ref}>
      <ContentContainer>{props.renderContent()}</ContentContainer>
    </Dialog>
  );
};
