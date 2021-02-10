import { initial } from "lodash";
import { GET_ADMIN_DASHBOARD } from "pages/Admin/Dashboard/ducks/action-types";

const initialState = {};

function adminDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN_DASHBOARD:
      state = { ...state, ...action.payload }
      break;
    default:
  }
  return state;
}

export default adminDashboardReducer;