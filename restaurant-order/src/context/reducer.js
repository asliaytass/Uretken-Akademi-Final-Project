export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_CARDITEMS : "SET_CARDITEMS",
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };

      case actionType.SET_CARDITEMS:
        return {
          ...state,
          cardItems: action.cardItems,
        };

    default:
      return state;
  }
};

export default reducer;
