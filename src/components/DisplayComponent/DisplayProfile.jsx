import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Card, Alert, Row, Col } from "react-bootstrap";
import TextField from "elements/Form/TextField";
import { FilledButton, BorderedButton } from "elements/Button";
import DropDown from "elements/Form/DropDown";
import TextArea from "elements/Form/TextArea";
import UploadFileField from "elements/Form/UploadImageField";

const defaultHandler = () => {};
const defaultInitialValue = {};
const defaultValidation = Yup.object({});

const DisplayProfile = ({
  errorMsg = "",
  successMsg = "",
  isSubmitted = true,
  isSubmitting = true,
  getRefValue = defaultHandler,
  handleSubmit = defaultHandler,
  validation = defaultValidation,
  handleUploadImage = defaultHandler,
  initialValues = defaultInitialValue,
}) => {
  return (
    <Card className="px-2 pt-4 mt-4 mb-5">
      <Card.Title className="text-center">Profile</Card.Title>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <Form>
            <Row>
              <Col md={4}>
                <TextField
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                />
                <TextField
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="Father Name"
                  name="fatherName"
                  type="text"
                  placeholder="Father Name"
                />
                <TextField
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="Domicile"
                  name="domicile"
                  type="text"
                  placeholder="Domicile"
                />
              </Col>
              <Col md={{ offset: 4 }}>
                <UploadFileField
                  name="image"
                  getRefValue={getRefValue || defaultHandler}
                  handleUploadImage={handleUploadImage || defaultHandler}
                  hidden={isSubmitted}
                  disabled={isSubmitting}
                />
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <TextField
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  readOnly
                />
              </Col>
              <Col md={3}>
                <TextField
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="CNIC"
                  name="cnic"
                  type="number"
                  placeholder="CNIC"
                  readOnly
                />
              </Col>
              <Col md={3}>
                <TextField
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="Religion"
                  name="religion"
                  type="text"
                  placeholder="Religion"
                />
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <TextField
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="Personal Number"
                  name="personalNumber"
                  type="text"
                  placeholder="Personal Number"
                />
              </Col>
              <Col md={3}>
                <TextField
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="Optional Phone Number"
                  name="optionalNumber"
                  type="text"
                  placeholder="Optional Phone Number"
                />
              </Col>
              <Col md="auto" xs="auto">
                <TextField
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="Date of Birth"
                  name="dob"
                  placeholder="Date of birth"
                  type="date"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextArea
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="Residential Address"
                  name="residentialAddress"
                  type="text"
                  placeholder="Residential Address"
                />
              </Col>
              <Col>
                <TextArea
                  disabled={isSubmitting || isSubmitted ? true : false}
                  label="Mailing Address"
                  name="mailingAddress"
                  type="text"
                  placeholder="Mailing Address"
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <DropDown
                label="Course Category"
                name="courseCategory"
                disabled={isSubmitting || isSubmitted ? true : false}
              >
                <option value="Choose category" hidden>
                  Choose category
                </option>
                <option value="MS">MS</option>
                <option value="Phd">Phd</option>
              </DropDown>
            </Row>
            <Row className="mx-2 px-0 pb-0 modal-footer">
              <FilledButton
                type="submit"
                disabled={isSubmitting}
                hidden={isSubmitted}
                className="mr-2"
              >
                save
              </FilledButton>
              <BorderedButton type="button">next</BorderedButton>
            </Row>
          </Form>
        </Formik>
        {errorMsg && (
          <Alert className="text-center" variant="danger">
            {errorMsg}
          </Alert>
        )}
        {successMsg && (
          <Alert className="text-center" variant="success">
            {successMsg}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default DisplayProfile;
