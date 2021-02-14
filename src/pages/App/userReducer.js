import { combineReducers } from "redux";
import dashboard from "pages/User/Dashboard/ducks/reducer";
import profile from "pages/User/Profile/ducks/reducer";
import academics from "pages/User/Academics/ducks/reducer";
import experience from "pages/User/Experience/ducks/reducer";
import documents from "pages/User/Documents/ducks/reducer";
import preference from "pages/User/Preference/ducks/reducer";

export default combineReducers({
  dashboard,
  profile,
  academics,
  experience,
  documents,
  preference
})