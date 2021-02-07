import { GET_USER_DASHBOARD } from "pages/User/Dashboard/ducks/action-types";

const initialState = {};

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DASHBOARD:
      state = { ...state, ...action.payload };
      break;
    default:
  }
  return state;
}

export default dashboardReducer;
