import {
  FORGET_PASSWORD,
  VERIFY_OTP,
  RESET_PASSWORD,
} from 'pages/ResetPassword/ducks/action-types';

const initialState = { user: {} };

function reducer(state = initialState, action) {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = { ...state, forgetPassword: { ...action.payload } };
      break;
    case VERIFY_OTP:
      state = { ...state, verifyOtp: { ...action.payload } };
      break;
    case RESET_PASSWORD:
      state = { ...state, resetPassword: { ...action.payload } };
      break;
    default:
  }
  return state;
}

export default reducer;
