const {
  REACT_APP_IS_PRODUCTION,
  REACT_APP_API_URL,
  REACT_APP_SENTRY_URL,
} = process.env;

export const IS_PRODUCTION = REACT_APP_IS_PRODUCTION === "false";
export const API_BASE_PATH_USER = REACT_APP_API_URL.toString();
export const API_BASE_PATH_ADMIN = REACT_APP_API_URL.toString() + "/admin";
export const SENTRY_URL = REACT_APP_SENTRY_URL.toString();
export const APP_NAME = "PGS Admission System";
export const COOKIE_USER_TOKEN_FIELD = "authToken";
