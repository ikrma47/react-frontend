import {
  GET_DOCUMENT,
  SUBMIT_DOCUMENT,
} from "pages/User/Documents/ducks/action-types";
import {
  getDocumentById,
  submitDocument,
  getSignedUrl,
  AWSS3PutRequest,
} from "api";

export const getDocumentByIdAction = (appId) => async (dispatch) => {
  try {
    let { data } = await getDocumentById(appId);
    dispatch({ type: GET_DOCUMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const submitDocumentAction = ({ docName, file }) => async (dispatch) => {
  try {
    let response = await getSignedUrl({
      fileName: file.name,
      fileType: file.type,
    });
    let { signedRequest, url } = response?.data?.data[0] || {};

    // fileType in the headers for the upload
    let options = { headers: { "Content-Type": file.type } };
    await AWSS3PutRequest(signedRequest, file, options);

    let { data } = await submitDocument({ [docName]: url });
    dispatch({ type: SUBMIT_DOCUMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
