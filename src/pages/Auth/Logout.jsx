import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteUserToken } from "utils/user";
import { AppRoutes } from "routes";
import { logoutUserAction } from "pages/Auth/ducks/actions";

const Logout = ({ logoutUserAction }) => {
  useEffect(() => {
    deleteUserToken();
    logoutUserAction();
    window.location.replace(AppRoutes.LOGIN.path);
  }, []);
  return <></>;
};

export default connect(null, { logoutUserAction })(Logout);
