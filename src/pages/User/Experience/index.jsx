import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { Button, Row, Col } from "react-bootstrap";
import Modal from "components/Modal";
import TextArea from "elements/Form/TextArea";
import TextField from "elements/Form/TextField";
import { FilledButton, BorderedButton } from "elements/Button";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import DisplayExperience from "components/DisplayComponent/DisplayExperience";
import {
  getExperienceByIdAction,
  submitExperienceAction,
  deleteExperienceAction,
} from "pages/User/Experience/ducks/actions";
import {
  getApplicationStatusAction,
  updateApplicationStatusAction,
} from "pages/App/ducks/actions";

const defaultInitialValues = {
  jobTitle: "",
  organization: "",
  from: "",
  to: "",
  salary: "",
  duty: "",
};

const validate = Yup.object({
  jobTitle: Yup.string().required("Enter the Job Title"),
  organization: Yup.string().required("Enter the Organization or Department"),
  from: Yup.date().required("Select Date"),
  to: Yup.date().required("Select Date"),
  salary: Yup.string().required("Enter Salary or Grade"),
  duty: Yup.string().required("Enter the nature of Duty"),
});

const Experience = ({
  appId,
  experience,
  applicationStatus,
  submitExperienceAction,
  deleteExperienceAction,
  getExperienceByIdAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
}) => {
  useEffect(() => {
    async function getExperienceById(appId) {
      await getExperienceByIdAction(appId);
      await getApplicationStatusAction(appId);
    }

    getExperienceById(appId);
  }, [appId]);

  const [modalShow, setModalShow] = useState(false);
  const [isSubmitting, handleSubmission] = useState(false);
  const { isSubmitted = false } = applicationStatus[0] || {};

  const submitHandler = async ({
    from: reversedStartingDate,
    to: reversedEndingDate,
    ...values
  }) => {
    handleSubmission(true);
    try {
      let from = reversedStartingDate.split("-").reverse().join("-");
      let to = reversedEndingDate.split("-").reverse().join("-");
      await submitExperienceAction({ ...values, from, to });
      if (experience?.data?.length == 1)
        await updateApplicationStatusAction({ isExperience: true });
      handleSubmission(false);
      setModalShow(false);
    } catch (error) {
      console.log(error);
      handleSubmission(false);
      setModalShow(false);
    }
  };

  const deleteHandler = async (experienceId) => {
    handleSubmission(true);
    try {
      await deleteExperienceAction(experienceId);
      if (experience?.data?.length == 0)
        await updateApplicationStatusAction({ isExperience: false });
      handleSubmission(false);
    } catch (error) {
      console.log(error);
      handleSubmission(false);
    }
  };

  const ModalBody = () => {
    return (
      <Formik
        onSubmit={submitHandler}
        initialValues={defaultInitialValues}
        validationSchema={validate}
      >
        <Form>
          <Row>
            <Col md="auto">
              <TextField
                label="Job Title"
                name="jobTitle"
                placeholder="Job Title"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                label="Organization/ Depratment"
                name="organization"
                type="text"
                placeholder="Organization/ Depratment"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-4" md="auto">
              <strong>Starting Date</strong>
            </Col>
            <Col md="auto" xs="auto">
              <TextField
                label="Starting Date"
                name="from"
                placeholder="From"
                type="date"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-4" md="auto">
              <strong>Ending Date</strong>
            </Col>
            <Col md="auto" xs="auto">
              <TextField
                label="Ending Date"
                name="to"
                placeholder="To"
                type="date"
              />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <TextField
                label="Salary/ Grade"
                name="salary"
                placeholder="Salary/ Grade"
              />
            </Col>
          </Row>
          <TextArea
            label="Nature of Duty"
            name="duty"
            placeholder="Nature of Duty"
          />
          <div className="modal-footer pb-0">
            <FilledButton
              type="submit"
              disabled={isSubmitting}
              hidden={isSubmitted}
            >
              Submit
            </FilledButton>
            <BorderedButton type="button" onClick={() => setModalShow(false)}>
              Cancel
            </BorderedButton>
          </div>
        </Form>
      </Formik>
    );
  };

  const DeleteButton = (props) => {
    return (
      <Button
        variant="danger"
        {...props}
        disabled={isSubmitting}
        hidden={isSubmitted}
      >
        Delete
      </Button>
    );
  };
  if (experience?.success) {
    return (
      <>
        <DisplayExperience
          tableHeads={[
            "Job Title",
            "Organization/ Depratment",
            "From (DD-MM-YYYY)",
            "To (DD-MM-YYYY)",
            "Salary/ Grade",
            "Nature of Duty",
            isSubmitted ? null : "Actions",
          ]}
          actionButtons={[DeleteButton]}
          experiences={experience.data}
          handleButtons={[deleteHandler]}
        />
        <Row className="mx-2 px-0 modal-footer">
          <Col>
            <FilledButton
              type="button"
              onClick={() => setModalShow(true)}
              className="my-2"
              disabled={isSubmitting}
              hidden={isSubmitted}
            >
              Click to Add Job Experience
            </FilledButton>
          </Col>
          <Col md="auto">
            <BorderedButton type="button">Next</BorderedButton>
          </Col>
        </Row>
        <Modal
          show={modalShow}
          backdrop="static"
          animation={false}
          onHide={() => setModalShow(false)}
          header="Academics"
          Body={ModalBody}
          className="md-5"
          style={{ zIndex: 1071 }}
        />
      </>
    );
  } else {
    return <CenteredSpinner />;
  }
};

const mapStateToProps = (state) => ({
  experience: state?.user?.experience,
  appId: state?.auth?.appId,
  applicationStatus: state?.app?.data,
});

export default connect(mapStateToProps, {
  submitExperienceAction,
  deleteExperienceAction,
  getExperienceByIdAction,
  getApplicationStatusAction,
})(Experience);
