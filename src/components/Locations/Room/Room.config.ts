export const ROOM_CONFIG = {
  id: 'room',
  width: 800,
  height: 300,
  background: '/assets/images/backgrounds/room2.jpg',
  backgroundMask: '/assets/images/backgrounds/room_mask2.jpg',
  initialPosition: { x: 0, y: 0 },
  lights: '/assets/images/backgrounds/room_light2.png',
  doors: [
    {
      id: "room_to_basement",
      position: { x: 1300, y: 310 },
      targetLocation: "basement",
      spawnCoords: { x: -180, y: -150 }
    },
    {
      id: "room_to_street", 
      position: { x: 1100, y: 190 },
      targetLocation: "street",
      spawnCoords: { x: -100, y: -35 }
    }
  ],
  objects: [
    {
      id: "mouse_1",
      type: "mouse",
      position: { x: 500, y: 200 },
      sprite: "/assets/images/objects/mouse1.png"
    }
  ],
  zoneMessages: [
    {
      id: "room_chapter1_intro",
      text: "Корм для крыс снова закончился. Нужно купить новый в магазине.",
      duration: 6000,
      zone: {
        x_left: -400,
        x_right: 10
      },
      repeat: false
    }
  ]
};