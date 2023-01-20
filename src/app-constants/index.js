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
    snacks: [],
  },
  {
    id: 2,
    name: "burgers",
    snacks: [
      {
        id: 4,
        name: "classic",
      },
      {
        id: 5,
        name: "cheeseBurger",
      },
      {
        id: 6,
        name: "bigMac",
      },
      {
        id: 7,
        name: "bigTasty",
      },
    ],
  },
  {
    id: 3,
    name: "baget",
    snacks: [
      {
        id: 8,
        name: "withHam",
      },
      {
        id: 9,
        name: "withPastra",
      },
      {
        id: 10,
        name: "garlic",
      },
      {
        id: 11,
        name: "withPepperGrill",
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