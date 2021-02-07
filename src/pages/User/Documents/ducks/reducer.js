import {
  GET_DOCUMENT,
  SUBMIT_DOCUMENT,
} from "pages/User/Documents/ducks/action-types";

var initialState = {};

function documentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOCUMENT:
      state = { ...state, ...action.payload };
      break;
    case SUBMIT_DOCUMENT:
      state = { ...state, ...action.payload };
      break;
    default:
  }
  return state;
}

export default documentReducer;
