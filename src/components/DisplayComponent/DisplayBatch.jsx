import React from "react";
import { Card, Table } from "react-bootstrap";

// const defaultHandler = () => {};

const DisplayBatches = ({
  tableHeads = [],
  tableData = [],
  actionButtons = [],
  buttonHandlers = [],
}) => {
  return (
    <div className="col-lg-12 grid-margin stretch-card mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Manage Batches</Card.Title>
          <Table hover responsive>
            <thead>
              <tr>
                {tableHeads.map((head) => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((batchRecord) => {
                return (
                  <tr key={batchRecord.id}>
                    <td key={`${batchRecord.id} ${batchRecord.year}`}>
                      {batchRecord.year}
                    </td>
                    <td
                      key={`${batchRecord.id} ${batchRecord.academicTerm?.termName}`}
                    >
                      {batchRecord.academicTerm?.termName || "Term Not Exist"}
                    </td>
                    <td>
                      {actionButtons.map((Button, idx) => {
                        return (
                          <Button
                            key={`${batchRecord.id} ${idx}`}
                            onClick={() => buttonHandlers[idx](batchRecord.id)}
                            className="ml-1"
                          />
                        );
                      })}
                    </td>
                    <td className="ml-1">
                      {batchRecord.isAdmissionOpen ? "Open" : "false"}
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

export default DisplayBatches;
