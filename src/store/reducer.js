import { combineReducers } from "redux";
import { SIGNOUT } from "pages/Auth/ducks/action-types";
import app from "pages/App/ducks/reducer";
import auth from "pages/Auth/ducks/reducer";
import userDashboard from "pages/User/Dashboard/ducks/reducer";
import profile from "pages/User/Profile/ducks/reducer";
import academics from "pages/User/Academics/ducks/reducer";
import experience from "pages/User/Experience/ducks/reducer";
import documents from "pages/User/Documents/ducks/reducer";
import preference from "pages/User/Preference/ducks/reducer";
import resetPassword from "pages/ResetPassword/ducks/reducer";

const combinedReducer = combineReducers({
  app,
  auth,
  resetPassword,
  userDashboard,
  profile,
  academics,
  experience,
  documents,
  preference,
});

const rootReducer = (state, action) => {
  if (action.type === SIGNOUT) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
