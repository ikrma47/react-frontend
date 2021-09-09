import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import DisplayDocuments from "components/DisplayComponent/DisplayDocuments";
import {
  getDocumentByIdAction,
  submitDocumentAction,
} from "pages/User/Documents/ducks/actions";
import {
  updateApplicationStatusAction,
  getApplicationStatusAction,
} from "pages/App/ducks/actions";

const documentsListRows = [
  [
    { docName: "cnicFront", description: "Upload your CNIC Front side here" },
    { docName: "cnicBack", description: "upload your CNIC Back side here" },
  ],
  [
    {
      docName: "matricCertificate",
      description: "Upload your Matric Certificate here",
    },
    {
      docName: "intermediateCertificate",
      description: "Upload your Intermediate Certificate here",
    },
  ],
  [
    {
      docName: "bsCertificate",
      description: "Upload your BSc/BS Certificate here",
    },
    {
      docName: "firstSemesterDmc",
      description: "Upload your first Semester DMC here",
    },
  ],
  [
    {
      docName: "secondSemesterDmc",
      description: "Upload your second Semester DMC here",
    },
    {
      docName: "thirdSemesterDmc",
      description: "Upload your third Semester DMC here",
    },
  ],
  [
    {
      docName: "fourthSemesterDmc",
      description: "Upload your fourth Semester DMC here",
    },
    {
      docName: "fifthSemesterDmc",
      description: "Upload your fifth Semester DMC here",
    },
  ],
  [
    {
      docName: "sixthSemesterDmc",
      description: "Upload your sixth Semester DMC here",
    },
    {
      docName: "seventhSemesterDmc",
      description: "Upload your seventh Semester DMC here",
    },
  ],
  [
    {
      docName: "eighthSemesterDmc",
      description: "Upload your Eighth Semester DMC here",
    },
  ],
];

function captializeFirstLetterAndAddIsToDocName(docName) {
  const captializedFirstLetter = docName.replace(
    docName[0],
    docName[0].toUpperCase()
  );
  return `is${captializedFirstLetter}`;
}

const Documents = ({
  appId,
  documents,
  applicationStatus,
  submitDocumentAction,
  getDocumentByIdAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
}) => {
  useEffect(() => {
    async function getDocumentsById(appId) {
      if (appId) {
        await getDocumentByIdAction(appId);
        await getApplicationStatusAction(appId);
      }
    }

    getDocumentsById(appId);
  }, []);

  const [isSubmitting, handleSubmission] = useState(false);
  const { isSubmitted = false } = applicationStatus[0] || {};
  const refValues = {};

  function getRefValue(docName, ref) {
    if (ref) refValues[docName] = ref?.files[0];
  }

  async function handleUploadImage(docName) {
    handleSubmission(true);
    try {
      await submitDocumentAction({ docName, file: refValues[docName] }, appId);
      const documentStatus = captializeFirstLetterAndAddIsToDocName(docName);
      if (!applicationStatus[documentStatus])
        await updateApplicationStatusAction({ [documentStatus]: true }, appId);
      handleSubmission(false);
    } catch (error) {
      console.log(error);
      handleSubmission(false);
    }
  }

  if (documents?.success) {
    let images = documents?.data[0] || {};

    return (
      <DisplayDocuments
        initialValues={images}
        isSubmitted={isSubmitted}
        getRefValue={getRefValue}
        isSubmitting={isSubmitting}
        documentsListRows={documentsListRows}
        handleUploadImage={handleUploadImage}
      />
    );
  } else {
    return <CenteredSpinner />;
  }
};

const mapStateToProp = (state) => ({
  appId: state?.auth?.appId,
  documents: state?.user?.documents,
  applicationStatus: state?.app?.data,
});

export default connect(mapStateToProp, {
  submitDocumentAction,
  getDocumentByIdAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
})(Documents);
