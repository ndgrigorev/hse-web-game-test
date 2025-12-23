export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Keys {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
}

export type Direction = 'left' | 'right';

export interface GameScale {
  scale: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export interface CollisionSystem {
  checkCollision: (x: number, y: number) => boolean;
  isLoaded: boolean;
}

export interface ZoneMessage {
  text: string;
  duration?: number;
  zone: {
    x_left: number;
    x_right: number;
  };
  repeat: boolean;
  id: string;
  conditions?: {
    [chapterId: string]: {
      [flagName: string]: boolean;
    };
  };
}

export interface GameObject {
  id: string;
  type: string;
  position: { x: number; y: number };
  sprite?: string;
  triggerZone?: {
    x_left: number;
    x_right: number;
  };
  targetLocation?: string;
  spawnCoords?: { x: number; y: number };
}