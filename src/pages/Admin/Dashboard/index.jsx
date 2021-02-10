import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import DisplayDashboard from "components/DisplayComponent/DisplayDashboard";
import { getAdminDashboardAction } from "pages/Admin/Dashboard/ducks/actions";
import { BorderedButton, FilledButton } from "elements/Button";

const tableHeads = [
  "user",
  "app#ID",
  "Name",
  "Course Category",
  "Status",
  "Accept",
  "Reject",
];
const message = "Waiting to be accepted";

const Dashboard = ({ dashboard, getAdminDashboardAction }) => {
  useEffect(() => {
    async function getAdminDashboard() {
      await getAdminDashboardAction();
    }

    getAdminDashboard();
  }, []);

  const acceptHandler = (appId) => console.log(appId);
  const rejectHandler = (appId) => console.log(appId);

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

  if (dashboard?.success)
    return (
      <DisplayDashboard
        tableHeads={tableHeads}
        applicants={dashboard.data}
        message={message}
        actionButtons={[AcceptButton, RejectButton]}
        buttonHandlers={[acceptHandler, rejectHandler]}
      />
    );
  else return <CenteredSpinner />;
};

const mapStateToProps = (state) => ({ dashboard: state?.admin?.dashboard });

export default connect(mapStateToProps, { getAdminDashboardAction })(Dashboard);
