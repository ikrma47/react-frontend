import * as Yup from "yup";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import DisplaySubmitAdmin from "components/DisplayComponent/DisplaySubmitAdmin";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import {
	updateApplicationStatusByAdminAction,
	getApplicationStatusByIdAction,
} from "pages/Admin/ApplicationForm/Submit/ducks/actions";

const Submission = ({
	email,
	appId,
	history,
	comments,
	isAccepted,
	applicationStatus,
	getApplicationStatusByIdAction,
	updateApplicationStatusByAdminAction,
}) => {
	useEffect(() => {
		async function getApplicationStatusById(appId) {
			if (appId) await getApplicationStatusByIdAction(appId);
			else history.push("/admin/dashboard");
		}

		getApplicationStatusById(appId);
	}, []);
	const [isSubmitting, handleSubmission] = useState(false);

	const onSubmit = async ({ comments }) => {
		handleSubmission(true);
		try {
			await updateApplicationStatusByAdminAction(appId, {
				isSubmitted: false,
				comments,
				rejectedBy: email,
			});
			handleSubmission(false);
			history.push("/admin/dashboard");
		} catch (error) {
			console.log(error);
			handleSubmission(false);
		}
	};
	const onAccept = async () => {
		handleSubmission(true);
		try {
			await updateApplicationStatusByAdminAction(appId, { isAccepted: true, acceptedBy: email });
			handleSubmission(false);
			history.push("/admin/dashboard");
		} catch (error) {
			console.log(error);
			handleSubmission(false);
		}
	};
	const initialValues = { comments: comments || "" };
	const validate = Yup.object({ comments: Yup.string().required("Please Enter the Reason") });
	if (applicationStatus?.success)
		return (
			<DisplaySubmitAdmin
				hidden={isAccepted}
				validate={validate}
				onSubmit={onSubmit}
				onAccept={onAccept}
				disabled={isSubmitting || isAccepted}
				initialValues={initialValues}
			/>
		);
	else return <CenteredSpinner />;
};

const mapStateToProps = (state) => ({
	email: state.auth.email,
	appId: state.app.selectedAppId,
	applicationStatus: state.admin.submit,
	isAccepted: state?.admin?.submit?.data?.[0].isAccepted,
	comments: state?.admin?.submit?.data?.[0].comments,
});

export default connect(mapStateToProps, {
	updateApplicationStatusByAdminAction,
	getApplicationStatusByIdAction,
})(Submission);
