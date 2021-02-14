import { GET_EXPERIENCE_OF_SELECTED_APPID } from "pages/Admin/ApplicationForm/Experience/ducks/action-types";

function experienceReducer(state = {}, action) {
	switch (action.type) {
		case GET_EXPERIENCE_OF_SELECTED_APPID:
			state = { ...state, ...action.payload };
			break;
		default:
	}
	return state;
}

export default experienceReducer;
