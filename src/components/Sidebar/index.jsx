import React, { memo } from "react";
import { Nav } from "react-bootstrap";
import { Sidebar as Wrapper, Link } from "components/Sidebar/style";
import { dashboardRoutes, AppRoutes } from "routes";

const Sidebar = memo(() => {
  return (
    <Wrapper>
      <Nav>
        <Link to={dashboardRoutes.DASHBOARD.path}>Dashboard</Link>
        <Link to={dashboardRoutes.PROFILE.path}>Profile</Link>
        {/* <Link to={dashboardRoutes.}>Change Password</Link> */}
        <Link to={AppRoutes.LOGOUT.path}>Logout</Link>
      </Nav>
    </Wrapper>
  );
});

export default Sidebar;
