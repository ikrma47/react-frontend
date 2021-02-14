import {
	UPDATE_APPLICATION_STATUS_BY_ADMIN,
	GET_APPLICATION_STATUS_BY_ADMIN,
} from "pages/Admin/ApplicationForm/Submit/ducks/action-types";
import { updateApplicationStatusByAdmin, getApplicationStatus } from "api";
import { getAdminDashboardAction } from "pages/Admin/Dashboard/ducks/actions";
import { unSelectAppIdAction } from "pages/App/ducks/actions";

export const updateApplicationStatusByAdminAction = (appId, dataObj) => async (dispatch) => {
	try {
		let { data } = await updateApplicationStatusByAdmin(appId, dataObj);
		dispatch({ type: UPDATE_APPLICATION_STATUS_BY_ADMIN, payload: data });
		await getAdminDashboardAction();
		await unSelectAppIdAction();
	} catch (error) {
		console.log(error);
	}
};

export const getApplicationStatusByIdAction = (appId) => async (dispatch) => {
	try {
		let { data } = await getApplicationStatus(appId);
		dispatch({ type: GET_APPLICATION_STATUS_BY_ADMIN, payload: data });
	} catch (error) {
		console.log(error);
	}
};
