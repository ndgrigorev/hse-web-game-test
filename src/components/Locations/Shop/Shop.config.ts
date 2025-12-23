export const SHOP_CONFIG = {
  id: 'shop',
  width: 800,
  height: 300,
  background: '/assets/images/backgrounds/shop.jpg',
  backgroundMask: '/assets/images/backgrounds/shop_mask.jpg',
  initialPosition: { x: -90, y: -125 },
  doors: [
    {
      id: "shop_to_street",
      position: { x: 350, y: 240 },
      targetLocation: "street",
      spawnCoords: { x: -1200, y: -80 }
    }
  ],
  objects: [
    {
      id: "rat_food",
      type: "ratfood",
      position: { x: 1100, y: 220 },
      sprite: "/assets/images/objects/rat_food.png"
    }
  ],
  zoneMessages: [
    {
      id: "cashier_message",
      text: "Продавщица: Крыс разводите? Авось едят много.",
      duration: 5000,
      zone: {
        x_left: -200,
        x_right: 300
      },
      repeat: false,
      conditions: {
        chapter1: { rat_food_taken: true }
      }
    }
  ]
};