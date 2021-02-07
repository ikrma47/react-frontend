import {
  GET_APPLICATION_STATUS,
  UPDATE_APPLICATION_STATUS,
} from "pages/App/ducks/action-types";
import { getApplicationStatus, updateApplicationStatus } from "api";

export const getApplicationStatusAction = (appId) => async (dispatch) => {
  try {
    let { data } = await getApplicationStatus(appId);
    dispatch({ type: GET_APPLICATION_STATUS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateApplicationStatusAction = (dataObj) => async (dispatch) => {
  try {
    let { data } = await updateApplicationStatus(dataObj);
    dispatch({ type: UPDATE_APPLICATION_STATUS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
