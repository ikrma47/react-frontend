import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Card, Alert } from "react-bootstrap";
import { APP_NAME } from "config";
import { signupUserAction } from "pages/Auth/ducks/actions";
import TextField from "../../elements/Form/TextField";
import { FilledButton, BorderedButton } from "../../elements/Button";

const initStates = {
	cnic: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const validation = Yup.object({
	cnic: Yup.number()
		.required("CNIC should not be empty")
		.test("len", "Must be exactly 13 characters", (val) =>
			val ? val.toString().length === 13 : false
		)
		.typeError("CNIC must contains only numeric digits"),
	email: Yup.string().email().required("Emails should not be empty."),
	password: Yup.string().required("Password should not be empty."),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password should not be empty."),
});

const Signup = ({ signupUserAction, history, signupResponse }) => {
	const [message, handleMessage] = useState("");
	const [isSubmitting, handleSubmission] = useState(false);

	const handleSubmit = async (values, { setErrors }) => {
		handleSubmission(true);
		const { cnic, email, password } = values;
		try {
			await signupUserAction({ email, password, cnic });
			handleSubmission(false);
		} catch (error) {
			handleSubmission(false);
			if (error?.response?.data?.message) handleMessage(error?.response?.data?.message);
			else if (error.message) handleMessage(error.message);
			const { cnic, email, password } = error;
			setErrors({ cnic, email, password });
		}
	};

	return (
		<Card className="px-2 py-4">
			<Card.Title className="text-center">
				{APP_NAME}
				<br />
				Sign up
			</Card.Title>
			<Card.Body>
				{(signupResponse?.message || message) && (
					<Alert variant={`${signupResponse?.success ? "success" : "danger"}`}>
						{signupResponse?.message || message}
					</Alert>
				)}
				<Formik initialValues={initStates} validationSchema={validation} onSubmit={handleSubmit}>
					<Form>
						<TextField label="CNIC" type="text" name="cnic" placeholder="CNIC" />
						<TextField label="Email" name="email" type="text" placeholder="Email" />
						<TextField label="Password" name="password" type="password" placeholder="Password" />
						<TextField
							label="Confirm Password"
							name="confirmPassword"
							type="password"
							placeholder="Confirm Password"
						/>
						<FilledButton type="submit" disabled={isSubmitting ? true : false} className="mr-2">
							Submit
						</FilledButton>
						<BorderedButton type="reset" className="float-right">
							Reset
						</BorderedButton>
					</Form>
				</Formik>
				<div className="text-center pt-4">
					<Link to="/login">Already Signedup? click to Login</Link>
				</div>
			</Card.Body>
		</Card>
	);
};

const mapStateToProp = (state) => {
	return { signupResponse: state.auth.signup };
};

export default connect(mapStateToProp, { signupUserAction })(Signup);
