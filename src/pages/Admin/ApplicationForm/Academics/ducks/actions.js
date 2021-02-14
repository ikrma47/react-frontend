import { GET_ACADEMICS_OF_SELECTED_APPID } from "pages/Admin/ApplicationForm/Academics/ducks/action-types";
import { getAcademicsById } from "api";

export const getAcademicsOfSelectedAppIdAction = (appId) => async (dispatch) => {
	try {
		let { data } = await getAcademicsById(appId);
		dispatch({ type: GET_ACADEMICS_OF_SELECTED_APPID, payload: data });
	} catch (error) {
		console.log(error);
	}
};
