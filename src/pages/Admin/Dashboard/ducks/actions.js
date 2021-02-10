import { GET_ADMIN_DASHBOARD } from "pages/Admin/Dashboard/ducks/action-types";
import { getAdminDashboard } from 'api';

export const getAdminDashboardAction = () => async dispatch => {
  try {
    let { data } = await getAdminDashboard()
    dispatch({ type: GET_ADMIN_DASHBOARD, payload: data })
  } catch (error) {
    console.log(error)
  }
}