import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Formik, Form } from "formik";
import { BorderedButton } from "elements/Button";
import UploadImageField from "elements/Form/UploadImageField";

const defaultHandler = () => {};

const DisplayDocuments = ({
  isSubmitted = true,
  isSubmitting = true,
  initialValues = {},
  documentsListRows = [],
  getRefValue = defaultHandler,
  handleUploadImage = defaultHandler,
}) => {
  return (
    <Card className="mt-4 mb-5 pt-4 px-1">
      <Card.Title className="text-center">Upload Documents</Card.Title>
      <Card.Body>
        <Formik initialValues={initialValues}>
          <Form>
            {documentsListRows.map((documentRow, idx) => {
              return (
                <Row
                  key={idx}
                  className="justify-content-md-center align-items-baseline my-2 py-2"
                >
                  {documentRow.map(({ docName, description }) => {
                    return (
                      <React.Fragment key={`${docName} ${description}`}>
                        <Col key={description} md="2">
                          <strong>{description}</strong>
                        </Col>
                        <Col key={docName} md="4">
                          <UploadImageField
                            name={docName}
                            getRefValue={(ref) => getRefValue(docName, ref)}
                            handleUploadImage={() => handleUploadImage(docName)}
                            disabled={isSubmitting}
                            hidden={isSubmitted}
                          />
                        </Col>
                      </React.Fragment>
                    );
                  })}
                </Row>
              );
            })}
          </Form>
        </Formik>
      </Card.Body>
      <Row className="mx-2 px-0 modal-footer">
        <Col md="auto">
          <BorderedButton type="button">Next</BorderedButton>
        </Col>
      </Row>
    </Card>
  );
};

export default DisplayDocuments;
