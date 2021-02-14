import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { selectAppIdAction } from "pages/App/ducks/actions";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import { BorderedButton, FilledButton } from "elements/Button";
import DisplayDashboard from "components/DisplayComponent/DisplayDashboard";
import {
	getAdminDashboardAction,
	updateApplicationStatusByAdminAction,
} from "pages/Admin/Dashboard/ducks/actions";

const tableHeads = ["user", "app#ID", "Name", "Course Category", "Status", "Accept", "Reject"];

const Dashboard = ({
	email,
	history,
	dashboard,
	selectAppIdAction,
	getAdminDashboardAction,
	updateApplicationStatusByAdminAction,
}) => {
	useEffect(() => {
		async function getAdminDashboard() {
			await getAdminDashboardAction();
		}

		getAdminDashboard();
	}, []);

	const [key, setKey] = useState("submittedApplications");

	const acceptHandler = async (appId) => {
		try {
			await updateApplicationStatusByAdminAction(appId, { isAccepted: true, acceptedBy: email });
		} catch (error) {
			console.log(error);
		}
	};
	const rejectHandler = (appId) => {
		selectAppIdAction(appId);
		history.push("/admin/applicant/submission");
	};
	const handleClick = (appId) => {
		selectAppIdAction(appId);
		history.push("/admin/applicant/profile");
	};

	const AcceptButton = (props) => {
		return (
			<BorderedButton {...props} type="button">
				Accept
			</BorderedButton>
		);
	};

	const RejectButton = (props) => {
		return (
			<FilledButton {...props} type="button">
				Reject
			</FilledButton>
		);
	};

	if (dashboard?.success) {
		const [{ submittedApplicantsDetails = [] } = {}, { acceptedApplicantsDetails = [] } = {}] =
			dashboard.data || [];
		return (
			<Tabs
				justify
				variant="pills"
				activeKey={key}
				transition={false}
				className="mt-4 mx-3"
				id="adminDashboardTabs"
				onSelect={(k) => setKey(k)}
			>
				<Tab eventKey="submittedApplications" title="Submitted Applications">
					<DisplayDashboard
						tableHeads={tableHeads}
						handleClick={handleClick}
						message={"waiting to be accepted"}
						applicants={submittedApplicantsDetails}
						actionButtons={[AcceptButton, RejectButton]}
						buttonHandlers={[acceptHandler, rejectHandler]}
					/>
				</Tab>
				<Tab eventKey="acceptedApplication" title="Accepted Application">
					<DisplayDashboard
						message={"Accepted"}
						handleClick={handleClick}
						applicants={acceptedApplicantsDetails}
						tableHeads={[...tableHeads.slice(0, tableHeads.length - 2), "Accepted By"]}
					/>
				</Tab>
			</Tabs>
		);
	} else return <CenteredSpinner />;
};

const mapStateToProps = (state) => ({
	dashboard: state?.admin?.dashboard,
	email: state.auth.email,
});

export default connect(mapStateToProps, {
	updateApplicationStatusByAdminAction,
	getAdminDashboardAction,
	selectAppIdAction,
})(Dashboard);
