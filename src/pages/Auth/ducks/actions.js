import {
  SIGNUP,
  AUTH_USER,
  SIGNOUT,
  VERIFY_EMAIL_BY_OTP,
} from "pages/Auth/ducks/action-types";
import { signupUser, authenticateUser, verifyEmailByOtp } from "api";
import { setUserToken } from "utils/user";

export const signupUserAction = ({ email, password, cnic }) => async (
  dispatch
) => {
  try {
    let {
      data: { success, message },
    } = await signupUser({ email, password, cnic });
    dispatch({ type: SIGNUP, payload: { success, message } });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const authenticateUserAction = ({ emailOrCnic, password }) => async (
  dispatch
) => {
  try {
    let { data } = await authenticateUser({ emailOrCnic, password });
    let [{ token, isAdmin, appId, isVerified, email, batchId }] = data.data;
    setUserToken(token);
    dispatch({
      type: AUTH_USER,
      payload: { isAdmin, appId, isVerified, email, batchId },
    });
  } catch (e) {
    if (e.response?.status === 423)
      dispatch({ type: AUTH_USER, payload: e.response.data.data[0] });
    return Promise.reject(e);
  }
};

export const verifyEmailByOtpAction = ({ email: userEmail, otp }) => async (
  dispatch
) => {
  try {
    let { data } = await verifyEmailByOtp({ email: userEmail, otp });
    let [{ token, isAdmin, appId, isVerified, email, batchId }] = data.data;
    setUserToken(token);
    dispatch({
      type: VERIFY_EMAIL_BY_OTP,
      payload: { isAdmin, appId, isVerified, email, batchId },
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const logoutUserAction = () => ({ type: SIGNOUT });
