import React from "react";
import { Card, Table, Image } from "react-bootstrap";
import unavailable from "assets/img/unavailable.png";
import { history } from "App";

const DisplayDashboard = ({ tableHeads = [], applicants = [] }) => {
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
                  <tr
                    key={`${data.name} ${data.appId}`}
                    onClick={() => history.push("/user/profile")}
                  >
                    <td key={`${data.appId} ${data.image}`} className="py-2">
                      <Image
                        key={data?.image || unavailable}
                        src={data?.image || unavailable}
                        width="35px"
                        height="35px"
                        roundedCircle
                      />
                    </td>
                    <td key={data?.appId || "appId"}>{data?.appId || "-"}</td>
                    <td key={data?.name || "name"}>{data?.name || "-"}</td>
                    <td key={data?.courseCategory || "courseCategory"}>
                      {data?.courseCategory || "-"}
                    </td>
                    {data?.message && (
                      <td key={data.message || "message"}>{data.message}</td>
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
