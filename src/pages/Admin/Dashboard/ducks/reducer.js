import {
	GET_ADMIN_DASHBOARD,
	UPDATE_APPLICATION_STATUS_BY_ADMIN,
} from "pages/Admin/Dashboard/ducks/action-types";

const initialState = {};

function adminDashboardReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ADMIN_DASHBOARD:
			state = { ...state, ...action.payload };
			break;
		case UPDATE_APPLICATION_STATUS_BY_ADMIN:
			state = { ...state, ...action.payload };
			break;
		default:
	}
	return state;
}

export default adminDashboardReducer;
