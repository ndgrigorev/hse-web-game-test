import { useGame } from '../../contexts/GameContext';
import './Background.css';

interface BackgroundProps {
  config?: {
    width: number;
    height: number;
    background: string;
    backgroundMask: string;
    initialPosition: { x: number; y: number };
    lights?: string;
  };
}

const Background: React.FC<BackgroundProps> = ({ config }) => {
  const { gameState } = useGame();
  const backgroundImage = config?.background;
  const lightsImage = config?.lights;

  return (
    <>
      <img
        src={backgroundImage}
        alt="game background"
        className="background-image"
        style={{
          top: gameState.position.y,
          left: gameState.position.x,
        }}
      />

      {lightsImage && (
        <img
          src={lightsImage}
          alt="lighting effects"
          className="background-image background-lights"
          style={{
            top: gameState.position.y,
            left: gameState.position.x,
            zIndex: 2000
          }}
        />
      )}
    </>
  );
};

export default Background;