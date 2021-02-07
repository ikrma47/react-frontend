import {
  GET_PROFILE_BY_ID,
  UPDATE_PROFILE_PICTURE,
  UPDATE_PROFILE_DETAILS,
  UPDATE_COURSE_CATEGORY,
} from "pages/User/Profile/ducks/action-types";
import {
  getProfileById,
  getSignedUrl,
  AWSS3PutRequest,
  updateProfilePicture,
  updateProfileDetails,
  updateCourseCategory,
} from "api";

export const getProfileByIdAction = (appId) => async (dispatch) => {
  try {
    let { data } = await getProfileById(appId);
    dispatch({ type: GET_PROFILE_BY_ID, payload: data });
  } catch (error) {}
};

export const updateProfileDetailsAction = (dataObj) => async (dispatch) => {
  try {
    let { data } = await updateProfileDetails(dataObj);
    dispatch({ type: UPDATE_PROFILE_DETAILS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCourseCategoryAction = (dataObj) => async (dispatch) => {
  try {
    let { data } = await updateCourseCategory(dataObj);
    dispatch({ type: UPDATE_COURSE_CATEGORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfilePictureAction = (file) => async (dispatch) => {
  try {
    let response = await getSignedUrl({
      fileName: file.name,
      fileType: file.type,
    });
    let { signedRequest, url } = response?.data?.data[0] || {};

    // fileType in the headers for the upload
    let options = { headers: { "Content-Type": file.type } };

    await AWSS3PutRequest(signedRequest, file, options);
    let { data } = await updateProfilePicture({ profilePicture: url });
    dispatch({ type: UPDATE_PROFILE_PICTURE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
