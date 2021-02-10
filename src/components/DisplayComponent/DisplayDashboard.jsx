import React from "react";
import { Card, Table, Image } from "react-bootstrap";
import unavailable from "assets/img/unavailable.png";
import { history } from "App";

const DisplayDashboard = ({
  message = "",
  tableHeads = [],
  applicants = [],
  actionButtons = [],
  buttonHandlers = [],
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
            </thead>
            <tbody>
              {applicants?.map(function displayApplicantData(data) {
                return (
                  <tr key={`${data.name} ${data.appId}`}>
                    <td
                      key={`${data.appId} ${data.image}`}
                      className="py-2"
                      onClick={() => history.push("/user/profile")}
                    >
                      <Image
                        key={data?.image || unavailable}
                        src={data?.image || unavailable}
                        width="35px"
                        height="35px"
                        roundedCircle
                      />
                    </td>
                    <td
                      key={data?.appId || "appId"}
                      onClick={() => history.push("/user/profile")}
                    >
                      {data?.appId || "-"}
                    </td>
                    <td
                      key={data?.name || "name"}
                      onClick={() => history.push("/user/profile")}
                    >
                      {data?.name || "-"}
                    </td>
                    <td
                      key={data?.courseCategory || "courseCategory"}
                      onClick={() => history.push("/user/profile")}
                    >
                      {data?.courseCategory || "-"}
                    </td>
                    <td
                      key={message || "message"}
                      onClick={() => history.push("/user/profile")}
                    >
                      {message}
                    </td>
                    {actionButtons.length > 0 &&
                      actionButtons.map((Button, idx) => (
                        <td key={`${data.appId} ${idx}`}>
                          <Button
                            onClick={() => buttonHandlers[idx](data.appId)}
                          />
                        </td>
                      ))}
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
