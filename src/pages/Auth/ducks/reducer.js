import {
  AUTH_USER,
  SIGNOUT,
  SIGNUP,
  VERIFY_EMAIL_BY_OTP,
} from 'pages/Auth/ducks/action-types';

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      state = { ...state, ...action.payload };
      break;
    case SIGNUP:
      state = { ...state, signup: { ...action.payload } };
      break;
    case VERIFY_EMAIL_BY_OTP:
      state = { ...state, ...action.payload };
      break;
    case SIGNOUT:
      state = initialState;
      break;
    default:
  }
  return state;
}

export default reducer;
