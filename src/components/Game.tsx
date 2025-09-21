import React, { useState, useEffect, useRef } from 'react';

interface Keys {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
}


// Game - это React-компонент
// "компонент Game монтируется" = компонент впервые появился на странице = компонент создается и добавляется в DOM
// почитайте, что такое DOM
// "компонент Game рендерится" = компонент Game определяет/подготавливает то, что будет отображено на экране
// !! рендеринг в вебе =/= рендеринг в играх
// почитайте, что такое рендеринг
const GameWorld: React.FC = () => {

  // position - переменная. setPosition - функция, чтобы обновлять состояние position - { x: 0, y: 0 }
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // currentFrame - изначальное состояние равно 0, это первый кадр
  const [currentFrame, setCurrentFrame] = useState(0);
  
  // isWalking - изначально в покое
  const [isWalking, setIsWalking] = useState(false);
  const [facingDirection, setFacingDirection] = useState<'right' | 'left'>('right');

  // скорость ходьбы
  const moveSpeed = 3;
  const keys = useRef<Keys>({ w: false, a: false, s: false, d: false });
  // !! это не фреймы движения персонажа
  const animationFrameId = useRef<number | null>(null); // хранит ID последнего запрошенного кадра анимации для предотвращения утечек памяти
  const walkAnimationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // кадры ходьбы из папки (не по порядку)
  const frames = [1, 2, 3, 4, 5, 6, 10];
  
  // предзагрузка всех изображений анимации
  const preloadedImages = useRef<Map<number, string>>(new Map());

  // размеры персонажа - пропорции на глаз
  const characterWidth = 300;
  const characterHeight = 490;

  useEffect(() => {
    // предзагрузка всех кадров анимации
    frames.forEach(frame => {
      const img = new Image();
      img.src = `/assets/images/walk_animation/${frame}.png`;
      preloadedImages.current.set(frame, img.src);
    });
    // предзагрузка состояния покоя
    const staticImg = new Image();
    staticImg.src = '/assets/images/walk_animation/static.png';
    preloadedImages.current.set(0, staticImg.src);
  }, []); // есть [] - эффект выполнится только один раз - после первого рендера компонента

  // анимация ходьбы
  useEffect(() => {
    if (isWalking) {
      // внутри интервала (setInterval) в 210 мс происходит обновление состояния currentFrame через функцию setCurrentFrame
      walkAnimationTimer.current = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % frames.length);
      }, 210); // интервал в мс
    } else {
      setCurrentFrame(0); // обновляем состояние currentFrame
    }

    return () => { // отменяем таймер анимации
      if (walkAnimationTimer.current) {
        clearInterval(walkAnimationTimer.current);
      }
    };
  }, [isWalking]); // запуск эффекта ходьбы всякий раз при изменении isWalking

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'arrowright':
        case 'd':
          keys.current.d = true;
          setIsWalking(true);
          setFacingDirection('right');
          break;
        case 'arrowleft':
        case 'a':
          keys.current.a = true;
          setIsWalking(true);
          setFacingDirection('left');
          break;
        case 'arrowdown':
        case 's':
          keys.current.s = true;
          setIsWalking(true);
          break;
        case 'arrowup':
        case 'w':
          keys.current.w = true;
          setIsWalking(true);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'arrowright':
        case 'd':
          keys.current.d = false;
          break;
        case 'arrowleft':
        case 'a':
          keys.current.a = false;
          break;
        case 'arrowdown':
        case 's':
          keys.current.s = false;
          break;
        case 'arrowup':
        case 'w':
          keys.current.w = false;
          break;
        default:
          break;
      }

      // Если все клавиши отпущены - останавливаем анимацию
      if (!keys.current.d && !keys.current.a && !keys.current.s && !keys.current.w) {
        setIsWalking(false);
      }
    };

    const gameLoop = () => {
      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (keys.current.d) newX -= moveSpeed;
        if (keys.current.a) newX += moveSpeed;
        if (keys.current.s) newY -= moveSpeed;
        if (keys.current.w) newY += moveSpeed;

        return { x: newX, y: newY };
      });

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop); // gameLoop будет вызываться перед отрисовкой каждого кадра
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // управление памятью, очистка кадров
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (walkAnimationTimer.current) {
        clearInterval(walkAnimationTimer.current);
      }
    };
  }, []); // в конце "[]" - методы handleKeyDown, handleKeyUp, gameLoop создаются один раз после рендеринга компонента Game,
          // однако впоследствие они могут и будут повторно вызываться

  // текущее изображение для отображения
  const getCurrentImage = () => {
    if (!isWalking) {
      return '/assets/images/walk_animation/static.png';
    }
    const frameIndex = frames[currentFrame];
    return `/assets/images/walk_animation/${frameIndex}.png`;
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: '#000'
    }}>
      {/* Фон */}
      <img
        src="/assets/images/background.png"
        alt="game background"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          width: 'auto',
          height: 'auto'
        }}
      />

      {/* Персонаж (в центре экрана) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transformStyle: 'preserve-3d'
      }}>
        {/* Тень */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '210px',
          height: '80px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '50%',
          zIndex: 1
        }} />
        {/* <div style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '2px 8px',
          borderRadius: '10px',
          fontSize: '22px',
          fontFamily: 'monospace',
          zIndex: 3
        }}>
          {isWalking ? frames[currentFrame] : 'static'}
        </div> */}
        {/* Персонаж */}
        <img
          src={getCurrentImage()}
          alt="character"
          style={{
            width: `${characterWidth}px`,
            height: `${characterHeight}px`,
            transform: facingDirection === 'left' ? 'scaleX(-1)' : 'none',
            transition: 'transform 0.1s ease',
            position: 'relative',
            zIndex: 2
          }}
        />
      </div>
    </div>
  );
};

export default GameWorld;