import { GET_DOCUMENTS_OF_SELECTED_APPID } from "pages/Admin/ApplicationForm/Documents/ducks/action-types";
import { getDocumentById } from "api";

export const getDocumentsOfSelectedAppIdAction = (appId) => async (dispatch) => {
	try {
		let { data } = await getDocumentById(appId);
		dispatch({ type: GET_DOCUMENTS_OF_SELECTED_APPID, payload: data });
	} catch (error) {
		console.log(error);
	}
};
