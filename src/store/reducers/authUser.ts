const InitialStateAuth = {
  isAuth: false,
};

export const authUser = (state = InitialStateAuth, action) => {
  switch (action.type) {
    case "SET_AUTH_TRUE":
      return {
        ...state,
        isAuth: true,
      };
    case "SET_AUTH_FALSE":
      return {
        ...state,
        isAuth: false,
      };
    case "SET_USER_ID":
      return {
        ...state,
        user: {
          id: action.payload,
        },
      };
    default:
      return state;
  }
};
