import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Form,
  Card,
  Row,
  Col,
  ListGroup,
  Button,
} from "react-bootstrap";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import { RedIcon, GreenIcon } from "pages/User/Submit/style";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  getApplicationStatusAction,
  updateApplicationStatusAction,
} from "pages/App/ducks/actions";
import { getProfileByIdAction } from "pages/User/Profile/ducks/actions";

const Submit = ({
  appId,
  courseCategory,
  applicationStatus,
  getProfileByIdAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
}) => {
  useEffect(() => {
    async function getApplicationStatusById(appId) {
      if (appId) {
        await getProfileByIdAction(appId);
        await getApplicationStatusAction(appId);
      }
    }

    getApplicationStatusById(appId);
  }, []);

  const [isSubmitting, handleSubmission] = useState(false);
  const [validated, handleValidated] = useState(false);
  const [errorMessage, handleErrorMessage] = useState();

  let {
    isProfile,
    isFirstYear,
    isSecondYear,
    isThirdYear,
    isFinalYear,
    isGAT,
    isMS,
    isExperience,
    isPreference,
    isCnicFront,
    isCnicBack,
    isMatricCertificate,
    isIntermediateCertificate,
    isFirstSemesterDmc,
    isSecondSemesterDmc,
    isThirdSemesterDmc,
    isFourthSemesterDmc,
    isFifthSemesterDmc,
    isSeventhSemesterDmc,
    isEighthSemesterDmc,
    isBsCertificate,
    isSubmitted,
  } = applicationStatus || {};

  var isAcademics = false;
  var isDocumentsUpload = false;

  if (isFirstYear && isSecondYear && isThirdYear && isFinalYear && isGAT) {
    if (courseCategory == "Phd") {
      if (isMS) isAcademics = true;
    } else {
      isAcademics = true;
      isExperience = true;
    }
  }
  if (
    isCnicFront &&
    isCnicBack &&
    isMatricCertificate &&
    isIntermediateCertificate &&
    isFirstSemesterDmc &&
    isSecondSemesterDmc &&
    isThirdSemesterDmc &&
    isFourthSemesterDmc &&
    isFifthSemesterDmc &&
    isSeventhSemesterDmc &&
    isEighthSemesterDmc &&
    isBsCertificate
  ) {
    isDocumentsUpload = true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity())
      if (
        isProfile &&
        isAcademics &&
        isExperience &&
        isPreference &&
        isDocumentsUpload
      ) {
        handleSubmission(true);
        try {
          await updateApplicationStatusAction({ isSubmitted: true });
          handleSubmission(false);
        } catch (error) {
          console.log(error);
          handleSubmission(false);
        }
      } else handleErrorMessage("Please Complete Your Application");
    handleValidated(true);
  };

  if (applicationStatus) {
    return (
      <Card className="mt-4 py-4 px-2 md-4">
        <Card.Title className="text-center">Application Submission</Card.Title>
        <Card.Body>
          <ListGroup className="text-center">
            <Row className="justify-content-md-center">
              <Col md="auto">
                <ListGroup.Item>
                  {isProfile ? (
                    <GreenIcon icon={faCheck} size="2x" />
                  ) : (
                    <RedIcon icon={faTimes} size="2x" />
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {isAcademics ? (
                    <GreenIcon icon={faCheck} size="2x" />
                  ) : (
                    <RedIcon icon={faTimes} size="2x" />
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {isExperience ? (
                    <GreenIcon icon={faCheck} size="2x" />
                  ) : (
                    <RedIcon icon={faTimes} size="2x" />
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {isPreference ? (
                    <GreenIcon icon={faCheck} size="2x" />
                  ) : (
                    <RedIcon icon={faTimes} size="2x" />
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {isDocumentsUpload ? (
                    <GreenIcon icon={faCheck} size="2x" />
                  ) : (
                    <RedIcon icon={faTimes} size="2x" />
                  )}
                </ListGroup.Item>
              </Col>
              <Col md="auto" style={{ fontSize: 23 }}>
                <ListGroup.Item>Profile Details</ListGroup.Item>
                <ListGroup.Item>Academics Record</ListGroup.Item>
                <ListGroup.Item>Job Experience</ListGroup.Item>
                <ListGroup.Item>Prefences Selection</ListGroup.Item>
                <ListGroup.Item>Documents Upload</ListGroup.Item>
              </Col>
            </Row>
          </ListGroup>
          <Form
            noValidate
            validated={validated}
            className="text-center mt-4"
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.Check
                name="toBeChecked"
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                checked={isSubmitted ? true : null}
                disabled={isSubmitting || isSubmitted}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="success"
              className="mt-2"
              disabled={isSubmitting}
              hidden={isSubmitted}
            >
              Submit
            </Button>
            {errorMessage && (
              <Alert className="mt-2" variant="danger">
                {errorMessage}
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
    );
  } else {
    return <CenteredSpinner />;
  }
};

const mapStateToProp = (state) => ({
  appId: state?.auth?.appId,
  applicationStatus: state?.app?.data[0],
  courseCategory: state?.user?.profile?.data[0]?.courseCategory,
});

export default connect(mapStateToProp, {
  getProfileByIdAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
})(Submit);
