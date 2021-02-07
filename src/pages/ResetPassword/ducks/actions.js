import {
  FORGET_PASSWORD,
  VERIFY_OTP,
  RESET_PASSWORD,
} from 'pages/ResetPassword/ducks/action-types';
import { forgetPassword, verifyOtp, resetPassowrd } from 'api';

export const forgetPasswordAction = ({ emailOrCnic }) => async (dispatch) => {
  try {
    let { data } = await forgetPassword({ emailOrCnic });
    dispatch({ type: FORGET_PASSWORD, payload: data });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const verifyOtpAction = ({ otp, email }) => async (dispatch) => {
  try {
    let { data } = await verifyOtp({ otp, email });
    dispatch({ type: VERIFY_OTP, payload: data });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const resetPasswordAction = ({
  email,
  otp,
  password,
  confirmPassword,
}) => async (dispatch) => {
  try {
    let { data } = await resetPassowrd({
      email,
      otp,
      password,
      confirmPassword,
    });
    dispatch({ type: RESET_PASSWORD, payload: data });
  } catch (e) {
    return Promise.reject(e);
  }
};
