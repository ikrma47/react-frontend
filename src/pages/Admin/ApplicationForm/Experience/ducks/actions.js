import { GET_EXPERIENCE_OF_SELECTED_APPID } from "pages/Admin/ApplicationForm/Experience/ducks/action-types";
import { getExperienceById } from "api";

export const getExperienceOfSelectedAppIdAction = (appId) => async (dispatch) => {
	try {
		let { data } = await getExperienceById(appId);
		dispatch({ type: GET_EXPERIENCE_OF_SELECTED_APPID, payload: data });
	} catch (error) {
		console.log(error);
	}
};
