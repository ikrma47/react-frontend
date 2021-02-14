import React from "react";
import { Row, Col, ButtonGroup, Card, Form } from "react-bootstrap";
import { FilledButton } from "elements/Button";

const defaultHandler = () => {};

const DisplayPreference = ({
	hidden = true,
	disabled = true,
	handleDeleteClick = defaultHandler,
	preferenceList = [],
}) => {
	return (
		<Card className="mt-4 px-2 py-4">
			<Card.Title className="text-center">Preferences</Card.Title>
			{preferenceList.length > 0 && (
				<Row className="justify-content-md-center">
					<Col md="2">Preferences</Col>
					<Col md="3">Department</Col>
					<Col md="3">Courses</Col>
				</Row>
			)}
			{preferenceList?.map(({ preference, department, course }, idx) => {
				return (
					<Row key={idx}>
						<Col md={{ offset: 2, span: 2 }}>
							<Form.Group key={idx} controlId={`${preference?.preference}`} className="mt-4">
								<Form.Control value={`${preference?.preference}`} disabled />
							</Form.Group>
						</Col>
						<Col md="3">
							<Form.Group
								key={idx}
								controlId={`${department?.departmentName + idx}`}
								className="mt-4"
							>
								<Form.Control
									name="departmentName"
									value={`${department?.departmentName}`}
									placeholder="Department"
									disabled
								/>
							</Form.Group>
						</Col>
						<Col md="3">
							<Form.Group key={idx} controlId={`${course?.courseName}`} className="mt-4">
								<Form.Control
									name="courseName"
									value={`${course?.courseName}`}
									placeholder="Course"
									disabled
								/>
							</Form.Group>
						</Col>
						{preferenceList?.length === idx + 1 ? (
							<Col md="0">
								<ButtonGroup className="mt-4">
									<FilledButton
										disabled={disabled == undefined ? true : disabled}
										hidden={hidden == undefined ? true : hidden}
										type="button"
										onClick={() => handleDeleteClick(preference?.preference)}
									>
										Delete
									</FilledButton>
								</ButtonGroup>
							</Col>
						) : null}
					</Row>
				);
			})}
		</Card>
	);
};

export default DisplayPreference;
