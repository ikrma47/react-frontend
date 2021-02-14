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
              {academics?.map(({ id, examination, academics }) => (
                <tr key={id}>
                  <td key={examination}>{examination || ""}</td>
                  <td key={id + id}>{academics[0].yearHeld || ""}</td>
                  <td key={id + id + id}>{academics[0].maxMarks || ""}</td>
                  <td key={examination + id + id}>
                    {academics[0].obtainedMarks || ""}
                  </td>
                  <td key={id + examination + id}>{academics[0].cgpa || ""}</td>
                  <td key={id + id + examination}>
                    {academics[0].awards || ""}
                  </td>
                  <td key={id + examination}>{academics[0].institute || ""}</td>
                  <td key={examination + id}>{academics[0].majors || ""}</td>
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
                                  ...academics[0],
                                })
                              }
                            />
                          );
                        })}
                      </ButtonGroup>
                    </td>
                  )}
                </tr>
              ))}
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
