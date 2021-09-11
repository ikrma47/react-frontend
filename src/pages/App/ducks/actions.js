import {
  SELECTED_APPID,
  UNSELECT_APPID,
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

export const updateApplicationStatusAction = (dataObj, appId) => async (
  dispatch
) => {
  try {
    let { data } = await updateApplicationStatus(dataObj, appId);
    dispatch({ type: UPDATE_APPLICATION_STATUS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const selectAppIdAction = (appId) => ({
  type: SELECTED_APPID,
  payload: appId,
});

export const unSelectAppIdAction = () => ({
  type: UNSELECT_APPID,
  payload: null,
});
