import map from "lodash/map";
import size from "lodash/size";
import last from "lodash/last";
import replace from "lodash/replace";
import { API_BASE_PATH } from "config";

const ROUTES_OBJ = {
  signup: `${API_BASE_PATH}/signup/`,
  login: `${API_BASE_PATH}/login/`,
  forgetPassowrd: `${API_BASE_PATH}/email-otp`,
  verifyOtp: `${API_BASE_PATH}/forget-password/verify-otp`,
  resetPassword: `${API_BASE_PATH}/forget-password/reset-password`,
  verifyEmailByOtp: `${API_BASE_PATH}/verify-email/otp`,
  getApplicationStatus: `${API_BASE_PATH}/application-status/<appId>/`,
  getProfile: `${API_BASE_PATH}/profile/<appId>/`,
  getAcademics: `${API_BASE_PATH}/academics/<appId>/`,
  getExperience: `${API_BASE_PATH}/experience/<appId>/`,
  getPreferencesRecord: `${API_BASE_PATH}/preference/<appId>/`,
  getDocument: `${API_BASE_PATH}/document/<appId>/`,
  getDepartmentByBatch: `${API_BASE_PATH}/department/<batchId>`,
  getCourse: `${API_BASE_PATH}/course`,
  userDashboard: `${API_BASE_PATH}/dashboard/<appId>/`,
  getSignedUrl: `${API_BASE_PATH}/get-signed-url/`,
  getOfferedPrograms: `${API_BASE_PATH}/offered-programs/<batchId>`,
  updateApplicationStatus: `${API_BASE_PATH}/application-status/<appId>/`,
  updateProfileDetails: `${API_BASE_PATH}/profile/<appId>/`,
  updateProfilePicture: `${API_BASE_PATH}/update-profile-picture/<appId>/`,
  updateCourseCategory: `${API_BASE_PATH}/update-course-category/<appId>/`,
  submitAcademics: `${API_BASE_PATH}/academics/<id>/`,
  submitExperience: `${API_BASE_PATH}/experience/`,
  submitPreference: `${API_BASE_PATH}/preference`,
  submitDocument: `${API_BASE_PATH}/document/<appId>/`,
  deleteExperience: `${API_BASE_PATH}/experience/<id>`,
  deletePreference: `${API_BASE_PATH}/preference/<preference>`,
  adminDashboard: `${API_BASE_PATH}/admin/dashboard`,
  updateApplicationStatusByAdmin: `${API_BASE_PATH}/application-status/<appId>/`,
  submitBatch: `${API_BASE_PATH}/batch`,
  getProgramsToBeOffered: `${API_BASE_PATH}/offered-programs/<batchId>`,
  submitOfferedPrograms: `${API_BASE_PATH}/offered-programs/<batchId>`,
  getBatches: `${API_BASE_PATH}/batch`,
  submitSemester: `${API_BASE_PATH}/semester`,
  getSemesters: `${API_BASE_PATH}/semester`,
  getSemester: `${API_BASE_PATH}/semester/<semesterId>`,
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
