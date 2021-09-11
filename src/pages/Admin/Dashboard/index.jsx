import { connect } from "react-redux";
import querystring from "query-string";
import { Tabs, Tab, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  selectAppIdAction,
  unSelectAppIdAction,
} from "pages/App/ducks/actions";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import { BorderedButton, FilledButton } from "elements/Button";
import DisplayAdminDashboard from "components/DisplayComponent/DisplayAdminDashboard";
import {
  getAdminDashboardAction,
  emptyApplicationFormAction,
  updateApplicationStatusByAdminAction,
} from "pages/Admin/Dashboard/ducks/actions";
import { adminDashboardRoutes } from "routes";

const tableHeads = [
  "user",
  "app#ID",
  "Name",
  "Course Category",
  "Status",
  "Accept",
  "Reject",
];

const Dashboard = ({
  email,
  history,
  dashboard,
  selectAppIdAction,
  unSelectAppIdAction,
  getAdminDashboardAction,
  emptyApplicationFormAction,
  updateApplicationStatusByAdminAction,
}) => {
  useEffect(() => {
    async function getAdminDashboard(params) {
      await getAdminDashboardAction(params);
    }
    getAdminDashboard(querystring.parse(history.location.search));
  }, [history.location.search]);

  const [key, setKey] = useState("submittedApplications");
  const [name, setName] = useState("");
  const [appId, setAppId] = useState("");
  const [category, setCategory] = useState("All");
  const [isSubmitting, handleSubmission] = useState(false);

  const searchHandler = async () => {
    handleSubmission(true);
    try {
      const params = {
        name,
        appId,
        courseCategory: category == "All" ? "" : category,
      };
      history.push(
        `${adminDashboardRoutes.ADMINDASHBOARD.path}?${querystring.stringify(
          params
        )}`
      );
      handleSubmission(false);
    } catch (error) {
      console.log(error);
      handleSubmission(false);
    }
  };

  const acceptHandler = async (appId) => {
    try {
      await updateApplicationStatusByAdminAction(appId, {
        isAccepted: true,
        acceptedBy: email,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const rejectHandler = (appId) => {
    emptyApplicationFormAction();
    unSelectAppIdAction();
    selectAppIdAction(appId);
    history.push("/admin/applicant/submission");
  };
  const handleClick = (appId) => {
    emptyApplicationFormAction();
    unSelectAppIdAction();
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

  const Search = (props) => {
    return (
      <tr>
        <th>Search</th>
        <th>
          <Form.Control
            placeholder="Enter App ID"
            as="input"
            onChange={(e) => setAppId(e.target.value)}
          />
        </th>
        <th>
          <Form.Control
            placeholder="Enter Name"
            as="input"
            onChange={(e) => setName(e.target.value)}
          />
        </th>
        <th>
          <Form.Control
            as="select"
            defaultValue="All"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option values="MS">MS</option>
            <option values="Phd">Phd</option>
          </Form.Control>
        </th>
        <th colSpan="2" />
        <th>
          <BorderedButton
            type="button"
            onClick={() => searchHandler()}
            disabled={isSubmitting}
          >
            Search
          </BorderedButton>
        </th>
      </tr>
    );
  };

  if (dashboard?.success) {
    const [
      { submittedApplicantsDetails = [] } = {},
      { acceptedApplicantsDetails = [] } = {},
    ] = dashboard.data || [];
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
          <DisplayAdminDashboard
            tableHeads={tableHeads}
            handleClick={handleClick}
            message={"waiting to be accepted"}
            applicants={submittedApplicantsDetails}
            actionButtons={[AcceptButton, RejectButton]}
            buttonHandlers={[acceptHandler, rejectHandler]}
            search={Search}
          />
        </Tab>
        <Tab eventKey="acceptedApplication" title="Accepted Application">
          <DisplayAdminDashboard
            message={"Accepted"}
            handleClick={handleClick}
            applicants={acceptedApplicantsDetails}
            tableHeads={[
              ...tableHeads.slice(0, tableHeads.length - 2),
              "Accepted By",
            ]}
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
  emptyApplicationFormAction,
  getAdminDashboardAction,
  unSelectAppIdAction,
  selectAppIdAction,
})(Dashboard);
