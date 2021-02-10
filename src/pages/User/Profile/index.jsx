import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import DisplayProfile from "components/DisplayComponent/DisplayProfile";
import {
  getProfileByIdAction,
  updateProfileDetailsAction,
  updateCourseCategoryAction,
  updateProfilePictureAction,
} from "pages/User/Profile/ducks/actions";
import {
  getApplicationStatusAction,
  updateApplicationStatusAction,
} from "pages/App/ducks/actions";

const validation = Yup.object({
  name: Yup.string().min(3).required("Name should not be empty."),
  fatherName: Yup.string().min(3).required("Father Name should not be empty."),
  domicile: Yup.string().required("Enter your domicile"),
  email: Yup.string().email().required(),
  cnic: Yup.number().required().typeError("only numeric digits are allowed"),
  religion: Yup.string().min(3).required("please input a religion"),
  personalNumber: Yup.number()
    .required("Enter your phone Number")
    .typeError("only numeric digits are allowed"),
  optionalNumber: Yup.number().typeError("only numeric digits are allowed"),
  dob: Yup.string().required("Select your dob"),
  residentialAddress: Yup.string().required("Enter the address"),
  mailingAddress: Yup.string().required("Enter the address"),
  courseCategory: Yup.string(),
});

const successNotification = "User profile has been successully updated.";

const Profile = ({
  appId,
  profile,
  applicationStatus,
  getProfileByIdAction,
  updateProfileDetailsAction,
  updateProfilePictureAction,
  updateCourseCategoryAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
}) => {
  useEffect(() => {
    async function getProfile(appId) {
      await getProfileByIdAction(appId);
      await getApplicationStatusAction(appId);
    }

    getProfile(appId);
  }, []);

  const [fileUpload, handleFileUpload] = useState(null);
  const [errorMsg, handleErrorMsg] = useState("");
  const [successMsg, handleSuccessMsg] = useState("");
  const [isSubmitting, handleSubmission] = useState(false);

  const getRefValue = (ref) => handleFileUpload(ref);

  const handleUploadImage = async () => {
    handleSubmission(true);
    try {
      await updateProfilePictureAction(fileUpload.files[0]);
      handleSubmission(false);
    } catch (error) {
      console.log(error);
      handleSubmission(false);
    }
  };

  const handleSubmit = async ({ dob: reversedDob, ...values }) => {
    let dob = reversedDob.split("-").reverse().join("-");
    handleSubmission(true);
    handleSuccessMsg("");
    handleErrorMsg("");
    const {
      name,
      fatherName,
      domicile,
      religion,
      personalNumber,
      optionalNumber,
      mailingAddress,
      residentialAddress,
      courseCategory,
    } = values;
    try {
      await updateProfileDetailsAction({
        name,
        fatherName,
        domicile,
        religion,
        personalNumber,
        optionalNumber,
        dob,
        mailingAddress,
        residentialAddress,
      });
      await updateApplicationStatusAction({ isProfile: true });
      if (courseCategory.length > 0) {
        await updateCourseCategoryAction({ courseCategory });
        await updateApplicationStatusAction({ isCourseCategory: true });
      }
      handleSubmission(false);
      handleSuccessMsg(successNotification);
    } catch (error) {
      handleSubmission(false);
      if (error && error.response.message) {
        handleErrorMsg(error.message);
      }
    }
  };

  const [{ email, cnic, detail = {} } = {}] = profile?.data || [];

  const {
    name,
    fatherName,
    domicile,
    religion,
    phoneNumber: { personalNumber, optionalNumber } = {},
    dob,
    address: { mailingAddress, residentialAddress } = {},
    courseCategory,
    image,
  } = detail || {};

  const initialValues = {
    name: `${name || ""}`,
    fatherName: `${fatherName || ""}`,
    domicile: `${domicile || ""}`,
    email: `${email || ""}`,
    cnic: `${cnic || ""}`,
    religion: `${religion || ""}`,
    personalNumber: `${personalNumber || ""}`,
    optionalNumber: `${optionalNumber || ""}`,
    dob: `${dob?.split("-").reverse().join("-") || ""}`,
    residentialAddress: `${residentialAddress || ""}`,
    mailingAddress: `${mailingAddress || ""}`,
    courseCategory: `${courseCategory || ""}`,
    image,
  };

  if (profile?.success) {
    const { isSubmitted = false } = applicationStatus[0] || {};
    return (
      <DisplayProfile
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        errorMsg={errorMsg}
        successMsg={successMsg}
        validation={validation}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        handleUploadImage={handleUploadImage}
        getRefValue={getRefValue}
      />
    );
  } else {
    return <CenteredSpinner />;
  }
};

const mapStateToProp = (state) => ({
  appId: state?.auth?.appId,
  profile: state?.user?.profile,
  applicationStatus: state?.app?.data,
});

export default connect(mapStateToProp, {
  getProfileByIdAction,
  updateProfileDetailsAction,
  updateProfilePictureAction,
  updateCourseCategoryAction,
  getApplicationStatusAction,
  updateApplicationStatusAction,
})(Profile);
