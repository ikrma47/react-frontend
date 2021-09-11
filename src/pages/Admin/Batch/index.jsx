import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { Formik, Form } from "formik";
// import { Card, Row, Col, Table } from "react-bootstrap";
// import { BorderedButton, FilledButton } from "elements/Button";
// import TextField from "elements/Form/TextField";
// import DropDown from "elements/Form/DropDown";
// import * as Yup from "yup";
// import Modal from "components/Modal";
// import DisplayBatches from "components/DisplayComponent/DisplayBatch";
// import {
//   submitBatchAction,
//   getBatchesAction,
// } from "pages/Admin/Batch/ducks/actions";
// import {
//   getProgramsToBeOfferedAction,
//   submitOfferedProgramsAction,
//   getOfferedProgramsAction,
// } from "pages/Admin/Batch/ducks/actions";

// const validateBatch = Yup.object({});
// const initialValuesBatch = {
//   batch: new Date().getFullYear(),
//   isAdmissionOpen: true,
//   term: "fall",
// };

// const validationDepartmentModal = Yup.object({});
// const initialValuesDepartmentModal = {
//   department: "",
//   course: "",
// };

// const Batch = ({
//   batches,
//   offeredPrograms,
//   getBatchesAction,
//   submitBatchAction,
//   programsToBeOffered,
//   getOfferedProgramsAction,
//   submitOfferedProgramsAction,
//   getProgramsToBeOfferedAction,
// }) => {
//   const [isBatchClicked, handleBatchClick] = useState(false);
//   const [selectBatch, handleBatchSelection] = useState(undefined);
//   const [isBatchSubmitted, handleBatchSubmission] = useState(false);
//   const [showAddDepartmentModal, handleAddDepartmentModal] = useState(false);
//   const [showProgamsModal, handleViewProgamsModal] = useState(false);
//   const [programs, setPrograms] = useState([]);
//   const [isProgramsSubmitted, handleProgramsSubmission] = useState(false);

//   useEffect(() => {
//     async function getBatches() {
//       await getBatchesAction();
//     }
//     getBatches();
//   }, []);

//   const onSubmitBatch = async (values) => {
//     handleBatchSubmission(true);
//     try {
//       await submitBatchAction(values);
//       handleBatchSubmission(false);
//       handleBatchClick(false);
//     } catch (error) {
//       console.log(error);
//       handleBatchSubmission(false);
//       handleBatchClick(false);
//     }
//   };

//   const getProgramsToBeOffered = async (batchId) => {
//     try {
//       await getProgramsToBeOfferedAction(batchId);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const submitProgramsHandler = async () => {
//     handleProgramsSubmission(true);
//     try {
//       if (programs.length > 0) {
//         await submitOfferedProgramsAction(programs, selectBatch);
//         setPrograms([]);
//         handleAddDepartmentModal(false);
//         handleBatchSelection(undefined);
//       }
//       handleProgramsSubmission(false);
//     } catch (error) {
//       console.log(error);
//       handleProgramsSubmission(false);
//     }
//   };

//   const viewButton = (props) => {
//     return <BorderedButton {...props}>View</BorderedButton>;
//   };

//   const viewButtonHandler = async (batchId) => {
//     try {
//       await getOfferedProgramsAction(batchId);
//       handleViewProgamsModal(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const addButton = (props) => {
//     return <FilledButton {...props}>Add</FilledButton>;
//   };

//   const addButtonHandler = async (batchId) => {
//     try {
//       await getProgramsToBeOffered(batchId);
//       handleBatchSelection(batchId);
//       handleAddDepartmentModal(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const ModalBodyViewPrograms = () => {
//     return (
//       <>
//         <Table striped hover responsive>
//           <thead>
//             <tr>
//               <th>Department</th>
//               <th>Program</th>
//             </tr>
//           </thead>
//           <tbody>
//             {offeredPrograms.data.map(
//               ({ id, courseCategory, course, department }) => {
//                 return (
//                   <tr key={id}>
//                     <td key={`${id} ${department.id}`}>
//                       {department.departmentName}
//                     </td>
//                     <td key={`${id} ${course.id}`}>
//                       {course.courseName}-{courseCategory}
//                     </td>
//                   </tr>
//                 );
//               }
//             )}
//           </tbody>
//         </Table>
//         <div className="modal-footer pb-0">
//           <BorderedButton
//             type="button"
//             onClick={() => handleViewProgamsModal(false)}
//           >
//             Cancel
//           </BorderedButton>
//         </div>
//       </>
//     );
//   };

//   const ModalBodyDepartment = () => {
//     return (
//       <>
//         <Formik
//           validationSchema={validationDepartmentModal}
//           initialValues={initialValuesDepartmentModal}
//           onSubmit={submitProgramsHandler}
//         >
//           <Form>
//             <Row>
//               <Col>
//                 <DropDown
//                   label="Select Department"
//                   name="department"
//                   getValue={(departmentName) => {
//                     setPrograms([...programs, { departmentName, courses: [] }]);
//                   }}
//                 >
//                   <option value="" hidden>
//                     Please Select Department
//                   </option>
//                   {programsToBeOffered?.data?.map(({ id, departmentName }) => {
//                     if (
//                       !programs.find(
//                         (program) => program.departmentName == departmentName
//                       )
//                     ) {
//                       return (
//                         <option value={departmentName} key={id}>
//                           {departmentName}
//                         </option>
//                       );
//                     } else return null;
//                   })}
//                 </DropDown>
//                 {programs.map(({ departmentName }) => {
//                   return <p key={departmentName}>{departmentName}</p>;
//                 })}
//               </Col>
//               <Col>
//                 <DropDown
//                   label="Select Course"
//                   name="course"
//                   getValue={(v) => {
//                     const [
//                       courseName,
//                       courseCategory,
//                       departmentName,
//                     ] = v.split("-");
//                     programs.map((record) => {
//                       if (record.departmentName == departmentName) {
//                         record.courses.push({ courseCategory, courseName });
//                       }
//                       return record;
//                     });
//                     setPrograms([...programs]);
//                   }}
//                 >
//                   <option value="" hidden>
//                     Please select the Department First
//                   </option>
//                   {programsToBeOffered.data.map(
//                     ({ courses, departmentName }) => {
//                       if (
//                         programs?.find(
//                           (program) => program.departmentName == departmentName
//                         )
//                       ) {
//                         return courses.map(
//                           ({
//                             courseName,
//                             departmentCourse: { courseCategory },
//                           }) => {
//                             if (
//                               !programs?.find((program) =>
//                                 program.departmentName == departmentName
//                                   ? program.courses.find(
//                                       (courseRecord) =>
//                                         courseName == courseRecord.courseName &&
//                                         courseRecord.courseCategory ==
//                                           courseCategory
//                                     )
//                                   : null
//                               )
//                             ) {
//                               return (
//                                 <option
//                                   key={`${courseName}-${courseCategory}-${departmentName}`}
//                                   value={`${courseName}-${courseCategory}-${departmentName}`}
//                                 >{`${courseName}-${courseCategory}`}</option>
//                               );
//                             }
//                           }
//                         );
//                       }
//                     }
//                   )}
//                 </DropDown>
//                 {programs.map(({ courses }) =>
//                   courses.map(({ courseName, courseCategory }) => (
//                     <p
//                       key={`${courseName}-${courseCategory}`}
//                     >{`${courseName}-${courseCategory}`}</p>
//                   ))
//                 )}
//               </Col>
//             </Row>
//             <div className="modal-footer pb-0">
//               <FilledButton type="submit" disabled={isProgramsSubmitted}>
//                 Submit
//               </FilledButton>
//               <BorderedButton
//                 type="reset"
//                 onClick={() => handleAddDepartmentModal(false)}
//               >
//                 Cancel
//               </BorderedButton>
//             </div>
//           </Form>
//         </Formik>
//       </>
//     );
//   };
//   return (
//     <>
//       <Card className="py-4 px-4 my-4 mx-4">
//         <Card.Title>Batch</Card.Title>
//         <Card.Text>
//           <b>Create a New Batch</b>
//         </Card.Text>
//         <Card.Body>
//           <BorderedButton
//             type="button"
//             onClick={() => handleBatchClick(!isBatchClicked)}
//             className="mb-4"
//           >
//             {isBatchClicked ? "hide Menu" : "Create Batch"}
//           </BorderedButton>
//           {isBatchClicked && (
//             <Formik
//               initialValues={initialValuesBatch}
//               validationSchema={validateBatch}
//               onSubmit={onSubmitBatch}
//             >
//               <Form>
//                 <TextField
//                   label="Batch Year"
//                   name="batch"
//                   placeholder="BATCH Year"
//                   type="text"
//                 />
//                 <DropDown label="Admissions" name="isAdmissionOpen">
//                   <option value={true}>open</option>
//                   <option value={false}>closed</option>
//                 </DropDown>
//                 <DropDown label="Term" name="term">
//                   <option value="fall">Fall</option>
//                   <option value="winter">Winter</option>
//                   <option value="spring">Spring</option>
//                   <option value="summer">Summer</option>
//                 </DropDown>
//                 <FilledButton type="submit" disabled={isBatchSubmitted}>
//                   Create Batch
//                 </FilledButton>
//               </Form>
//             </Formik>
//           )}
//         </Card.Body>
//       </Card>
//       {batches?.success ? (
//         <DisplayBatches
//           tableHeads={[
//             "Batch",
//             "Term",
//             "Departments & Programs",
//             "Admissions (open/close)",
//           ]}
//           tableData={batches.data}
//           actionButtons={[viewButton, addButton]}
//           buttonHandlers={[viewButtonHandler, addButtonHandler]}
//         />
//       ) : (
//         <strong>{batches?.message}</strong>
//       )}
//       <Modal
//         show={showAddDepartmentModal}
//         backdrop="static"
//         animation={false}
//         onHide={() => {
//           handleAddDepartmentModal(false);
//           handleBatchSelection(undefined);
//         }}
//         style={{ zIndex: 1071 }}
//         className="md-5"
//         header="Departments"
//         Body={ModalBodyDepartment}
//       />
//       <Modal
//         show={showProgamsModal}
//         backdrop="static"
//         animation={false}
//         onHide={() => {
//           handleViewProgamsModal(false);
//         }}
//         style={{ zIndex: 1071 }}
//         className="md-5"
//         header="Offered Courses"
//         Body={ModalBodyViewPrograms}
//       />
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     batches: state?.admin?.batch?.batches,
//     programsToBeOffered: state?.admin?.batch?.programsToBeOffered,
//     offeredPrograms: state?.admin?.batch?.offeredPrograms,
//   };
// };

// export default connect(mapStateToProps, {
//   getBatchesAction,
//   submitBatchAction,
//   getOfferedProgramsAction,
//   submitOfferedProgramsAction,
//   getProgramsToBeOfferedAction,
// })(Batch);

export default () => (
  <h1 className="py-4 px-4 my-4 mx-4">Feature under development</h1>
);
