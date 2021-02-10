import map from "lodash/map";
import size from "lodash/size";
import last from "lodash/last";
import replace from "lodash/replace";
import { API_BASE_PATH_USER, API_BASE_PATH_ADMIN } from "config";

const ROUTES_OBJ = {
  signup: `${API_BASE_PATH_USER}/signup`,
  login: `${API_BASE_PATH_USER}/login`,
  forgetPassowrd: `${API_BASE_PATH_USER}/email-otp`,
  verifyOtp: `${API_BASE_PATH_USER}/forget-password/verify-otp`,
  resetPassword: `${API_BASE_PATH_USER}/forget-password/reset-password`,
  verifyEmailByOtp: `${API_BASE_PATH_USER}/verify-email/otp`,
  getApplicationStatus: `${API_BASE_PATH_USER}/application-status/<appId>`,
  updateApplicationStatus: `${API_BASE_PATH_USER}/application-status`,
  getSignedUrl: `${API_BASE_PATH_USER}/get-signed-url`,
  userDashboard: `${API_BASE_PATH_USER}/dashboard/<appId>`,
  profile: `${API_BASE_PATH_USER}/profile/<appId>`,
  updateProfileDetails: `${API_BASE_PATH_USER}/profile/update-profile-details`,
  updateProfilePicture: `${API_BASE_PATH_USER}/profile/update-profile-picture`,
  updateCourseCategory: `${API_BASE_PATH_USER}/profile/update-course-category`,
  getAcademics: `${API_BASE_PATH_USER}/academics/<appId>`,
  submitAcademics: `${API_BASE_PATH_USER}/academics`,
  getExperience: `${API_BASE_PATH_USER}/experience/<appId>`,
  submitExperience: `${API_BASE_PATH_USER}/experience`,
  deleteExperience: `${API_BASE_PATH_USER}/experience/<id>`,
  getCourse: `${API_BASE_PATH_USER}/course`,
  getDepartment: `${API_BASE_PATH_USER}/department`,
  getPreferencesRecord: `${API_BASE_PATH_USER}/preference/<appId>`,
  submitPreference: `${API_BASE_PATH_USER}/preference`,
  deletePreference: `${API_BASE_PATH_USER}/preference/<preference>`,
  getDocument: `${API_BASE_PATH_USER}/document/<appId>`,
  submitDocument: `${API_BASE_PATH_USER}/document`,
  uploadDocument: `${API_BASE_PATH_USER}/document`,
  adminDashboard: `${API_BASE_PATH_ADMIN}/dashboard`
};
/**
 * getRoute creates the URL through provided routeName & params arguments
 * @param  {string} routeName   any object name of ROUTES_OBJ e.g. login
 * @param  {Object} [params={}] param values replace with strings present <...>.
 * @return {string}             URL
 * @TODO: implement routing for array based data, if the value is an array then
 */
const getRoute = (routeName, params = {}) => {
  let url = ROUTES_OBJ[routeName];
  const result = map(params, (val, key) => {
    val = Array.isArray(val) ? val.join(",") : val;
    url = replace(url, new RegExp(`<${key}>`, "g"), val);
    return url;
  });
  url = size(result) > 0 ? last(result) : url;
  return url;
};

export default getRoute;
