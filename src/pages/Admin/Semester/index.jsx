import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { Card } from "react-bootstrap";
import { BorderedButton, FilledButton } from "elements/Button";
import DropDown from "elements/Form/DropDown";
import * as Yup from "yup";
import DisplaySemester from "components/DisplayComponent/DisplaySemester";
import {
  getBatchesAction,
  getOfferedProgramsAction,
} from "pages/Admin/Batch/ducks/actions";
import {
  getSemestersAction,
  submitSemesterAction,
} from "pages/Admin/Semester/ducks/actions";

const validateSemester = Yup.object({});
const initialValuesSemester = {
  batchId: "",
  semester: "1st",
  semesterTerm: "fall",
  programId: "",
};

const Semester = ({
  batches,
  semesters,
  offeredPrograms,
  getBatchesAction,
  getOfferedProgramsAction,
  getSemestersAction,
  submitSemesterAction,
}) => {
  const [isSemesterClicked, handleSemesterClick] = useState(false);
  const [isSemesterSubmitting, handleSemesterSubmission] = useState(false);

  useEffect(() => {
    async function getBatchesAndSemesters() {
      await getBatchesAction();
      await getSemestersAction();
    }

    getBatchesAndSemesters();
  }, []);

  const onSubmitSemester = async (values) => {
    console.log(values);
    handleSemesterSubmission(true);
    try {
      await submitSemesterAction(values);
      handleSemesterClick(true);
      handleSemesterSubmission(false);
    } catch (error) {
      console.log(error);
      handleSemesterSubmission(false);
    }
  };

  return (
    <>
      <Card className="py-4 px-4 my-4 mx-4">
        <Card.Title>Semester</Card.Title>
        <Card.Text>
          <b>Create a New Semester</b>
        </Card.Text>
        <Card.Body>
          <BorderedButton
            type="button"
            onClick={() => handleSemesterClick(!isSemesterClicked)}
            className="mb-4"
          >
            {isSemesterClicked ? "hide menu" : "Create Semester"}
          </BorderedButton>
          {isSemesterClicked && (
            <Formik
              initialValues={initialValuesSemester}
              validationSchema={validateSemester}
              onSubmit={onSubmitSemester}
            >
              <Form>
                <DropDown
                  label="Batch"
                  name="batchId"
                  getValue={async (batchId) => {
                    await getOfferedProgramsAction(batchId);
                    // setPrograms(offeredPrograms);
                  }}
                >
                  <option value="" hidden>
                    Please Select Batch
                  </option>
                  {batches.data.map(({ year, id, academicTerm }) => {
                    return (
                      <option key={id} value={id}>{`${year}-${
                        academicTerm?.termName || "term not exist"
                      }`}</option>
                    );
                  })}
                </DropDown>
                <DropDown label="Semester" name="semester">
                  <option value="1st">1st</option>
                  <option value="1st">2nd</option>
                  <option value="1st">3rd</option>
                  <option value="1st">4th</option>
                  <option value="1st">5th</option>
                  <option value="1st">6th</option>
                </DropDown>
                <DropDown label="Semester Term" name="semesterTerm">
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                </DropDown>
                <DropDown label="Program" name="programId">
                  <option value="" hidden>
                    Please Select Program
                  </option>
                  {offeredPrograms?.data?.map(
                    ({ courseCategory, department, course, id }) => {
                      return (
                        <option
                          key={id}
                          value={id}
                        >{`${department.departmentName}-${course.courseName}-${courseCategory}`}</option>
                      );
                    }
                  )}
                </DropDown>
                <FilledButton type="submit" disabled={isSemesterSubmitting}>
                  Create Semester
                </FilledButton>
              </Form>
            </Formik>
          )}
        </Card.Body>
      </Card>
      <DisplaySemester
        tableHeads={[
          "Batch",
          "Department",
          "Program",
          "Term",
          "Semester",
          "Courses",
          "Students",
        ]}
        tableData={semesters?.data}
      />
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    batches: state.admin.batch.batches,
    offeredPrograms: state?.admin?.batch?.offeredPrograms,
    semesters: state?.admin?.semester?.semesters,
  };
};

export default connect(mapStateToProp, {
  getBatchesAction,
  getOfferedProgramsAction,
  getSemestersAction,
  submitSemesterAction,
})(Semester);
