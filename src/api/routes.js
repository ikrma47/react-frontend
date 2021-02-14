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
	getProfile: `${API_BASE_PATH_USER}/profile/<appId>`,
	getAcademics: `${API_BASE_PATH_USER}/academics/<appId>`,
	getExperience: `${API_BASE_PATH_USER}/experience/<appId>`,
	getPreferencesRecord: `${API_BASE_PATH_USER}/preference/<appId>`,
	getDocument: `${API_BASE_PATH_USER}/document/<appId>`,
	getDepartment: `${API_BASE_PATH_USER}/department`,
	getCourse: `${API_BASE_PATH_USER}/course`,
	userDashboard: `${API_BASE_PATH_USER}/dashboard/<appId>`,
	getSignedUrl: `${API_BASE_PATH_USER}/get-signed-url`,
	updateApplicationStatus: `${API_BASE_PATH_USER}/application-status`,
	updateProfileDetails: `${API_BASE_PATH_USER}/profile/update-profile-details`,
	updateProfilePicture: `${API_BASE_PATH_USER}/profile/update-profile-picture`,
	updateCourseCategory: `${API_BASE_PATH_USER}/profile/update-course-category`,
	submitAcademics: `${API_BASE_PATH_USER}/academics`,
	submitExperience: `${API_BASE_PATH_USER}/experience`,
	submitPreference: `${API_BASE_PATH_USER}/preference`,
	submitDocument: `${API_BASE_PATH_USER}/document`,
	uploadDocument: `${API_BASE_PATH_USER}/document`,
	deleteExperience: `${API_BASE_PATH_USER}/experience/<id>`,
	deletePreference: `${API_BASE_PATH_USER}/preference/<preference>`,
	adminDashboard: `${API_BASE_PATH_ADMIN}/dashboard`,
	updateApplicationStatusByAdmin: `${API_BASE_PATH_ADMIN}/application-status/<appId>`,
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
