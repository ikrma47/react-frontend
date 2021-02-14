import { connect } from "react-redux";
import React, { useEffect } from "react";
import DisplayExperience from "components/DisplayComponent/DisplayExperience";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import { getExperienceOfSelectedAppIdAction } from "pages/Admin/ApplicationForm/Experience/ducks/actions";

const tableHeads = ["Job Title", "Organization", "To", "From", "Salary/ Grade", "Designation"];

const Experience = ({ appId, history, experience, getExperienceOfSelectedAppIdAction }) => {
	useEffect(() => {
		async function getExperienceById(appId) {
			if (appId) await getExperienceOfSelectedAppIdAction(appId);
			else history.push("/admin/dashboard");
		}

		getExperienceById(appId);
	}, []);
	if (experience?.success)
		return <DisplayExperience tableHeads={tableHeads} experiences={experience.data} />;
	else return <CenteredSpinner />;
};

const mapStateToProps = (state) => ({
	appId: state.app.selectedAppId,
	experience: state.admin.experience,
});

export default connect(mapStateToProps, { getExperienceOfSelectedAppIdAction })(Experience);
