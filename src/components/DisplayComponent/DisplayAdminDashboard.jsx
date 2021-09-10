import React from "react";
import { Card, Table, Image } from "react-bootstrap";
import unavailable from "assets/img/unavailable.png";

const defaultHandler = () => {};

const DisplayDashboard = ({
  message = "",
  tableHeads = [],
  applicants = [],
  actionButtons = [],
  buttonHandlers = [],
  handleClick = defaultHandler,
  search = defaultHandler,
}) => {
  return (
    <div className="col-lg-12 grid-margin stretch-card mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Welcome to Dashboard</Card.Title>
          <Card.Text>user description</Card.Text>
          <Table hover responsive>
            <thead>
              <tr>
                {tableHeads?.map(function displayTableHeading(heading, idx) {
                  return <th key={idx}>{heading}</th>;
                })}
              </tr>
              {search()}
            </thead>
            <tbody>
              {applicants?.map(function displayApplicantData(applicant) {
                return (
                  <tr key={`${applicant?.name} ${applicant?.appId}`}>
                    <td
                      key={`${applicant?.appId} ${applicant?.image}`}
                      className="py-2"
                      onClick={() => handleClick(applicant?.appId)}
                    >
                      <Image
                        key={applicant?.image || unavailable}
                        src={applicant?.image || unavailable}
                        width="35px"
                        height="35px"
                        roundedCircle
                      />
                    </td>
                    <td
                      key={applicant?.appId || "appId"}
                      onClick={() => handleClick(applicant?.appId)}
                    >
                      {applicant?.appId || "-"}
                    </td>
                    <td
                      key={applicant?.name || "name"}
                      onClick={() => handleClick(applicant?.appId)}
                    >
                      {applicant?.name || "-"}
                    </td>
                    <td
                      key={`${applicant?.appId} ${
                        applicant?.courseCategory || "courseCategory"
                      }`}
                      onClick={() => handleClick(applicant?.appId)}
                    >
                      {applicant?.courseCategory || "-"}
                    </td>
                    <td
                      key={`${applicant?.name} ${message || "message"}`}
                      onClick={() => handleClick(applicant?.appId)}
                    >
                      {message}
                    </td>
                    {actionButtons.length > 0 &&
                      actionButtons.map((Button, idx) => (
                        <td key={`${applicant.appId} ${idx}`}>
                          <Button
                            onClick={() => buttonHandlers[idx](applicant.appId)}
                          />
                        </td>
                      ))}
                    {applicant?.User?.applicationStatus?.isAccepted && (
                      <td
                        key={`${applicant?.name} ${applicant?.User?.applicationStatus?.acceptedBy}`}
                      >
                        {applicant?.User?.applicationStatus?.acceptedBy}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DisplayDashboard;
