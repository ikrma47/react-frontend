import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import DisplayPreference from "components/DisplayComponent/DisplayPreference";
import { getPreferenceOfSelectedAppIdAction } from "pages/Admin/ApplicationForm/Preference/ducks/actions";

const Preference = ({ appId, history, preference, getPreferenceOfSelectedAppIdAction }) => {
	useEffect(() => {
		async function getPreferenceById(appId) {
			if (appId) await getPreferenceOfSelectedAppIdAction(appId);
			else history.push("/admin/dashboard");
		}

		getPreferenceById(appId);
	}, []);
	if (preference?.success) return <DisplayPreference preferenceList={preference.data} />;
	else return <CenteredSpinner />;
};

const mapStateToProps = (state) => ({
	appId: state.app.selectedAppId,
	preference: state.admin.preference,
});

export default connect(mapStateToProps, { getPreferenceOfSelectedAppIdAction })(Preference);
