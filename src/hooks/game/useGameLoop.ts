import { useEffect, useRef } from 'react';
import type { Position, Velocity, Keys } from '../../types';
import { PHYSICS, CAMERA_CONFIG } from '../../constants';

interface GameLoopProps {
  keys: Keys;
  onUpdate: (position: Position, velocity: Velocity, isMoving: boolean) => void;
  checkCollision: (x: number, y: number) => boolean;
  initialPosition?: Position;
}

export const useGameLoop = ({
  keys,
  onUpdate,
  checkCollision,
  initialPosition = { x: -90, y: -925 }
}: GameLoopProps) => {
  const animationFrameId = useRef<number | null>(null);
  const gameLoopRunning = useRef(false);
  const velocity = useRef<Velocity>({ x: 0, y: 0 });
  const position = useRef<Position>(initialPosition);
  const lastTime = useRef<number>(0);
  const accumulator = useRef<number>(0);
  const timestep = 1000 / CAMERA_CONFIG.VSYNC.TARGET_FPS;

  // очищение переменных при переходе в новую локацию
  useEffect(() => {
    position.current = initialPosition;
    velocity.current = { x: 0, y: 0 };
  }, [initialPosition]);

  // игровой цикл
  useEffect(() => {
    // для синхронизации скорости работы (и на слабом, и на сильном устройстве одинаково)
    const gameLoop = (currentTime: number) => {
      if (!gameLoopRunning.current) return;
      if (lastTime.current === 0) {
        lastTime.current = currentTime;
      }
      let deltaTime = currentTime - lastTime.current;
      lastTime.current = currentTime;
      if (deltaTime > CAMERA_CONFIG.VSYNC.MAX_DELTA) {
        deltaTime = CAMERA_CONFIG.VSYNC.MAX_DELTA;
      }
      accumulator.current += deltaTime;
      while (accumulator.current >= timestep) {
        updateGame(timestep);
        accumulator.current -= timestep;
      }
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    // вся физика движения персонажа
    const updateGame = (delta: number) => {
      const deltaFactor = delta / timestep;
      let targetVelocityX = 0;
      let targetVelocityY = 0;
      // задача предела скорости в зависимости от
      if (keys.d) targetVelocityX = -PHYSICS.MAX_SPEED;
      if (keys.a) targetVelocityX = PHYSICS.MAX_SPEED;
      if (keys.s) targetVelocityY = -PHYSICS.MAX_SPEED;
      if (keys.w) targetVelocityY = PHYSICS.MAX_SPEED;

      if (targetVelocityX !== 0) { // разгон ПО Х
        if (Math.abs(velocity.current.x) < Math.abs(targetVelocityX)) {
          velocity.current.x += Math.sign(targetVelocityX) * PHYSICS.ACCELERATION * deltaFactor;
        }
      } else {
        if (velocity.current.x > 0) { // торможение ПО Х
          velocity.current.x = Math.max(0, velocity.current.x - PHYSICS.DECELERATION * deltaFactor);
        } else if (velocity.current.x < 0) {
          velocity.current.x = Math.min(0, velocity.current.x + PHYSICS.DECELERATION * deltaFactor);
        }
      }

      if (targetVelocityY !== 0) { // разгон ПО У
        if (Math.abs(velocity.current.y) < Math.abs(targetVelocityY)) {
          velocity.current.y += Math.sign(targetVelocityY) * PHYSICS.ACCELERATION * deltaFactor;
        }
      } else {
        if (velocity.current.y > 0) { // торможение ПО У
          velocity.current.y = Math.max(0, velocity.current.y - PHYSICS.DECELERATION * deltaFactor);
        } else if (velocity.current.y < 0) {
          velocity.current.y = Math.min(0, velocity.current.y + PHYSICS.DECELERATION * deltaFactor);
        }
      }
      // огрничение скорости
      velocity.current.x = Math.max(-PHYSICS.MAX_SPEED, Math.min(PHYSICS.MAX_SPEED, velocity.current.x));
      velocity.current.y = Math.max(-PHYSICS.MAX_SPEED, Math.min(PHYSICS.MAX_SPEED, velocity.current.y));
      let newX = position.current.x;
      let newY = position.current.y;

      // проверка коллизий заранее по х
      if (velocity.current.x !== 0) {
        const step = Math.sign(velocity.current.x);
        const steps = Math.floor(Math.abs(velocity.current.x) * deltaFactor);
        let testX = position.current.x;
        for (let i = 0; i < steps; i++) {
          testX += step;
          if (checkCollision(testX, position.current.y)) {
            testX -= step;
            velocity.current.x = 0;
            break;
          }
        }
        newX = testX;
      }
      // проверка коллизий заранее по у
      if (velocity.current.y !== 0) {
        const step = Math.sign(velocity.current.y);
        const steps = Math.floor(Math.abs(velocity.current.y) * deltaFactor);
        let testY = position.current.y;
        for (let i = 0; i < steps; i++) {
          testY += step;
          if (checkCollision(newX, testY)) {
            testY -= step;
            velocity.current.y = 0;
            break;
          }
        }
        newY = testY;
      }
      position.current = { x: newX, y: newY };
      const isMoving = Math.abs(velocity.current.x) > 0.1 || Math.abs(velocity.current.y) > 0.1;
      onUpdate({ x: newX, y: newY }, velocity.current, isMoving);
    };
    gameLoopRunning.current = true;
    lastTime.current = 0;
    accumulator.current = 0;
    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      gameLoopRunning.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      lastTime.current = 0;
      accumulator.current = 0;
    };
  }, [keys, onUpdate, checkCollision, initialPosition, timestep]);
  return { velocity: velocity.current };
};