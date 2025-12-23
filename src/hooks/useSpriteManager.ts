import { useRef, useEffect, useState } from 'react';
import { ASSET_PATHS, ANIMATION_CONFIG } from '../constants';

// загрузка спрайтов персонажа

export const useSpriteManager = () => {
  const sprites = useRef<Map<string, HTMLImageElement>>(new Map()); // хранилище спрайтов персонажа
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadSprites = async () => {
      const spriteUrls = [
        { key: 'static', url: ASSET_PATHS.CHARACTER.STATIC },
        ...ANIMATION_CONFIG.WALK.FRAMES.map(frame => ({
          key: `frame_${frame}`,
          url: ASSET_PATHS.CHARACTER.FRAME(frame)
        }))
      ];

      let loadedCount = 0;
      // параллельная загрузка через промис
      await Promise.all(
        spriteUrls.map(({ key, url }) => 
          new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              sprites.current.set(key, img);
              loadedCount++;
              resolve(null);
            };
            img.onerror = reject;
            img.src = url;
          })
        )
      );
      setLoaded(true);
    };
    loadSprites();
  }, []);

  const getSprite = (key: string): HTMLImageElement | undefined => {
    return sprites.current.get(key);
  };

  return { 
    loaded,
    getSprite,
    getStaticSprite: () => getSprite('static'),
    getWalkSprite: (frame: number) => getSprite(`frame_${frame}`)
  };
};