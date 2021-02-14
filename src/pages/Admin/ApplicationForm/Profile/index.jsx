import { connect } from "react-redux";
import React, { useEffect } from "react";
import DisplayProfile from "components/DisplayComponent/DisplayProfile";
import { getProfileOfSelectedAppIdAction } from "pages/Admin/ApplicationForm/Profile/ducks/actions";
import { Spinner as CenteredSpinner } from "elements/Spinner";

const Profile = ({ appId, profile, getProfileOfSelectedAppIdAction }) => {
	useEffect(() => {
		async function getProfileById(appId) {
			await getProfileOfSelectedAppIdAction(appId);
		}

		getProfileById(appId);
	}, []);

	const [{ email, cnic, detail = {} } = {}] = profile?.data || [];

	const {
		name,
		fatherName,
		domicile,
		religion,
		phoneNumber: { personalNumber, optionalNumber } = {},
		dob,
		address: { mailingAddress, residentialAddress } = {},
		courseCategory,
		image,
	} = detail || {};

	const initialValues = {
		name: `${name || ""}`,
		fatherName: `${fatherName || ""}`,
		domicile: `${domicile || ""}`,
		email: `${email || ""}`,
		cnic: `${cnic || ""}`,
		religion: `${religion || ""}`,
		personalNumber: `${personalNumber || ""}`,
		optionalNumber: `${optionalNumber || ""}`,
		dob: `${dob?.split("-").reverse().join("-") || ""}`,
		residentialAddress: `${residentialAddress || ""}`,
		mailingAddress: `${mailingAddress || ""}`,
		courseCategory: `${courseCategory || ""}`,
		image,
	};

	if (profile?.success) return <DisplayProfile initialValues={initialValues} />;
	else return <CenteredSpinner />;
};

const mapStateToProps = (state) => ({
	appId: state.app.selectedAppId,
	profile: state.admin.profile,
});

export default connect(mapStateToProps, { getProfileOfSelectedAppIdAction })(Profile);
