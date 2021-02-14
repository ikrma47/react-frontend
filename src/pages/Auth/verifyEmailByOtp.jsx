import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Alert } from "react-bootstrap";
import { Formik, Form } from "formik";
import TextField from "elements/Form/TextField";
import { FilledButton } from "elements/Button";
import * as Yup from "yup";
import { AppRoutes } from "routes";
import { verifyEmailByOtpAction } from "pages/Auth/ducks/actions";

const initialValues = { otp: "" };

const validate = Yup.object({
  otp: Yup.number()
    .required("OTP should not be empty")
    .test("len", "OTP must be 4 Digits", (val) =>
      val ? val.toString().length === 4 : false
    )
    .typeError("OTP must contains only numeric digits"),
});

const VerifyEmailByOtp = ({ verifyEmailByOtpAction, email, history }) => {
  React.useEffect(() => {
    if (!email) history.replace(AppRoutes.LOGIN.path);
  });

  const [message, handleMessage] = React.useState("");
  const [isSubmitting, handleSubmission] = React.useState(false);

  const handleSubmit = async (values, { setErrors }) => {
    handleSubmission(true);
    const { otp } = values;
    try {
      await verifyEmailByOtpAction({ email, otp });
      handleSubmission(false);
    } catch (error) {
      handleSubmission(false);
      if (error?.response?.data?.message)
        handleMessage(error?.response?.data?.message);
      const { otp } = error;
      setErrors({ otp });
    }
  };

  return (
    <Card className="px-2 py-4">
      <Card.Title className="text-center">Verify Your Email</Card.Title>
      <Card.Body>
        {message && <Alert variant="danger">{message}</Alert>}
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validate}
          initialValues={initialValues}
        >
          <Form>
            <TextField name="otp" label="OTP" placeholder="OTP" type="text" />
            <div className="my-3">please check your email For OTP</div>
            <FilledButton
              type="submit"
              disabled={isSubmitting ? true : false}
              style={{ width: "100%" }}
            >
              Submit
            </FilledButton>
          </Form>
        </Formik>
        <div className="mt-3">
          <Link to={AppRoutes.LOGOUT.path}>Cancel</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

const mapStateToProp = (state) => ({ email: state.auth.email });

export default connect(mapStateToProp, { verifyEmailByOtpAction })(
  VerifyEmailByOtp
);
