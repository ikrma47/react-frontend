import { GET_ACADEMICS_OF_SELECTED_APPID } from "pages/Admin/ApplicationForm/Academics/ducks/action-types";

function academicsReducer(state = {}, action) {
	switch (action.type) {
		case GET_ACADEMICS_OF_SELECTED_APPID:
			state = { ...state, ...action.payload };
			break;
		default:
	}
	return state;
}

export default academicsReducer;
