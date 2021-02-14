import { GET_DOCUMENTS_OF_SELECTED_APPID } from "pages/Admin/ApplicationForm/Documents/ducks/action-types";

function documentsReducer(state = {}, action) {
	switch (action.type) {
		case GET_DOCUMENTS_OF_SELECTED_APPID:
			state = { ...state, ...action.payload };
			break;
		default:
	}
	return state;
}

export default documentsReducer;
