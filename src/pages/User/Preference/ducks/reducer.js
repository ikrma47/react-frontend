import {
  DELETE_PREFERENCE,
  GET_COURSES,
  GET_DEPARTMENT,
  GET_PREFERENCES_RECORD,
  SUBMIT_PREFERENCE,
} from "pages/User/Preference/ducks/action-types";

const initialState = {};

function preferencesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      state = { ...state, course: { ...action.payload } };
      break;
    case GET_PREFERENCES_RECORD:
      state = { ...state, record: { ...action.payload } };
      break;
    case SUBMIT_PREFERENCE:
      state = { ...state, record: { ...action.payload } };
      break;
    case DELETE_PREFERENCE:
      state = { ...state, record: { ...action.payload } };
      break;
    case GET_DEPARTMENT:
      state = { ...state, department: { ...action.payload } };
      break;
    default:
  }
  return state;
}

export default preferencesReducer;
