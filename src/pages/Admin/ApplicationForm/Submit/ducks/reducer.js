import {
	UPDATE_APPLICATION_STATUS_BY_ADMIN,
	GET_APPLICATION_STATUS_BY_ADMIN,
} from "pages/Admin/ApplicationForm/Submit/ducks/action-types";

function submissionReducer(state = {}, action) {
	switch (action.type) {
		case GET_APPLICATION_STATUS_BY_ADMIN:
			state = { ...state, ...action.payload };
			break;
		case UPDATE_APPLICATION_STATUS_BY_ADMIN:
			state = { ...state, ...action.payload };
			break;
		default:
	}
	return state;
}

export default submissionReducer;
