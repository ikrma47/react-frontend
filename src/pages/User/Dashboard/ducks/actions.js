import { getUserDashboard } from "api";
import { GET_USER_DASHBOARD } from "pages/User/Dashboard/ducks/action-types";

export const getUserDashboardAction = (appId) => async (dispatch) => {
  try {
    let { data } = await getUserDashboard(appId);
    dispatch({ type: GET_USER_DASHBOARD, payload: data });
  } catch (error) {
    console.log(error);
  }
};
