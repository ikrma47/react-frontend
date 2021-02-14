import { combineReducers } from "redux";
import { SIGNOUT } from "pages/Auth/ducks/action-types";
import app from "pages/App/ducks/reducer";
import auth from "pages/Auth/ducks/reducer";
import user from "pages/App/userReducer"
import admin from "pages/App/adminReducer"
import resetPassword from "pages/ResetPassword/ducks/reducer";

const combinedReducer = combineReducers({
  app,
  auth,
  user,
  admin,
  resetPassword,
});

const rootReducer = (state, action) => {
  if (action.type === SIGNOUT) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
