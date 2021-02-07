import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Alert } from 'react-bootstrap';
import { APP_NAME } from 'config';
import { resetPasswordAction } from 'pages/ResetPassword/ducks/actions';
import TextField from '../../elements/Form/TextField';
import { FilledButton } from '../../elements/Button';
import { AppRoutes } from 'routes';

const initStates = {
  password: '',
  confirmPassword: '',
};

const validation = Yup.object({
  password: Yup.string().required('Password should not be empty.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password should not be empty.'),
});

const ResetPassword = ({
  resetPasswordAction,
  history,
  resetPasswordResponse,
  verifyOtpResponse,
}) => {
  React.useEffect(() => {
    if (!(verifyOtpResponse?.data?.length > 0))
      history.push(AppRoutes.VERIFYOTP.path);
  }, []);

  const [message, handleMessage] = useState('');
  const [isSubmitting, handleSubmission] = useState(false);

  const handleSubmit = async (values, { setErrors }) => {
    handleSubmission(true);
    try {
      const { password, confirmPassword } = values;
      const [{ otp, email }] = verifyOtpResponse?.data;
      await resetPasswordAction({ password, confirmPassword, otp, email });
      setTimeout(function waitFor1Sec() {
        handleSubmission(false);
        history.push(AppRoutes.LOGOUT.path);
      }, 1000);
    } catch (error) {
      if (error.response?.data?.message)
        handleMessage(error.response.data.message);
      else if (error?.message) handleMessage(error.message);
      const { password } = error;
      setErrors({ password });
      handleSubmission(false);
    }
  };

  return (
    <Card className='px-2 py-4'>
      <Card.Title className='text-center'>{APP_NAME}</Card.Title>
      <Card.Body>
        {(resetPasswordResponse?.message || message) && (
          <Alert
            variant={`${resetPasswordResponse.success ? 'success' : 'danger'}`}
          >
            {resetPasswordResponse?.message || message}
          </Alert>
        )}
        <Formik
          initialValues={initStates}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextField
              label='Password'
              name='password'
              type='password'
              placeholder='Password'
            />
            <TextField
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              placeholder='Confirm Password'
            />
            <FilledButton
              type='submit'
              disabled={isSubmitting ? true : false}
              className='mr-2'
              style={{ width: '100%' }}
            >
              Submit
            </FilledButton>
          </Form>
        </Formik>
        <Link to={AppRoutes.LOGOUT.path}>Cancel</Link>
      </Card.Body>
    </Card>
  );
};

const mapStateToProp = (state) => {
  return {
    resetPasswordResponse: state.resetPassword?.resetPassword,
    verifyOtpResponse: state.resetPassword?.verifyOtp,
  };
};

export default connect(mapStateToProp, { resetPasswordAction })(ResetPassword);
