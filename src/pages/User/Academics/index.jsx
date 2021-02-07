import React, { useState, useEffect } from "react";
import _ from "lodash";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { Row, Col } from "react-bootstrap";
import Modal from "components/Modal";
import TextArea from "elements/Form/TextArea";
import TextField from "elements/Form/TextField";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import DisplayTable from "components/DisplayComponent/DisplayAcademics";
import { BorderedButton, FilledButton } from "elements/Button";
import {
  getAcademicsByIdAction,
  submitAcademicsAction,
} from "pages/User/Academics/ducks/actions";
import {
  getApplicationStatusAction,
  updateApplicationStatusAction,
} from "pages/App/ducks/actions";

const validation = Yup.object({
  examination: Yup.string().required("Examination can not be empty"),
  yearHeld: Yup.number()
    .required("Year Held can not be empty")
    .typeError("only numeric digits are allowed"),
  maxMarks: Yup.number()
    .required("Max Marks can not be empty")
    .typeError("only numeric digits are allowed"),
  obtainedMarks: Yup.number()
    .required("Obtained Marks can not be empty")
    .typeError("only numeric digits are allowed"),
  cgpa: Yup.number()
    .required("CGPA/ Percentage can not be empty")
    .typeError("only numeric digits are allowed"),
  awards: Yup.string(),
  institute: Yup.string().required("Name of Institute can not be empty"),
  majors: Yup.string().required("Majors can not be empty"),
});

const Academics = ({
  appId,
  academics,
  applicationStatus,
  submitAcademicsAction,
  getAcademicsByIdAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
}) => {
  useEffect(() => {
    async function getAcademicsById(appId) {
      await getAcademicsByIdAction(appId);
      await getApplicationStatusAction(appId);
    }

    getAcademicsById(appId);
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isSubmitting, handleSubmission] = useState(false);

  const { isSubmitted } = applicationStatus;

  const handleSubmit = async (values) => {
    handleSubmission(true);
    try {
      await submitAcademicsAction(values);
      if (!applicationStatus[`is${values.examination.replace(/\s/g, "")}`])
        await updateApplicationStatusAction({
          [`is${values.examination.replace(/\s/g, "")}`]: true,
        });
      handleSubmission(false);
      setModalShow(false);
    } catch (e) {
      console.log(e);
      handleSubmission(false);
    }
  };

  const editHandler = (values) => {
    const defaultValues = _.mapValues(
      values,
      function assigningDefaultValue(value) {
        return value ? value : "";
      }
    );
    setInitialValues(defaultValues);
    setModalShow(true);
  };

  const ModalBody = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        <Form>
          <Row>
            <Col>
              <TextField
                label="Examination"
                name="examination"
                placeholder="Examination"
                disabled
              />
            </Col>
            <Col>
              <TextField
                label="Year Held"
                name="yearHeld"
                placeholder="Year Held"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                label="Max Marks"
                name="maxMarks"
                placeholder="Max Marks"
              />
            </Col>
            <Col>
              <TextField
                label="Obtained Marks"
                name="obtainedMarks"
                placeholder="Obtained Marks"
              />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <TextField
                label="Percentage/ CGPA"
                name="cgpa"
                placeholder="Percentage/ CGPA"
              />
            </Col>
          </Row>
          <TextArea label="Awards" name="awards" placeholder="Awards" />
          <TextField label="Institue" name="institute" placeholder="Institue" />
          <TextField
            label="Major Area"
            name="majors"
            placeholder="Major Area"
          />
          <div className="modal-footer pb-0">
            <FilledButton
              type="submit"
              disabled={isSubmitting || isSubmitted ? true : false}
            >
              Submit
            </FilledButton>
            <BorderedButton type="reset" onClick={() => setModalShow(false)}>
              Cancel
            </BorderedButton>
          </div>
        </Form>
      </Formik>
    );
  };
  const EditButton = (props) => {
    return (
      <FilledButton
        variant="info"
        type="button"
        {...props}
        disabled={isSubmitting}
        hidden={isSubmitted}
      >
        Edit
      </FilledButton>
    );
  };

  if (academics?.success) {
    let [userAcademicRecords] = academics?.data;
    return (
      <>
        <DisplayTable
          tableHeads={[
            "Examination Year",
            "Year Held",
            "Max Marks",
            "Obtained Marks",
            "Percentage/ Cgpa",
            "Awards",
            "Institution",
            "Major Area",
            isSubmitted ? null : "Actions",
          ]}
          actionButtons={[EditButton]}
          academics={[...userAcademicRecords]}
          handleButtons={[editHandler]}
        />

        <Modal
          show={modalShow}
          backdrop="static"
          animation={false}
          onHide={() => setModalShow(false)}
          style={{ zIndex: 1071 }}
          className="md-5"
          header="Academics"
          Body={ModalBody}
        />
      </>
    );
  } else {
    return <CenteredSpinner />;
  }
};

const mapStateToProp = (state) => ({
  academics: state?.academics,
  isCourseCategory: state?.app?.data[0],
  appId: state?.auth?.appId,
  applicationStatus: state?.app?.data[0],
});

export default connect(mapStateToProp, {
  submitAcademicsAction,
  getAcademicsByIdAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
})(Academics);
