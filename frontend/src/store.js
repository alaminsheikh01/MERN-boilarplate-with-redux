import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userRegisterReducer } from "./reducer/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
