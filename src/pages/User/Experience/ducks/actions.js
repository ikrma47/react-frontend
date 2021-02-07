import { getExperienceById, submitExperience, deleteExperience } from "api";
import {
  GET_EXPERIENCE_BY_ID,
  SUBMIT_EXPERIENCE,
  DELETE_EXPERIENCE,
} from "pages/User/Experience/ducks/action-type";

export const getExperienceByIdAction = (appId) => async (dispatch) => {
  try {
    let { data } = await getExperienceById(appId);
    dispatch({ type: GET_EXPERIENCE_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const submitExperienceAction = (dataObj) => async (dispatch) => {
  try {
    let { data } = await submitExperience(dataObj);
    dispatch({ type: SUBMIT_EXPERIENCE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteExperienceAction = (id) => async (dispatch) => {
  try {
    let { data } = await deleteExperience(id);
    dispatch({ type: DELETE_EXPERIENCE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
