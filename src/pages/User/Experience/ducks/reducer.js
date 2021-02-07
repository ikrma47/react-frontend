import {
  GET_EXPERIENCE_BY_ID,
  SUBMIT_EXPERIENCE,
  DELETE_EXPERIENCE,
} from "pages/User/Experience/ducks/action-type";

var initialState = {};

function experienceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXPERIENCE_BY_ID:
      state = { ...state, ...action.payload };
      break;
    case SUBMIT_EXPERIENCE:
      state = { ...state, ...action.payload };
      break;
    case DELETE_EXPERIENCE:
      state = { ...state, ...action.payload };
      break;
    default:
  }
  return state;
}

export default experienceReducer;
