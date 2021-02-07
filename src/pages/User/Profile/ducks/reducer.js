import {
  GET_PROFILE_BY_ID,
  UPDATE_PROFILE_DETAILS,
  UPDATE_PROFILE_PICTURE,
  UPDATE_COURSE_CATEGORY,
} from "pages/User/Profile/ducks/action-types";

const initialState = {};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_BY_ID:
      state = { ...state, ...action.payload };
      break;
    case UPDATE_PROFILE_DETAILS:
      state = { ...state, ...action.payload };
      break;
    case UPDATE_PROFILE_PICTURE:
      state = { ...state, ...action.payload };
      break;
    case UPDATE_COURSE_CATEGORY:
      state = { ...state, ...action.payload };
      break;
    default:
  }
  return state;
}

export default profileReducer;
