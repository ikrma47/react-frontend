import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Card, Alert } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TextField from 'elements/Form/TextField';
import { FilledButton } from 'elements/Button';
import { forgetPasswordAction } from 'pages/ResetPassword/ducks/actions';
import { AppRoutes } from 'routes';

function ValidateEmail(mail) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    mail
  )
    ? true
    : false;
}

const validate = Yup.object({
  emailOrCnic: Yup.string().test(
    'emailOrCnic',
    'Enter Valid Email or CNIC (13 digits without dashes)',
    function (val) {
      return Number(val) ? val.length === 13 : ValidateEmail(val);
    }
  ),
});

const initialValues = {
  emailOrCnic: '',
};

const ForgetPassword = ({
  forgetPasswordAction,
  forgetPasswordResponse,
  history,
}) => {
  React.useEffect(() => {
    if (forgetPasswordResponse?.data?.length > 0)
      history.push(AppRoutes.VERIFYOTP.path);
  }, []);

  const [message, handleMessage] = React.useState('');
  const [isSubmitting, handleSubmission] = React.useState(false);

  const handleSubmit = async (values, { setErrors }) => {
    handleSubmission(true);
    try {
      let { emailOrCnic } = values;
      await forgetPasswordAction({ emailOrCnic });
      setTimeout(function waitFor1Sec() {
        handleSubmission(false);
        history.push(AppRoutes.VERIFYOTP.path);
      }, 1000);
    } catch (error) {
      if (error?.response?.data?.message)
        handleMessage(error.response.data.message);
      else if (error?.message) handleMessage(error.message);
      const { emailOrCnic } = error;
      setErrors({ emailOrCnic });
      handleSubmission(false);
    }
  };

  return (
    <Card className='px-2 py-4'>
      <Card.Title className='text-center'>Forget Password</Card.Title>
      <Card.Body>
        {(forgetPasswordResponse?.message || message) && (
          <Alert
            variant={`${
              forgetPasswordResponse?.success ? 'success' : 'danger'
            }`}
          >
            {forgetPasswordResponse?.message || message}
          </Alert>
        )}
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validate}
          initialValues={initialValues}
        >
          <Form>
            <TextField
              label='Email or CNIC'
              name='emailOrCnic'
              type='text'
              placeholder='Email Or CNIC'
            />
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
          <Link to={AppRoutes.LOGIN.path}>Cancel</Link>
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

export default connect(mapStateToProp, { forgetPasswordAction })(
  ForgetPassword
);
