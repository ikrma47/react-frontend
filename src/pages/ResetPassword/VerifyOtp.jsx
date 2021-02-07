import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Card, Alert } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TextField from 'elements/Form/TextField';
import { FilledButton } from 'elements/Button';
import { verifyOtpAction } from 'pages/ResetPassword/ducks/actions';
import { AppRoutes } from 'routes';

const validate = Yup.object({
  otp: Yup.number()
    .required('OTP should not be empty')
    .test('len', 'OTP must be 4 Digits', (val) =>
      val ? val.toString().length === 4 : false
    )
    .typeError('OTP must contains only numeric digits'),
});

const initialValues = {
  otp: '',
};

const VerifyOtp = ({
  verifyOtpAction,
  verifyOtpResponse,
  forgetPasswordResponse,
  history,
}) => {
  const [message, handleMessage] = React.useState('');
  const [isSubmitting, handleSubmission] = React.useState(false);

  React.useEffect(() => {
    if (forgetPasswordResponse?.data?.length > 0) {
      if (verifyOtpResponse?.data?.length > 0)
        history.push(AppRoutes.RESETPASSWORD.path);
    } else history.goBack();
  }, []);

  const handleSubmit = async (values, { setErrors }) => {
    handleSubmission(true);
    try {
      let { otp } = values;
      let [{ email }] = forgetPasswordResponse?.data;
      await verifyOtpAction({ otp, email });
      setTimeout(function waitFor1Sec() {
        handleSubmission(false);
        history.push(AppRoutes.RESETPASSWORD.path);
      }, 1000);
      handleSubmission(false);
    } catch (error) {
      if (error?.response?.data.message)
        handleMessage(error.response.data.message);
      else if (error?.message) handleMessage(error.message);
      const { otp } = error;
      setErrors(otp);
      handleSubmission(false);
    }
  };

  return (
    <Card className='px-2 py-4'>
      <Card.Title className='text-center'>Forget Password</Card.Title>
      <Card.Body>
        {(verifyOtpResponse?.message || message) && (
          <Alert
            variant={`${verifyOtpResponse?.success ? 'success' : 'danger'}`}
          >
            {verifyOtpResponse?.message || message}
          </Alert>
        )}
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validate}
          initialValues={initialValues}
        >
          <Form>
            <TextField label='OTP' name='otp' type='text' placeholder='OTP' />
            <FilledButton
              type='submit'
              disabled={isSubmitting ? true : false}
              style={{ width: '100%' }}
            >
              Submit
            </FilledButton>
          </Form>
        </Formik>
        <div className='mt-3'>
          <Link to={AppRoutes.LOGOUT.path}>Cancel</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

const mapStateToProp = (state) => {
  return {
    forgetPasswordResponse: state.resetPassword?.forgetPassword,
    verifyOtpResponse: state.resetPassword?.verifyOtp,
  };
};

export default connect(mapStateToProp, { verifyOtpAction })(VerifyOtp);
