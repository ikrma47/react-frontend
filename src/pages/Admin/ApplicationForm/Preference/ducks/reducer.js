import { GET_PREFERENCE_OF_SELECTED_APPID } from "pages/Admin/ApplicationForm/Preference/ducks/action-types";

function preferenceRecordReducer(state = {}, action) {
	switch (action.type) {
		case GET_PREFERENCE_OF_SELECTED_APPID:
			state = { ...state, ...action.payload };
			break;
		default:
	}
	return state;
}

export default preferenceRecordReducer;
