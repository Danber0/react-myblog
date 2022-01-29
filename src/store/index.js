import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authUser } from "./reducers/authUser";
import { postUser } from "./reducers/postUser";

const rootReducer = combineReducers({
  authUser,
  postUser,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
