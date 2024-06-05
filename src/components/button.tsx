import { colors } from "@/constants";
import { mix } from "polished";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

const largeStyles = css`
  padding: 20px;
  font-size: 1.1rem;
  letter-spacing: 0.033rem;
`;

const smallStyles = css`
  padding: 4px;
  font-size: 0.8rem;
`;

const StyledButton = styled.button<{ size: ButtonSize; color: string }>`
  font-family: inherit;
  font-size: 1rem;
  background: ${(p) => p.color};
  color: black;
  border: none;
  border-radius: 8px;
  padding: 8px;
  box-shadow: -3px 4px 0px black;
  &:hover {
    box-shadow: -2px 2px 0px black;
    cursor: pointer;
    color: white;
  }
  ${(p) => (p.size === "large" ? largeStyles : "")}
  ${(p) => (p.size === "small" ? smallStyles : "")}
`;

type ButtonSize = "small" | "normal" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  className?: string;
  color?: string;
}

export const Button = ({
  children,
  size = "normal",
  color,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const defaultColor = mix(0.5, colors.accent1, colors.accent2);

  return (
    <StyledButton color={color ?? defaultColor} size={size} {...props}>
      {children}
    </StyledButton>
  );
};
