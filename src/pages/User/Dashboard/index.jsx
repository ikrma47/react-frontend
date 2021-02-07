import React from "react";
import { connect } from "react-redux";
import DisplayDashboard from "components/DisplayComponent/DisplayDashboard";
import { getUserDashboardAction } from "pages/User/Dashboard/ducks/actions";
import { getApplicationStatusAction } from "pages/App/ducks/actions";
import ErrorBoundary from "components/ErrorBoundary";
import { Spinner as CenteredSpinner } from "elements/Spinner";

function message(applicationStatus, courseCategory) {
  if (!applicationStatus?.isProfile) return "Please Complete Your Profile";
  if (!applicationStatus?.isCourseCategory)
    return "Please Select Your Course Category";
  if (!applicationStatus?.isFirstYear)
    return "Please Fill your BS First Year Record";
  if (!applicationStatus?.isSecondYear)
    return "Please Fill your BS Second Year Record";
  if (!applicationStatus?.isThirdYear)
    return "Please Fill Your BS Third Year Record";
  if (!applicationStatus?.isFinalYear)
    return "Please Fill Your BS Final Year Record";
  if (!applicationStatus?.isGAT)
    return "Please Fill Your GAT/Equivalent Test Record";
  if (courseCategory === "Phd" && !applicationStatus?.isMS)
    return "Please Fill your MS Record";
  if (courseCategory === "Phd" && !applicationStatus?.isExperience)
    return "Please provide the Job Experience";
  if (!applicationStatus?.isPreference) return "Please fill your Preferences";
  if (!applicationStatus?.isCnicFront)
    return "Please Upload Your Cnic Front Side";
  if (!applicationStatus?.isCnicBack)
    return "Please Upload Your Cnic Back Side";
  if (!applicationStatus?.isMatricCertificate)
    return "Please Upload Matric Certificate";
  if (!applicationStatus?.isIntermediateCertificate)
    return "Please Upload Your Intermediate Certificate";
  if (!applicationStatus?.isFirstSemesterDmc)
    return "Please Upload Your BS 1st Semester DMC";
  if (!applicationStatus?.isSecondSemesterDmc)
    return "Please Upload Your 2nd Semester DMC";
  if (!applicationStatus?.isThirdSemesterDmc)
    return "Please Upload Your 3rd Semester DMC";
  if (!applicationStatus?.isFourthSemesterDmc)
    return "Please Upload Your 4th Semester DMC";
  if (!applicationStatus?.isFifthSemesterDmc)
    return "Please Upload Your 5th Semester DMC";
  if (!applicationStatus?.isSixthSemesterDmc)
    return "Please Upload Your 6th Semester DMC";
  if (!applicationStatus?.isSeventhSemesterDmc)
    return "Please Upload Your 7th Semester DMC";
  if (!applicationStatus?.isEighthSemesterDmc)
    return "Please Upload Your 7th Semester DMC";
  if (!applicationStatus?.isBsCertificate)
    return "Please Upload Your BS Certificate";
  if (!applicationStatus?.isSubmitted) return "Please Submit Your Application";
  if (applicationStatus?.isAccepted)
    return "Your Application has Accepted Please Wait for the Merit List";
  else
    return "Please wait until your application has been accepted by Admission Office";
}

const Dashboard = ({
  appId,
  userDashboard,
  applicationStatus,
  getUserDashboardAction,
  getApplicationStatusAction,
}) => {
  React.useEffect(() => {
    async function getUserDataById() {
      if (appId) {
        await getApplicationStatusAction(appId);
        await getUserDashboardAction(appId);
      }
    }
    getUserDataById();
  }, []);

  if (userDashboard?.success && applicationStatus?.success) {
    const { name, courseCategory, image } = userDashboard.data[0].detail || {};
    return (
      <ErrorBoundary>
        <DisplayDashboard
          tableHeads={[
            "Picture",
            "App#Id",
            "Name",
            "Course Category",
            "Status",
          ]}
          applicants={[
            {
              image,
              appId,
              name,
              courseCategory,
              message: message(applicationStatus.data[0], courseCategory),
            },
          ]}
        />
      </ErrorBoundary>
    );
  } else {
    return <CenteredSpinner />;
  }
};

const mapStateToProp = (state) => ({
  appId: state?.auth?.appId,
  userDashboard: state?.userDashboard,
  applicationStatus: state?.app,
});

export default connect(mapStateToProp, {
  getUserDashboardAction,
  getApplicationStatusAction,
})(Dashboard);
