import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { Row, Col, Card } from "react-bootstrap";
import TextArea from "elements/Form/TextArea";
import { BorderedButton, FilledButton } from "elements/Button";

const defaultHandler = () => {};
const defaultInitialValues = {};
const defaultValidation = Yup.object({});

const Submission = ({
	hidden = true,
	disabled = true,
	onAccept = defaultHandler,
	onSubmit = defaultHandler,
	validate = defaultValidation,
	initialValues = defaultInitialValues,
}) => {
	return (
		<Card className="my-4 py-4 px-4">
			<Card.Title className="text-center">Application Submission</Card.Title>
			<Formik onSubmit={onSubmit} validationSchema={validate} initialValues={initialValues}>
				<Form>
					<Row className="my-2 py-2">
						<Col>
							<TextArea
								name="comments"
								label="Enter the Rejection Reason"
								placeholder="Rejection Reason"
								type="text"
								disabled={disabled}
							/>
						</Col>
					</Row>
					<Row>
						<Col md="auto">
							<FilledButton
								className="px-5"
								type="button"
								disabled={disabled}
								hidden={hidden}
								onClick={onAccept}
							>
								ACCEPT
							</FilledButton>
						</Col>
						<Col md="auto">
							<BorderedButton className="px-5" type="submit" disabled={disabled} hidden={hidden}>
								REJECT
							</BorderedButton>
						</Col>
					</Row>
				</Form>
			</Formik>
			<Row>
				<Col>
					<BorderedButton as={Link} to="/admin/dashboard" className="my-5">
						Go To Dashboard
					</BorderedButton>
				</Col>
			</Row>
		</Card>
	);
};

export default Submission;
