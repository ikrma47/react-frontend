import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Card, Col, Row } from "react-bootstrap";
import DropDown from "elements/Form/DropDown";
import TextField from "elements/Form/TextField";
import { FilledButton } from "elements/Button";
import querystring from "query-string";
import { adminDashboardRoutes } from "routes";

const validate = Yup.object({
	appId: Yup.string(),
	appIdGreaterThan: Yup.string(),
	appIdSmallerThan: Yup.string(),
	name: Yup.string(),
	nameOfApplicant: Yup.string(),
	domiciles: Yup.string(),
	domicile: Yup.string(),
	courses: Yup.string(),
	courseName: Yup.string(),
	departments: Yup.string(),
	departmentName: Yup.string(),
	courseCategory: Yup.string(),
	greaterThanCgpa: Yup.string(),
	cgpa: Yup.string(),
	smallerThanCgpa: Yup.string(),
});

const initialValues = {
	appId: "all",
	appIdGreaterThan: "",
	appIdSmallerThan: "",
	name: "all",
	cnicNumber: "",
	cnic: "all",
	nameOfApplicant: "",
	domicile: "all",
	domiciles: "",
	courses: "all",
	courseName: "",
	departmentName: "all",
	departments: "",
	courseCategory: "all",
	greaterThanCgpa: "",
	cgpa: "all",
	smallerThanCgpa: "",
};

const AdvanceSearch = ({ history }) => {
	const [cgpaValue, setCgpaValue] = useState("all");
	const [nameValue, setNameValue] = useState("all");
	const [appIdValue, setAppIdValue] = useState("all");
	const [courseValue, setCourseValue] = useState("all");
	const [domicileValue, setDomicileValue] = useState("all");
	const [departmentValue, setDepartmentValue] = useState("all");
	const [cnic, setCnic] = useState("all");

	function onSubmit(values) {
		const SMALLEST_NUMBER = 0;
		const LARGEST_NUMBER = 9999999;
		const ANY_STRING = "%";

		if (values.appId == "all") {
			values.appIdGreaterThan = SMALLEST_NUMBER;
			values.appIdSmallerThan = LARGEST_NUMBER;
		} else {
			values.appIdGreaterThan = values.appIdGreaterThan || SMALLEST_NUMBER;
			values.appIdSmallerThan = values.appIdSmallerThan || LARGEST_NUMBER;
		}

		if (values.name == "all") values.name = ANY_STRING;
		else values.name = values.nameOfApplicant;

		if (values.domicile == "all") values.domicile = ANY_STRING;
		else values.domicile = values.domiciles;

		if (values.course == "all") values.courseName = ANY_STRING;

		if (values.departmentName == "all") values.departmentName = ANY_STRING;
		else values.departmentName = values.departments;

		if (values.courseCategory == "all") values.courseCategory = ANY_STRING;

		if (values.cnic == "all") values.cnic = ANY_STRING;
		else values.cnic = values.cnicNumber;

		const {
			appIdGreaterThan,
			appIdSmallerThan,
			name,
			domicile,
			cnic,
			courseName,
			departmentName,
			courseCategory,
		} = values;
		const queryString = querystring.stringify({
			appIdGreaterThan,
			appIdSmallerThan,
			appId: 0,
			name,
			domicile,
			cnic,
			courseName,
			departmentName,
			courseCategory,
		});
		history.push(`${adminDashboardRoutes.ADMINDASHBOARD.path}?${queryString}`);
	}
	return (
		<Card className="py-4 px-4 my-4 mx-4">
			<Card.Title>Advance Search</Card.Title>
			<Card.Body>
				<Formik validationSchema={validate} initialValues={initialValues} onSubmit={onSubmit}>
					<Form>
						<Row>
							<Col sm="auto" md="2">
								<DropDown
									label="Application Id's"
									name="appId"
									getValue={(value) => setAppIdValue(value)}
								>
									<option value="all">All</option>
									<option value="appIdGreaterThan">Greater than</option>
									<option value="appIdSmallerThan">Smaller than</option>
								</DropDown>
							</Col>
							{appIdValue != "all" && (
								<Col sm="auto">
									<TextField
										label="Application Id"
										placeholder="Enter Application Id"
										type="text"
										name={appIdValue}
									/>
								</Col>
							)}
							<Col sm="auto" md={{ offset: 1, span: 2 }} >
								<DropDown
									label="Name of Applicant"
									name="name"
									getValue={(value) => setNameValue(value)}
								>
									<option value="all">All</option>
									<option value="nameOfApplicant">equals</option>
								</DropDown>
							</Col>
							{nameValue != "all" && (
								<Col sm="auto" md={{ offset: 1, span: 3 }}>
									<TextField label="Name" placeholder="Enter Name" type="text" name={nameValue} />
								</Col>
							)}
						</Row>
						<Row>
							<Col sm="auto" md="2">
								<DropDown
									label="Domicile"
									name="domicile"
									getValue={(value) => setDomicileValue(value)}
								>
									<option value="all">All</option>
									<option value="domiciles">equals</option>
								</DropDown>
							</Col>
							{domicileValue != "all" && (
								<Col sm="auto">
									<TextField
										type="text"
										name={domicileValue}
										label="Domicile"
										placeholder="Enter Domicile"
									/>
								</Col>
							)}
							<Col sm="auto" md={{ offset: 1, span: 2 }}>
								<DropDown
									label="CNIC"
									name="cnic"
									getValue={(value) => setCnic(value)}
								>
									<option value="all">All</option>
									<option value="cnicNumber">equals</option>
								</DropDown>
							</Col>
							{cnic != "all" && (
								<Col sm="auto" md={{ offset: 1, span: 3 }}>
									<TextField
										type="text"
										label="CNIC"
										name={cnic}
										placeholder="Enter CNIC"
									/>
								</Col>
							)}
						</Row>
						<Row>
							<Col sm="auto" md="2">
								<DropDown
									label="Departments"
									name="departmentName"
									getValue={(value) => setDepartmentValue(value)}
								>
									<option value="all">All</option>
									<option value="departments">equals</option>
								</DropDown>
							</Col>
							{departmentValue != "all" && (
								<Col sm="auto">
									<TextField
										type="text"
										placeholder="Enter Department Name"
										label="Department"
										name={departmentValue}
									/>
								</Col>
							)}
							<Col sm="auto" md={{ offset: 1, span: 3 }}>
								<DropDown
									label="CGPA/Percentage"
									name="cgpa"
									getValue={(value) => setCgpaValue(value)}
								>
									<option value="all">All</option>
									<option value="greaterThanCgpa">Greater Than CGPA/Percentage</option>
									<option value="smallerThanCgpa">Smaller Than CGPA/Percentage</option>
								</DropDown>
							</Col>
							{cgpaValue != "all" && (
								<Col sm="auto">
									<TextField
										type="text"
										label="CGPA/ Percentage"
										name={cgpaValue}
										placeholder="Enter CGPA/Percentage"
									/>
								</Col>
							)}
						</Row>
						<Row>
							<Col sm="auto" md="2">
								<DropDown label="Course Category" name="courseCategory">
									<option value="all">All</option>
									<option value="MS">MS</option>
									<option value="Phd">Phd</option>
								</DropDown>
							</Col>
							<Col sm="auto" md={{ offset: 1, span: 2 }}>
								<DropDown
									label="Courses"
									name="courses"
									getValue={(value) => setCourseValue(value)}
								>
									<option value="all">All</option>
									<option value="courseName">equals</option>
								</DropDown>
							</Col>
							{courseValue != "all" && (
								<Col sm="auto" md={{ offset: 1, span: 3 }}>
									<TextField
										type="text"
										label="Course Name"
										name={courseValue}
										placeholder="Enter Course Name"
									/>
								</Col>
							)}
						</Row>
						<Row>
							<Col>
								<FilledButton type="submit">Submit</FilledButton>
							</Col>
						</Row>
					</Form>
				</Formik>
			</Card.Body>
		</Card>
	);
};

export default AdvanceSearch;
