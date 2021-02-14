import React, { useEffect } from "react";
import { connect } from "react-redux";
import DisplayDocuments from "components/DisplayComponent/DisplayDocuments";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import { getDocumentsOfSelectedAppIdAction } from "pages/Admin/ApplicationForm/Documents/ducks/actions";

const documentsListRows = [
	[
		{ docName: "cnicFront", description: "CNIC Front side" },
		{ docName: "cnicBack", description: "CNIC Back side" },
	],
	[
		{
			docName: "matricCertificate",
			description: "Matric Certificate",
		},
		{
			docName: "intermediateCertificate",
			description: "Intermediate Certificate",
		},
	],
	[
		{
			docName: "bsCertificate",
			description: "BSc/BS Certificate",
		},
		{
			docName: "firstSemesterDmc",
			description: "first Semester DMC",
		},
	],
	[
		{
			docName: "secondSemesterDmc",
			description: "second Semester DMC",
		},
		{
			docName: "thirdSemesterDmc",
			description: "third Semester DMC",
		},
	],
	[
		{
			docName: "fourthSemesterDmc",
			description: "fourth Semester DMC",
		},
		{
			docName: "fifthSemesterDmc",
			description: "fifth Semester DMC",
		},
	],
	[
		{
			docName: "sixthSemesterDmc",
			description: "sixth Semester DMC",
		},
		{
			docName: "seventhSemesterDmc",
			description: "seventh Semester DMC",
		},
	],
	[
		{
			docName: "eighthSemesterDmc",
			description: "Eighth Semester DMC",
		},
	],
];

const Documents = ({ appId, history, documents, getDocumentsOfSelectedAppIdAction }) => {
	useEffect(() => {
		async function getDocumentsById(appId) {
			if (appId) await getDocumentsOfSelectedAppIdAction(appId);
			else history.push("/admin/dashboard");
		}

		getDocumentsById(appId);
	}, []);
	if (documents?.success)
		return (
			<DisplayDocuments initialValues={documents.data?.[0]} documentsListRows={documentsListRows} />
		);
	else return <CenteredSpinner />;
};

const mapStateToProps = (state) => ({
	appId: state.app.selectedAppId,
	documents: state.admin.documents,
});

export default connect(mapStateToProps, { getDocumentsOfSelectedAppIdAction })(Documents);
