import {
  SUBMIT_ACADEMICS,
  GET_ACADEMICS_BY_ID,
} from "pages/User/Academics/ducks/action-type";

function academicsReducer(state = {}, action) {
  switch (action.type) {
    case GET_ACADEMICS_BY_ID:
      state = { ...state, ...action.payload };
      break;
    case SUBMIT_ACADEMICS:
      state = { ...state, ...action.payload };
      break;
    default:
  }
  return state;
}

export default academicsReducer;
