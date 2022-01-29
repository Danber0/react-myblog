export const setAuthTrue = () => ({
  type: "SET_AUTH_TRUE",
});

export const setAuthFalse = () => ({
  type: "SET_AUTH_FALSE",
});

export const setUserId = (id) => ({
  type: "SET_USER_ID",
  payload: id,
});
