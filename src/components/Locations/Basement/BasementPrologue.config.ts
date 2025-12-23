export const BASEMENT_PROLOGUE_CONFIG = {
  id: 'basementprologue',
  width: 800,
  height: 300,
  background: '/assets/images/backgrounds/background_prologue1.jpg',
  backgroundMask: '/assets/images/backgrounds/background_mask_prologue1.jpg',
  lights: '/assets/images/backgrounds/background_light_prologue.png',
  initialPosition: { x: -90, y: -125 },
  doors: [
    {
      id: "basement_to_room",
      position: { x: 550, y: 270 },
      targetLocation: "room",
      spawnCoords: { x: -750, y: -135 }
    }
  ],
  objects: [
    {
      id: "mouse_1", 
      type: "mouse",
      position: { x: 1200, y: 300 },
      triggerZone: {
        x_left: -1050, 
        x_right: -1000
      }
    }
  ],
  messages: [],
  zoneMessages: [
    {
      id: "prologue1",
      text: "Это Виктор, главный герой. Он работает дезинфектором и ловит крыс.",
      duration: 3000,
      zone: {
        x_left: 60,
        x_right: 221
      },
      repeat: false
    },
    {
      id: "prologue2",
      text: "Виктору жалко убивать крыс, однако найти другую работу он не может.",
      duration: 3000,
      zone: {
        x_left: -600,
        x_right: -250
      },
      repeat: false
    },
    {
      id: "prologue_last",
      text: "Последнюю партию пойманных крыс Виктор пожалел. Теперь они живут в его подвале. А сам Виктор больше не работает дезинфектором, чтобы не травить крыс запахом рабочего костюма.",
      duration: 2000,
      zone: {
        x_left: -1400,
        x_right: -1000
      },
      repeat: true
    }
  ]
};