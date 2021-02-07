import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DisplayModal from "components/Modal";
import { Card, Row, Col, Form } from "react-bootstrap";
import * as Yup from "yup";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import { BorderedButton, FilledButton } from "elements/Button";
import DisplayPreference from "components/DisplayComponent/DisplayPreference";
import {
  getCourseAction,
  getDepartmentAction,
  submitPreferenceAction,
  deletePreferenceAction,
  getPreferencesRecordByIdAction,
} from "pages/User/Preference/ducks/actions";
import {
  getApplicationStatusAction,
  updateApplicationStatusAction,
} from "pages/App/ducks/actions";

const schema = Yup.object({
  preference: Yup.string().required("Please provide preference"),
  departmentName: Yup.string().required("Select the Department"),
  courseName: Yup.string().required("Select the Course"),
});

const preferencesOrder = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

const Preference = ({
  appId,
  course,
  department,
  getCourseAction,
  preferencesRecord,
  applicationStatus,
  getDepartmentAction,
  submitPreferenceAction,
  deletePreferenceAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
  getPreferencesRecordByIdAction,
}) => {
  useEffect(() => {
    async function getCourseAndPreferences(appId) {
      await getCourseAction();
      await getDepartmentAction();
      await getApplicationStatusAction(appId);
      await getPreferencesRecordByIdAction(appId);
    }

    getCourseAndPreferences(appId);
  }, []);

  const [selectedDepartment, handleSelectDepartment] = useState("");
  const [isSubmitting, handleSubmission] = useState(false);
  const [validated, setValidated] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { isSubmitted } = applicationStatus;

  const handleDeleteClick = async (delPreference) => {
    handleSubmission(true);
    try {
      await deletePreferenceAction(delPreference);
      await getCourseAction(appId);
      if (delPreference == "1st")
        updateApplicationStatusAction({ isPreference: false });
      handleSubmission(false);
    } catch (error) {
      handleSubmission(false);
      console.log(error);
    }
  };

  const onSubmit = async (event) => {
    handleSubmission(true);
    event.preventDefault();
    let values = {
      preference: event.target[0].value,
      departmentName: event.target[1].value,
      courseName: event.target[2].value,
    };
    try {
      await schema.validate(values);
      await submitPreferenceAction(values);
      await getCourseAction(appId);
      if (values.preference == "1st")
        updateApplicationStatusAction({ isPreference: true });
      handleSelectDepartment("");
      handleSubmission(false);
      setModalShow(false);
    } catch (error) {
      event.persist();
      setValidated(true);
      handleSubmission(false);
    }
  };
  const ModalBody = () => {
    return (
      <Form noValidate onSubmit={onSubmit} validated={validated}>
        <Form.Row>
          <Form.Group as={Col} controlId="preference">
            <Form.Label>Preference</Form.Label>
            <Form.Control
              value={`${preferencesOrder[preferencesRecord?.data?.length]}`}
              disabled
              required
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            cannot set preferences
          </Form.Control.Feedback>
          <Form.Group as={Col} controlId="departmentName">
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleSelectDepartment(e.target.value)}
              value={selectedDepartment}
              required
            >
              <option value="" hidden>
                Choose
              </option>
              {department?.data?.map(function renderSelectDepartmentMenu({
                id,
                departmentName,
              }) {
                return (
                  <option value={departmentName} key={id}>
                    {departmentName}
                  </option>
                );
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              select the department
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="courseName">
            <Form.Label>course</Form.Label>
            <Form.Control as="select" required>
              <option value="" hidden>
                Choose
              </option>
              {course?.data?.map(function renderSelectCourseMenu({
                course: { id, courseName },
                department: { departmentName },
              }) {
                return departmentName == selectedDepartment ? (
                  <option key={id} value={courseName}>
                    {courseName}
                  </option>
                ) : null;
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              select the course
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row className="modal-footer pb-0">
          <FilledButton type="submit" className="mb-0" disabled={isSubmitting}>
            Save
          </FilledButton>
        </Form.Row>
      </Form>
    );
  };

  if (preferencesRecord?.success && !isSubmitting) {
    return (
      <>
        <Card className="mt-4 px-2 py-4">
          <Card.Title className="text-center">Preferences</Card.Title>
          <DisplayPreference
            preferenceList={preferencesRecord?.data}
            handleDeleteClick={handleDeleteClick}
            disabled={isSubmitting}
            hidden={isSubmitted}
          />
          <Row className="justify-content-md-center my-4">
            <Col md="auto">
              <FilledButton
                type="button"
                onClick={() => setModalShow(true)}
                disabled={isSubmitting}
                hidden={isSubmitted}
              >
                Click to add Preferences
              </FilledButton>
            </Col>
          </Row>
          <Row className="justify-content-md-center mt-4">
            <Col md="auto">
              <BorderedButton>Next</BorderedButton>
            </Col>
          </Row>
        </Card>
        <DisplayModal
          header="Select Preference"
          show={modalShow}
          backdrop="static"
          animation={false}
          onHide={() => {
            setValidated(false);
            setModalShow(false);
          }}
          style={{ zIndex: 1071 }}
          Body={ModalBody}
        />
      </>
    );
  } else {
    return <CenteredSpinner />;
  }
};

const mapStateToProp = (state) => ({
  appId: state.auth.appId,
  course: state.preference.course,
  department: state.preference.department,
  preferencesRecord: state.preference.record,
  applicationStatus: state.app.data[0],
});

export default connect(mapStateToProp, {
  getCourseAction,
  getDepartmentAction,
  submitPreferenceAction,
  deletePreferenceAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
  getPreferencesRecordByIdAction,
})(Preference);
