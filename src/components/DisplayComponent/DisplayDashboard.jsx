import React from "react";
import { Card, Table, Image } from "react-bootstrap";
import unavailable from "assets/img/unavailable.png";

const defaultHandler = () => {};

const DisplayDashboard = ({
  message = "",
  tableHeads = [],
  applicants = [],
  handleClick = defaultHandler,
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
                  <tr key={`${data?.name} ${data?.user?.appId}`}>
                    <td
                      key={`${data?.user?.appId} ${data?.image}`}
                      className="py-2"
                      onClick={() => handleClick(data?.user?.appId)}
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
                      key={data?.user?.appId || "appId"}
                      onClick={() => handleClick(data?.user?.appId)}
                    >
                      {data?.user?.appId || "-"}
                    </td>
                    <td
                      key={data?.name || "name"}
                      onClick={() => handleClick(data?.user?.appId)}
                    >
                      {data?.name || "-"}
                    </td>
                    <td
                      key={`${data?.user?.appId} ${
                        data?.courseCategory || "courseCategory"
                      }`}
                      onClick={() => handleClick(data?.user?.appId)}
                    >
                      {data?.courseCategory || "-"}
                    </td>
                    <td
                      key={`${data?.name} ${message || "message"}`}
                      onClick={() => handleClick(data?.user?.appId)}
                    >
                      {message}
                    </td>
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
