import React from "react";
import { Card, Table } from "react-bootstrap";

// const defaultHandler = () => {};

const DisplaySemesters = ({ tableHeads = [], tableData = [] }) => {
  return (
    <div className="col-lg-12 grid-margin stretch-card mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Manage Semesters</Card.Title>
          <Table hover responsive>
            <thead>
              <tr>
                {tableHeads.map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData?.map(
                ({ id, academicTerm, batch, departmentCourse, semester }) => {
                  return (
                    <tr key={id}>
                      <td key={batch.id}>{`${batch.year} - ${
                        batch.academicTerm?.termName || ""
                      }`}</td>
                      <td key={departmentCourse.department.id}>
                        {departmentCourse.department.departmentName}
                      </td>
                      <td key={departmentCourse.course}>
                        {departmentCourse.course.courseName}-
                        {departmentCourse.courseCategory}
                      </td>
                      <td key={`${id} ${academicTerm.id}`}>
                        {academicTerm.termName}
                      </td>
                      <td key={`${id} ${semester.id}`}>{semester.semester}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DisplaySemesters;
