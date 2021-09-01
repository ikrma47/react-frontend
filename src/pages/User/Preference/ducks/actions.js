import {
  GET_COURSES,
  GET_PREFERENCES_RECORD,
  GET_DEPARTMENT,
  SUBMIT_PREFERENCE,
  DELETE_PREFERENCE,
} from "pages/User/Preference/ducks/action-types";
import {
  deletePreference,
  getCourse,
  getDepartmentByBatch,
  getPreferencesRecordById,
  submitPreference,
} from "api";

export const getCourseAction = () => async (dispatch) => {
  try {
    let { data } = await getCourse();
    dispatch({ type: GET_COURSES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPreferencesRecordByIdAction = (appId) => async (dispatch) => {
  try {
    let { data } = await getPreferencesRecordById(appId);
    dispatch({ type: GET_PREFERENCES_RECORD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getDepartmentByBatchAction = (batchId) => async (dispatch) => {
  try {
    let { data } = await getDepartmentByBatch(batchId);
    dispatch({ type: GET_DEPARTMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const submitPreferenceAction = (dataObj) => async (dispatch) => {
  try {
    let { data } = await submitPreference(dataObj);
    dispatch({ type: SUBMIT_PREFERENCE, payload: data });
  } catch (error) {
    console.log(error.response.message);
  }
};

export const deletePreferenceAction = (preference) => async (dispatch) => {
  try {
    let { data } = await deletePreference(preference);
    dispatch({ type: DELETE_PREFERENCE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
