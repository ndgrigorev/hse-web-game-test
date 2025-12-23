import { useState } from 'react';

export const useCamera = () => {
  const [zoom] = useState<number>(1);

  const updateCamera = () => {
    // пусто
  };

  return { zoom, updateCamera };
};