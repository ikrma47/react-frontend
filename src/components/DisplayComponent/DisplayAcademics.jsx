import React from "react";
import { Link } from "react-router-dom";
import { userDashboardRoutes } from "routes";
import { FilledButton } from "elements/Button";
import { ButtonGroup, Card, Table, Row, Col } from "react-bootstrap";

const DisplayAcademics = ({
  academics = [],
  tableHeads = [],
  actionButtons = [],
  handleButtons = [],
}) => {
  return (
    <>
      <Card className="mt-4 py-4 px-2">
        <Card.Title className="text-center">Academics</Card.Title>
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                {tableHeads?.map((tableHead) => {
                  return <th key={tableHead}>{tableHead}</th>;
                })}
              </tr>
            </thead>
            <tbody className="mt-2">
              {academics?.map(
                ({ id, examYear: { examination }, academics }) => (
                  <tr key={id}>
                    <td key={examination}>{examination || ""}</td>
                    <td key={id + id}>{academics.yearHeld || ""}</td>
                    <td key={id + id + id}>{academics.maxMarks || ""}</td>
                    <td key={examination + id + id}>
                      {academics.obtainedMarks || ""}
                    </td>
                    <td key={id + examination + id}>{academics.cgpa || ""}</td>
                    <td key={id + id + examination}>
                      {academics.awards || ""}
                    </td>
                    <td key={id + examination}>{academics.institute || ""}</td>
                    <td key={examination + id}>{academics.majors || ""}</td>
                    {actionButtons && (
                      <td>
                        <ButtonGroup>
                          {actionButtons?.map((ActionButton, idx) => {
                            return (
                              <ActionButton
                                key={idx}
                                onClick={() =>
                                  handleButtons[idx]({
                                    examination,
                                    ...academics,
                                    id,
                                  })
                                }
                              />
                            );
                          })}
                        </ButtonGroup>
                      </td>
                    )}
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Row className="mx-2 px-0 modal-footer">
        <Col md="auto">
          <Link to={userDashboardRoutes.EXPERIENCE.path}>
            <FilledButton type="button">Next</FilledButton>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default DisplayAcademics;
