export const CHAPTER_1_FLAGS = {
  rat_food_taken: false,
  rat_food_purchased: false,
  mice_fed: false
};

export const setChapter1Flag = (flagName: keyof typeof CHAPTER_1_FLAGS, value: boolean) => {
  CHAPTER_1_FLAGS[flagName] = value;
};

export const getChapter1Flag = (flagName: keyof typeof CHAPTER_1_FLAGS) => {
  return CHAPTER_1_FLAGS[flagName];
};

export const resetChapter1Flags = () => {
  Object.keys(CHAPTER_1_FLAGS).forEach(key => {
    CHAPTER_1_FLAGS[key as keyof typeof CHAPTER_1_FLAGS] = false;
  });
};