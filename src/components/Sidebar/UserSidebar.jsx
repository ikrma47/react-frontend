import React, { memo } from "react";
import { Nav } from "react-bootstrap";
import { Sidebar as Wrapper, Link } from "components/Sidebar/style";
import { userDashboardRoutes, AppRoutes } from "routes";

const Sidebar = memo(() => {
  return (
    <Wrapper>
      <Nav>
        <Link to={userDashboardRoutes.DASHBOARD.path}>Dashboard</Link>
        <Link to={userDashboardRoutes.PROFILE.path}>Profile</Link>
        {/* <Link to={userDashboardRoutes.}>Change Password</Link> */}
        <Link to={AppRoutes.LOGOUT.path}>Logout</Link>
      </Nav>
    </Wrapper>
  );
});

export default Sidebar;
