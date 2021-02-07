import {
  GET_APPLICATION_STATUS,
  UPDATE_APPLICATION_STATUS,
} from "pages/App/ducks/action-types";

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATION_STATUS:
      state = { ...state, ...action.payload };
      break;
    case UPDATE_APPLICATION_STATUS:
      state = { ...state, ...action.payload };
      break;
    default:
  }
  return state;
}

export default reducer;
