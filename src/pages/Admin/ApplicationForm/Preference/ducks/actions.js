import { GET_PREFERENCE_OF_SELECTED_APPID } from "pages/Admin/ApplicationForm/Preference/ducks/action-types";
import { getPreferencesRecordById } from "api";

export const getPreferenceOfSelectedAppIdAction = (appId) => async (dispatch) => {
	try {
		let { data } = await getPreferencesRecordById(appId);
		dispatch({ type: GET_PREFERENCE_OF_SELECTED_APPID, payload: data });
	} catch (error) {
		console.log(error);
	}
};
