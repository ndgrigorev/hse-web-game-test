import { useState, useEffect, useRef } from 'react';
import { ANIMATION_CONFIG } from '../../constants';

export const useAnimation = (isWalking: boolean) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const lastUpdateTime = useRef<number>(0);
  const accumulator = useRef<number>(0);
  // подбор кадра в зависимости от времени ходьбы
  useEffect(() => {
    if (isWalking) {
      const frameDuration = ANIMATION_CONFIG.WALK.FRAME_DURATION;
      let animationId: number;
      const animate = (timestamp: number) => {
        if (lastUpdateTime.current == 0) { // в самом начале ходьбы инициализируем таймер
          lastUpdateTime.current = timestamp;
        }
        // разница по времени = текущее время - время последней анимации
        const deltaTime = timestamp - lastUpdateTime.current;
        lastUpdateTime.current = timestamp; // время последнего вызова
        accumulator.current += deltaTime; // накоп реального времени
        while (accumulator.current >= frameDuration) {
          setCurrentFrame(prev => (prev + 1) % ANIMATION_CONFIG.WALK.FRAMES.length);
          accumulator.current -= frameDuration;
        }
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationId);
        lastUpdateTime.current = 0;
        accumulator.current = 0;
      };
    } // не нужно делать отдельную проверку, стоит ли персонаж
  }, [isWalking]);

  const getCurrentFrame = () => {
    if (!isWalking) { // проверка на статичность
      return 0;
    }
    return ANIMATION_CONFIG.WALK.FRAMES[currentFrame];
  };

  return { currentFrame: getCurrentFrame() };
};