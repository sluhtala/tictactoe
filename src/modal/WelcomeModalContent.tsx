import { useState } from "react";
import { Button } from "../components/button";
import { colors } from "../constants";
import { mix } from "polished";
import styled from "styled-components";

const FieldContainer = styled.div<{ color: string }>`
  display: flex;
  gap: 8px;
  align-items: center;
  align-self: flex-start;
  width: 100%;
  input[type="text"] {
    font-family: "Wellfleet", monospace;
    border: none;
    background: none;
    border-bottom: solid 2px black;
    height: 1.2rem;
    font-size: 1rem;
    padding: 2px;
    width: 8rem;
    flex-grow: 1;

    color: ${(p) => p.color};
    &:focus-visible {
      outline: none;
    }
  }
  input[type="checkbox"] {
    margin-left: 8px;
    justify-self: flex-end;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 304px;
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.8rem;
`;

const AICheckboxContainer = styled.div`
  label {
    cursor: pointer;
    &:after {
      content: "Human";
    }
  }
  label:has(> input:checked) {
    &:after {
      content: "AI";
    }
  }

  label input {
    display: none;
  }
`;

const AICheckbox = ({
  name,
  defaultChecked,
}: {
  name: string;
  defaultChecked: boolean;
}) => {
  return (
    <AICheckboxContainer>
      <label>
        <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      </label>
    </AICheckboxContainer>
  );
};

type Config = { name: string; ai: boolean };

export const WelcomeModalContent = (props: {
  onStart: (configs: { x: Config; o: Config }) => void;
  colorX: string;
  colorO: string;
  onRules: () => void;
  defaultConfigsX: Config;
  defaultConfigsO: Config;
}) => {
  const nameMaxLength = 12;
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  //TODO: fix autofocus issue with dialog and form inputs

  return (
    <>
      <h1>
        Welcome to
        <br />
        tic-tac-toe!
      </h1>
      <Form
        aria-label="form"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const n1 = formData.get("player-x-name");
          const n2 = formData.get("player-o-name");
          const ai1 = formData.get("player-x-ai");
          const ai2 = formData.get("player-o-ai");

          const validate = (value?: string) => {
            if (typeof value === "string" && value.length > 0) {
              return true;
            }
            return false;
          };

          if (validate(n1?.toString()) && validate(n2?.toString())) {
            props.onStart({
              x: { name: n1!.toString(), ai: !!ai1 },
              o: { name: n2!.toString(), ai: !!ai2 },
            });
          } else {
            setErrorMessage("Invalid names");
          }
        }}
      >
        <FieldContainer color={props.colorX}>
          <label autoFocus={false} htmlFor="player-x-name" id="player-x-name">
            Player X:{" "}
          </label>
          <input
            autoFocus={false}
            defaultValue={props.defaultConfigsX.name}
            name="player-x-name"
            type="text"
            aria-label="Player x"
            aria-description="Type player 'x' name"
            maxLength={nameMaxLength}
            minLength={1}
            aria-required={true}
            onFocus={() => setErrorMessage(undefined)}
          />
          <AICheckbox
            name="player-x-ai"
            defaultChecked={props.defaultConfigsX.ai}
          />
        </FieldContainer>
        <FieldContainer color={props.colorO}>
          <label id="player-o-name" htmlFor="player-o-name">
            Player O:{" "}
          </label>
          <input
            defaultValue={props.defaultConfigsO.name}
            name="player-o-name"
            type="text"
            aria-label="Player o"
            aria-description="Type player 'o' name"
            maxLength={nameMaxLength}
            minLength={1}
            aria-required={true}
            onFocus={() => setErrorMessage(undefined)}
          />
          <AICheckbox
            name="player-o-ai"
            defaultChecked={props.defaultConfigsO.ai}
          />
        </FieldContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button
          type="submit"
          size="normal"
          autoFocus={true}
          aria-label="start game"
          color={mix(0.5, colors.accent1, colors.accent2)}
        >
          Start game
        </Button>
        <Button type="button" onClick={() => props.onRules()}>
          Rules
        </Button>
      </Form>
    </>
  );
};
