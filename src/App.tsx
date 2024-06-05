import styled from "styled-components";
import { GameBoard } from "./components/GameBoard";
import { Modal } from "./modal/Modal";
import { useGameConfig } from "./systems/useGameConfig";
import { useState } from "react";
import { WelcomeModalContent } from "./modal/WelcomeModalContent";
import { RulesModalContent } from "./modal/RulesModalContent";
import { PauseModalContent } from "./modal/PauseModalContent";

const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

type ModalType = "welcome" | "rules" | "pause";

function App() {
  const config = useGameConfig();
  const [modalType, setModalType] = useState<ModalType | null>("welcome");

  const renderModalContent = () => {
    switch (modalType) {
      case "welcome":
        return (
          <WelcomeModalContent
            onStart={(configs) => {
              config.setPlayerConfigs(configs.x, configs.o);
              config.setGameState("playing");
              setModalType(null);
            }}
            defaultConfigsX={{
              name: config.players.x.name,
              ai: config.players.x.ai,
            }}
            defaultConfigsO={{
              name: config.players.o.name,
              ai: config.players.o.ai,
            }}
            onRules={() => setModalType("rules")}
            colorX={config.players.x.color}
            colorO={config.players.o.color}
          />
        );
      case "rules":
        return <RulesModalContent onReturn={() => setModalType("welcome")} />;
      case "pause":
        return (
          <PauseModalContent
            onRestart={() => {
              config.restartGame();
              setModalType("welcome");
            }}
            onClose={() => {
              config.setGameState("playing");
              setModalType(null);
            }}
          />
        );
    }
  };

  return (
    <Main>
      <GameBoard
        config={config}
        onRestart={() => {
          config.restartGame();
          setModalType("welcome");
        }}
        onPause={() => {
          setModalType("pause");
          config.setGameState("paused");
        }}
      />
      <Modal isOpen={modalType !== null} renderContent={renderModalContent} />
    </Main>
  );
}

export default App;
