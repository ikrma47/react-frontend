import {
  GET_SEMESTER,
  GET_SEMESTERS,
  SUBMIT_SEMESTER,
} from "pages/Admin/Semester/ducks/action-types";

function semesterReducer(state = {}, action) {
  switch (action.type) {
    case GET_SEMESTERS:
      state = { ...state, semesters: { ...action.payload } };
      break;
    case GET_SEMESTER:
      state = { ...state, semester: { ...action.payload } };
      break;
    case SUBMIT_SEMESTER:
      state = { ...state, semesters: { ...action.payload } };
      break;
    default:
  }
  return state;
}
export default semesterReducer;
