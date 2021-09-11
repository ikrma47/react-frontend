import {
  SUBMIT_ACADEMICS,
  GET_ACADEMICS_BY_ID,
} from "pages/User/Academics/ducks/action-type";
import { submitAcademics, getAcademicsById } from "api";

export const getAcademicsByIdAction = (appId) => async (dispatch) => {
  try {
    let { data } = await getAcademicsById(appId);
    dispatch({ type: GET_ACADEMICS_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const submitAcademicsAction = (values, id) => async (dispatch) => {
  try {
    let { data } = await submitAcademics(values, id);
    dispatch({ type: SUBMIT_ACADEMICS, payload: data });
  } catch (e) {
    console.log(e);
  }
};
