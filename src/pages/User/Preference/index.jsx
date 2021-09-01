import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DisplayModal from "components/Modal";
import { Row, Col, Form } from "react-bootstrap";
import * as Yup from "yup";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import { BorderedButton, FilledButton } from "elements/Button";
import DisplayPreference from "components/DisplayComponent/DisplayPreference";
import {
  getCourseAction,
  getDepartmentByBatchAction,
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
  batchId,
  isAdmin,
  department,
  getCourseAction,
  applicationStatus,
  preferencesRecord,
  getDepartmentByBatchAction,
  submitPreferenceAction,
  deletePreferenceAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
  getPreferencesRecordByIdAction,
}) => {
  useEffect(() => {
    async function getCourseAndPreferences(appId, isAdmin) {
      if (appId && !isAdmin && batchId) {
        await getCourseAction();
        await getDepartmentByBatchAction(batchId);
        await getApplicationStatusAction(appId);
        await getPreferencesRecordByIdAction(appId);
      }
    }
    getCourseAndPreferences(appId, isAdmin);
  }, []);

  const [selectedDepartment, handleSelectDepartment] = useState("");
  const [isSubmitting, handleSubmission] = useState(false);
  const [validated, setValidated] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleDeleteClick = async (delPreference) => {
    handleSubmission(true);
    try {
      await deletePreferenceAction(delPreference);
      await getCourseAction();
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
                departmentCourse,
              }) {
                return (
                  <option
                    value={departmentCourse.department.departmentName}
                    key={id}
                  >
                    {departmentCourse.department.departmentName}
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
                id,
                departmentCourse: {
                  department: { departmentName },
                  course: { courseName },
                },
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
    const [{ isSubmitted } = {}] = applicationStatus || [];
    return (
      <>
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
  appId: state?.auth?.appId,
  batchId: state?.auth?.batchId,
  isAdmin: state?.auth?.isAdmin,
  course: state?.user?.preference?.course,
  department: state?.user?.preference?.department,
  preferencesRecord: state?.user?.preference?.record,
  applicationStatus: state?.app?.data,
});

export default connect(mapStateToProp, {
  getCourseAction,
  getDepartmentByBatchAction,
  submitPreferenceAction,
  deletePreferenceAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
  getPreferencesRecordByIdAction,
})(Preference);
