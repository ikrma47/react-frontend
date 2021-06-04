import {
	GET_ADMIN_DASHBOARD,
	UPDATE_APPLICATION_STATUS_BY_ADMIN,
} from "pages/Admin/Dashboard/ducks/action-types";
import { getAdminDashboard, updateApplicationStatusByAdmin } from "api";

export const getAdminDashboardAction = (params) => async (dispatch) => {
	try {
		let { data } = await getAdminDashboard(params);
		dispatch({ type: GET_ADMIN_DASHBOARD, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updateApplicationStatusByAdminAction = (appId, dataObj) => async (dispatch) => {
	try {
		await updateApplicationStatusByAdmin(appId, dataObj);
		let { data } = await getAdminDashboard();
		dispatch({ type: UPDATE_APPLICATION_STATUS_BY_ADMIN, payload: data });
	} catch (error) {
		console.log(error);
	}
};
