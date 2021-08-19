import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Card, Alert, Row, Col } from "react-bootstrap";
import { APP_NAME } from "config";
import { authenticateUserAction } from "pages/Auth/ducks/actions";
import TextField from "../../elements/Form/TextField";
import { FilledButton, BorderedButton } from "../../elements/Button";
import { AppRoutes, userDashboardRoutes, adminDashboardRoutes } from "routes";
import { isLoggedIn } from "utils/user";

const initStates = {
  emailOrCnic: "",
  password: "",
};

function ValidateEmail(mail) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    mail
  )
    ? true
    : false;
}

const validation = Yup.object({
  emailOrCnic: Yup.string().test(
    "emailOrCnic",
    "Enter Valid Email or CNIC (13 digits without dashes)",
    function (val) {
      return Number(val) ? val.length === 13 : ValidateEmail(val);
    }
  ),
  password: Yup.string().required("Password should not be empty."),
});

const Login = ({
  authenticateUserAction,
  history,
  isVerified,
  appId,
  isAdmin = null,
}) => {
  React.useEffect(() => {
    (() => {
      if (isLoggedIn()) {
        if (isAdmin === true) history.push("/admin/dashboard");
        else if (isAdmin === false)
          history.push(userDashboardRoutes.DASHBOARD.path);
      }
    })();
  }, [isAdmin]);

  const [errorMsg, handleErrorMsg] = useState("");
  const [isSubmitting, handleSubmission] = useState(false);
  const handleSubmit = async (values, { setErrors }) => {
    handleSubmission(true);
    const { emailOrCnic, password } = values;
    try {
      await authenticateUserAction({ emailOrCnic, password });
      handleSubmission(false);
    } catch (error) {
      let fieldError = {};
      if (error?.response?.data?.message) {
        if (error?.response?.status === 423) {
          setTimeout(function waitFor1Sec() {
            history.push(AppRoutes.VERIFYEMAILBYOTP.path);
          }, 1000);
        }
        handleErrorMsg(error.response.data.message);
      } else if (error.message) handleErrorMsg(error.message);
      if (error.emailOrCnic) {
        fieldError = error.emailOrCnic;
      }
      if (error.password) {
        fieldError = error.password;
      }
      setErrors(fieldError);
      handleSubmission(false);
    }
  };
  return (
    <Card className="px-2 py-4">
      <Card.Title className="text-center">
        {APP_NAME}
        <br />
        LOGIN
      </Card.Title>
      <Card.Body>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <Formik
          initialValues={initStates}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextField
              label="Email or CNIC"
              name="emailOrCnic"
              type="text"
              placeholder="Email Or CNIC"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <Row>
              <Col className="mb-2">
                <Link to={AppRoutes.FORGETPASSWORD.path}>Forgot Password?</Link>
              </Col>
            </Row>
            <FilledButton
              type="submit"
              disabled={isSubmitting ? true : false}
              className="mr-2"
            >
              Submit
            </FilledButton>
            <BorderedButton type="reset" className="float-right">
              Reset
            </BorderedButton>
          </Form>
        </Formik>
        <div className="text-center pt-4">
          <Link to="/signup">Signup if you don't have an account yet</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

const mapStateToProp = (state) => {
  const { appId, isAdmin, isVerified } = state.auth;
  return { appId, isAdmin, isVerified };
};

export default connect(mapStateToProp, { authenticateUserAction })(Login);
