import { useState, useEffect, useRef } from 'react';
import type { CollisionSystem } from '../../types';
import { GAME_CONFIG } from '../../constants';

// маска коллизий - параллельная фону маска с закрашенными красным пикселями, через которые нельзя проходить
// через прозрачные пиксели можно проходить

export const useCollisionSystem = (config?: { 
  width: number;
  height: number;
  background: string; 
  backgroundMask: string; 
}): CollisionSystem => {
  const collisionContextRef = useRef<CanvasRenderingContext2D>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const scaleRef = useRef({ scaleX: 0, scaleY: 0 });
  const bgSizeRef = useRef({ width: 0, height: 0 });
  const maskSizeRef = useRef({ width: 0, height: 0 });

  const checkCollision = (x: number, y: number): boolean => {
    // false - можно
    // true - нельзя
    const ctx = collisionContextRef.current;
    if (!ctx || !isLoaded) return false; // по умолчанию можно ходить
    // переменные для расчёта
    const worldWidth = config?.width || GAME_CONFIG.WIDTH;
    const worldHeight = config?.height || GAME_CONFIG.HEIGHT;
    const maskWidth = maskSizeRef.current.width;
    const maskHeight = maskSizeRef.current.height;
    const bgX = worldWidth / 2 - x;
    const bgY = worldHeight / 2 + GAME_CONFIG.CHARACTER.HEIGHT / 2 - 10 - y;
    const maskX = Math.floor(bgX * scaleRef.current.scaleX);
    const maskY = Math.floor(bgY * scaleRef.current.scaleY);
    // исключение выхода за границы
    if (maskX < 0 || maskX >= maskWidth || maskY < 0 || maskY >= maskHeight) {
      return true; // ходить нельзя
    }

    const pixelData = ctx.getImageData(maskX, maskY, 1, 1).data;
    return !(pixelData[0] === 255 && pixelData[1] === 255 && pixelData[2] === 255);
  }; // условие с отрицанием, что ходить можно

  useEffect(() => {
    if (!config?.backgroundMask) return;
    const maskImage = new Image(); // маска красно-белая
    const bgImage = new Image(); // фон (видит игрок)

    const loadCollisionSystem = () => {
      if (!bgImage.complete || !maskImage.complete) return; // ожидание загрузки всех изображений
      const bgWidth = bgImage.naturalWidth; // размеры
      const bgHeight = bgImage.naturalHeight;
      const maskWidth = maskImage.naturalWidth;
      const maskHeight = maskImage.naturalHeight;
      bgSizeRef.current = { width: bgWidth, height: bgHeight };
      maskSizeRef.current = { width: maskWidth, height: maskHeight };
      scaleRef.current = { // расчет масштаба
        scaleX: maskWidth / bgWidth,
        scaleY: maskHeight / bgHeight
      };
      // на холсте появляется копия маски
      const canvas = document.createElement('canvas'); // канвас для быстрого получения пикселей маски
      canvas.width = maskWidth;
      canvas.height = maskHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true }); // контекст рисования для 2д
      if (!ctx) return;
      ctx.drawImage(maskImage, 0, 0, maskWidth, maskHeight);
      collisionContextRef.current = ctx;
      setIsLoaded(true);
    };
    maskImage.onload = loadCollisionSystem;
    bgImage.onload = loadCollisionSystem;
    maskImage.src = config.backgroundMask;
    bgImage.src = config.background;
    
    return () => {
      maskImage.onload = null;
      bgImage.onload = null;
      collisionContextRef.current = null;
    };
  }, [config]);
  return { checkCollision, isLoaded };
};