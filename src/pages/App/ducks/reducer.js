import {
	SELECTED_APPID,
	UNSELECT_APPID,
	GET_APPLICATION_STATUS,
	UPDATE_APPLICATION_STATUS,
} from "pages/App/ducks/action-types";

const initialState = {};

function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_APPLICATION_STATUS:
			state = { ...state, ...action.payload };
			break;
		case UPDATE_APPLICATION_STATUS:
			state = { ...state, ...action.payload };
			break;
		case SELECTED_APPID:
			state = { ...state, selectedAppId: action.payload };
			break;
		case UNSELECT_APPID:
			state = { ...state, selectedAppId: action.payload };
			break;
		default:
	}
	return state;
}

export default reducer;
