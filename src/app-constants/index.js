export const LOCAL_STORAGE_STATE_KEY = "BURGER_FACTORY_STATE";

export const LOCAL_STORAGE_STATE =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY)) || {};
export const blockItemsTypes = {
  INGREDIENT: "INGREDIENT",
  GROUP: "GROUP",
};

export const snacksCategories = [
  {
    id: 1,
    name: "sandwiches",
    translation: "Сэндвичи",
    snacks: [],
  },
  {
    id: 2,
    name: "burgers",
    translation: "Бургеры",
    snacks: [
      {
        id: 4,
        name: "classic",
        translation: "Классический",
      },
      {
        id: 5,
        name: "cheeseBurger",
        translation: "Чизбургер",
      },
      {
        id: 6,
        name: "bigMac",
        translation: "Биг Мак",
      },
      {
        id: 7,
        name: "bigTasty",
        translation: "Биг Тейсти",
      },
    ],
  },
  {
    id: 3,
    name: "baget",
    translation: "Багет",
    snacks: [
      {
        id: 8,
        name: "withHam",
        translation: "С ветчиной",
      },
      {
        id: 9,
        name: "withPastra",
        translation: "С пастрой",
      },
      {
        id: 10,
        name: "garlic",
        translation: "Чесночный",
      },
      {
        id: 11,
        name: "withPepperGrill",
        translation: "С перцем грилль",
      },
    ],
  },
];

export const headerNavItems = [
  {
    id: 1,
    name: "Рецепт",
  },
  {
    id: 2,
    name: "Время приготовления",
  },
  {
    id: 3,
    name: "Подача",
  },
];
