import React from "react";
import { ButtonGroup, Card, Table } from "react-bootstrap";

const DisplayAcademics = ({
  tableHeads = [],
  experiences = [],
  actionButtons = [],
  handleButtons = [],
}) => {
  return (
    <Card className="mt-4 py-4 px-2">
      <Card.Title className="text-center">Experience</Card.Title>
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
            {experiences?.map(({ id, ...experience }) => (
              <tr key={id}>
                <td key={experience.jobTitle}>{experience.jobTitle}</td>
                <td key={id + id}>{experience.organization}</td>
                <td key={id + id + id}>{experience.start}</td>
                <td key={experience.to + id + id}>{experience.end}</td>
                <td key={id + experience.salary + id}>{experience.salary}</td>
                <td key={id + id + experience.duty}>{experience.duty}</td>
                {actionButtons && (
                  <td>
                    <ButtonGroup>
                      {actionButtons?.map((ActionButton, idx) => {
                        return (
                          <ActionButton
                            key={idx}
                            onClick={() => handleButtons[idx](id)}
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
  );
};

export default DisplayAcademics;
