import { GET_PROFILE_OF_SELECTED_APPID } from "pages/Admin/ApplicationForm/Profile/ducks/action-types";
import { getProfileById } from "api";

export const getProfileOfSelectedAppIdAction = (appId) => async (dispatch) => {
	try {
		let { data } = await getProfileById(appId);
		dispatch({ type: GET_PROFILE_OF_SELECTED_APPID, payload: data });
	} catch (error) {
		console.log(error);
	}
};
