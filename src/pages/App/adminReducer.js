import { combineReducers } from "redux";
import dashboard from "pages/Admin/Dashboard/ducks/reducer";
import profile from "pages/Admin/ApplicationForm/Profile/ducks/reducer";
import academics from "pages/Admin/ApplicationForm/Academics/ducks/reducer";
import experience from "pages/Admin/ApplicationForm/Experience/ducks/reducer";
import preference from "pages/Admin/ApplicationForm/Preference/ducks/reducer";
import documents from "pages/Admin/ApplicationForm/Documents/ducks/reducer";
import submit from "pages/Admin/ApplicationForm/Submit/ducks/reducer";

export default combineReducers({
	dashboard,
	profile,
	academics,
	experience,
	preference,
	documents,
	submit,
});
