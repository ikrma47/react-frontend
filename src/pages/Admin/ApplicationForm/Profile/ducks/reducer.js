import { GET_PROFILE_OF_SELECTED_APPID } from "pages/Admin/ApplicationForm/Profile/ducks/action-types";

function profileReducer(state = {}, action) {
	switch (action.type) {
		case GET_PROFILE_OF_SELECTED_APPID:
			state = { ...state, ...action.payload };
			break;
		default:
	}
	return state;
}

export default profileReducer;
