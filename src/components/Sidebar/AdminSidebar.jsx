import React, { memo } from "react";
import { Nav } from "react-bootstrap";
import { Sidebar as Wrapper, Link } from "components/Sidebar/style";
import { adminDashboardRoutes, AppRoutes } from "routes";

const Sidebar = memo(() => {
  return (
    <Wrapper>
      <Nav>
        <Link to={adminDashboardRoutes.ADMINDASHBOARD.path}>Dashboard</Link>
        <Link to={adminDashboardRoutes.ADVANCESEARCH.path}>Advance Search</Link>
        <Link to={adminDashboardRoutes.DEPARTMENT.path}>Departments</Link>
        <Link to={adminDashboardRoutes.BATCH.path}>Batch</Link>
        <Link to={adminDashboardRoutes.SEMESTER.path}>Semester</Link>
        <Link to={AppRoutes.LOGOUT.path}>Logout</Link>
      </Nav>
    </Wrapper>
  );
});

export default Sidebar;
