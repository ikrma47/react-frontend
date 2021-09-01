import {
  GET_SEMESTER,
  GET_SEMESTERS,
  SUBMIT_SEMESTER,
} from "pages/Admin/Semester/ducks/action-types";
import { getSemester, getSemesters, submitSemester } from "api";

export const submitSemesterAction = (semesterData) => async (dispatch) => {
  const { data } = await submitSemester(semesterData);
  dispatch({ type: SUBMIT_SEMESTER, payload: data });
};

export const getSemestersAction = () => async (dispatch) => {
  const { data } = await getSemesters();
  dispatch({ type: GET_SEMESTERS, payload: data });
};

export const getSemesterAction = (semesterId) => async (dispatch) => {
  const { data } = await getSemester(semesterId);
  dispatch({ type: GET_SEMESTER, payload: data });
};
