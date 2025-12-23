export const CAMERA_CONFIG = {
  BASE_ZOOM: 1,
  MAX_ZOOM: 1.2,
  ZOOM_SPEED: 0.002,
  VSYNC: {
    ENABLED: true,
    TARGET_FPS: 60,
    MAX_DELTA: 1000 / 30
  }
} as const;