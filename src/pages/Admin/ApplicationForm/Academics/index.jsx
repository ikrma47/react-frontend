import { connect } from "react-redux";
import React, { useEffect } from "react";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import DisplayAcademics from "components/DisplayComponent/DisplayAcademics";
import { getAcademicsOfSelectedAppIdAction } from "pages/Admin/ApplicationForm/Academics/ducks/actions";

const tableHeads = [
	"examination",
	"year Held",
	"Max Marks",
	"Obtained Marks",
	"CGPA/ Percentage",
	"Awards",
	"Institute",
	"Majors",
];

const Academics = ({ appId, history, academics, getAcademicsOfSelectedAppIdAction }) => {
	useEffect(() => {
		async function getAcademicsById(appId) {
			if (appId) await getAcademicsOfSelectedAppIdAction(appId);
			else history.push("/admin/dashboard");
		}

		getAcademicsById(appId);
	}, []);
	if (academics?.success)
		return <DisplayAcademics tableHeads={tableHeads} academics={academics.data} />;
	else return <CenteredSpinner />;
};

const mapStateToProps = (state) => ({
	appId: state.app.selectedAppId,
	academics: state.admin.academics,
});

export default connect(mapStateToProps, { getAcademicsOfSelectedAppIdAction })(Academics);
