import React, { useState } from 'react';
import { useGameLoop, useCollisionSystem, useGameScale } from '../../hooks'; // ** основной цикл, коллизии и адаптив экрана
import { useGame } from '../../contexts/GameContext';
import type { Position } from '../../types';
import { GAME_CONFIG } from '../../constants';

interface GameWorldProps {
  children: React.ReactNode; // внутри Background, Character, InteractiveObject и тд
  spawnPoint?: { x: number; y: number };
}

interface LocationConfig {
  width: number;
  height: number;
  background: string;
  backgroundMask: string;
  initialPosition: { x: number; y: number };
}

// функциональный реакт компонент для управления всей игрой (фон, персонаж, коллизии, физика)
const GameWorld: React.FC<GameWorldProps> = ({ children, spawnPoint }) => {
  const { setGameState, gameState } = useGame();
  const [locationConfig, setLocationConfig] = useState<LocationConfig | null>(null);
  const { checkCollision, isLoaded } = useCollisionSystem(locationConfig || undefined); // *
  const { scale, containerRef } = useGameScale();

  const updateLocationConfig = (config: LocationConfig) => {
    setLocationConfig(config); // передача данных из локаций *
  };

  // обновление игры, связь с useGameLoop **
  const handleGameUpdate = (newPosition: Position, _velocity: { x: number; y: number }, isMoving: boolean) => {
    setGameState(prev => ({
      ...prev,
      position: newPosition,
      isWalking: isMoving
    }));
  }; // функция передастся как параметр onUpdate в useGameLoop

  const initialPosition = spawnPoint || locationConfig?.initialPosition || { x: -180, y: -250 };

  useGameLoop({
    keys: gameState.keys,
    onUpdate: handleGameUpdate,
    checkCollision: isLoaded ? checkCollision : () => false,
    initialPosition
  }); // для вызова хука UseGameLoop.ts

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        updateLocationConfig // Location клонируется с этим параметром (второй из трех)
      });
    }
    return child;
  });

  return (
    <div ref={containerRef} className="game-container">
      <div 
        className="game-world"
        style={{
          width: `${locationConfig?.width || GAME_CONFIG.WIDTH}px`, // *
          height: `${locationConfig?.height || GAME_CONFIG.HEIGHT}px`, // *
          transform: `scale(${scale})`
        }}
      >
        {childrenWithProps}
      </div>
    </div>
  );
};

export default GameWorld;