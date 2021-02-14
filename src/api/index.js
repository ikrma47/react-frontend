import axios from "axios";
import getRoute from "api/routes";
import { getUserToken } from "utils/user";

export const setAuthToken = (token) => {
	axios.defaults.headers.common["Authorization"] = `${token}`;
};

function setAuthHeader() {
	setAuthToken(getUserToken());
}

const failedResponse = (error) => {
	if (
		error.response &&
		error.response?.status &&
		error.response?.status === 401 &&
		window.location.pathname !== "/login"
	) {
		window.location.replace("/logout");
	}
	error.message = "Something Went Wrong! Maybe server Error.";
	return Promise.reject(error);
};

const getRequest = async (route) => {
	if (!route) {
		return;
	}
	try {
		return await axios.get(route);
	} catch (error) {
		return failedResponse(error);
	}
};

export const postRequest = async (route, data = {}) => {
	try {
		return await axios.post(route, data);
	} catch (error) {
		return failedResponse(error);
	}
};

export const putRequest = async (route, data = {}) => {
	try {
		return await axios.put(route, data);
	} catch (error) {
		return failedResponse(error);
	}
};

export const getSignedUrl = (dataObj) => {
	const route = getRoute("getSignedUrl");
	return postRequest(route, dataObj);
};

export const AWSS3PutRequest = async (signedRequest, file, options) => {
	let instance = axios.create();
	delete instance.defaults.headers.common["Authorization"];
	try {
		return await instance.put(signedRequest, file, options);
	} catch (error) {
		return failedResponse(error);
	}
};

export const patchRequest = async (route, data = {}) => {
	try {
		return await axios.patch(route, data);
	} catch (error) {
		return failedResponse(error);
	}
};

export const deleteRequest = async (route) => {
	try {
		return await axios.delete(route);
	} catch (error) {
		return failedResponse(error);
	}
};

export const signupUser = (data) => {
	const route = getRoute("signup");
	return postRequest(route, data);
};

export const authenticateUser = (data) => {
	const route = getRoute("login");
	return postRequest(route, data);
};

export const forgetPassword = (data) => {
	const route = getRoute("forgetPassowrd");
	return patchRequest(route, data);
};

export const verifyOtp = (data) => {
	const route = getRoute("verifyOtp");
	return postRequest(route, data);
};

export const resetPassowrd = (data) => {
	const route = getRoute("resetPassword");
	return patchRequest(route, data);
};

export const verifyEmailByOtp = (dataObj) => {
	const route = getRoute("verifyEmailByOtp");
	return patchRequest(route, dataObj);
};

export const getUserDashboard = (appId) => {
	setAuthHeader();
	const route = getRoute("userDashboard", { appId });
	return getRequest(route);
};

export const updateApplicationStatus = (dataObj) => {
	setAuthHeader();
	const route = getRoute("updateApplicationStatus");
	return patchRequest(route, dataObj);
};

export const getApplicationStatus = (appId) => {
	setAuthHeader();
	const route = getRoute("getApplicationStatus", { appId });
	return getRequest(route);
};

export const getProfileById = (appId) => {
	setAuthHeader();
	const route = getRoute("getProfile", { appId });
	return getRequest(route);
};

export const updateProfilePicture = (dataObj) => {
	setAuthHeader();
	const route = getRoute("updateProfilePicture");
	return patchRequest(route, dataObj);
};

export const updateProfileDetails = (dataObj) => {
	setAuthHeader();
	const route = getRoute("updateProfileDetails");
	return patchRequest(route, dataObj);
};

export const updateCourseCategory = (dataObj) => {
	setAuthHeader();
	const route = getRoute("updateCourseCategory");
	return patchRequest(route, dataObj);
};

export const getAcademicsById = (appId) => {
	setAuthHeader();
	const route = getRoute("getAcademics", { appId });
	return getRequest(route);
};

export const submitAcademics = (dataObj) => {
	setAuthHeader();
	const route = getRoute("submitAcademics");
	return postRequest(route, dataObj);
};

export const getExperienceById = (appId) => {
	setAuthHeader();
	const route = getRoute("getExperience", { appId });
	return getRequest(route);
};

export const submitExperience = (dataObj) => {
	setAuthHeader();
	const route = getRoute("submitExperience");
	return postRequest(route, dataObj);
};
export const deleteExperience = (id) => {
	setAuthHeader();
	const route = getRoute("deleteExperience", { id });
	return deleteRequest(route);
};

export const getDocumentById = (appId) => {
	setAuthHeader();
	const route = getRoute("getDocument", { appId });
	return getRequest(route);
};

export const submitDocument = (dataObj) => {
	setAuthHeader();
	const route = getRoute("submitDocument");
	return patchRequest(route, dataObj);
};

export const getCourse = () => {
	setAuthHeader();
	const route = getRoute("getCourse");
	return getRequest(route);
};

export const getPreferencesRecordById = (appId) => {
	setAuthHeader();
	const route = getRoute("getPreferencesRecord", { appId });
	return getRequest(route);
};

export const getDepartment = () => {
	setAuthHeader();
	const route = getRoute("getDepartment");
	return getRequest(route);
};

export const submitPreference = (dataObj) => {
	setAuthHeader();
	const route = getRoute("submitPreference");
	return postRequest(route, dataObj);
};

export const deletePreference = (preference) => {
	setAuthHeader();
	const route = getRoute("deletePreference", { preference });
	return deleteRequest(route);
};

export const getAdminDashboard = () => {
	setAuthHeader();
	const route = getRoute("adminDashboard");
	return getRequest(route);
};

export const updateApplicationStatusByAdmin = (appId, dataObj) => {
	setAuthHeader();
	const route = getRoute("updateApplicationStatusByAdmin", { appId });
	return patchRequest(route, dataObj);
};
