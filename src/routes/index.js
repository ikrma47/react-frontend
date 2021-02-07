import React, { lazy, Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import { map } from "lodash";
import { Spinner as CenteredSpinner } from "elements/Spinner";
import ProtectedRoute from "components/ProtectedRoute";
import siteLayout from "layouts/Site/index";
import userDashboardLayout from "layouts/Dashboard/UserDashboard";
import adminDashboardLayout from "layouts/Dashboard/AdminDashboard";
import profileLayout from "layouts/Profile/index";
import Logout from "pages/Auth/Logout";
const Signup = lazy(() => import("pages/Auth/Signup"));
const Login = lazy(() => import("pages/Auth/Login"));
const VerifyEmailByOtp = lazy(() => import("pages/Auth/verifyEmailByOtp"));
const ForgetPassword = lazy(() => import("pages/ResetPassword/ForgetPassword"));
const VerifyOtp = lazy(() => import("pages/ResetPassword/VerifyOtp"));
const ResetPassword = lazy(() => import("pages/ResetPassword/ResetPassword"));
const Profile = lazy(() => import("pages/User/Profile"));
const Academics = lazy(() => import("pages/User/Academics"));
const Experience = lazy(() => import("pages/User/Experience"));
const Preference = lazy(() => import("pages/User/Preference"));
const Documents = lazy(() => import("pages/User/Documents"));
const Submit = lazy(() => import("pages/User/Submit"));
const userDashboard = lazy(() => import("pages/User/Dashboard"));
const adminDashboard = lazy(() => import("pages/Admin/Dashboard"));

const RouterHOC = (routes, defaultPath = "/login") => {
  return (props) => {
    return (
      <Suspense fallback={<CenteredSpinner />}>
        <Switch>
          {map(routes, (route) => (
            <ProtectedRoute
              key={route.name}
              path={route.path}
              isProtected={route.isProtected}
              component={route.component}
            />
          ))}
          <Redirect to={defaultPath} />
        </Switch>
      </Suspense>
    );
  };
};

export const userDashboardRoutes = {
  PROFILE: {
    name: "profile",
    path: "/user/profile",
    isProtected: true,
    component: userDashboardLayout(profileLayout(Profile)),
  },
  ACADEMICS: {
    name: "academics",
    path: "/user/academics",
    isProtected: true,
    component: userDashboardLayout(profileLayout(Academics)),
  },
  EXPERIENCE: {
    name: "experience",
    path: "/user/experience",
    isProtected: true,
    component: userDashboardLayout(profileLayout(Experience)),
  },
  PREFERENCES: {
    name: "preferences",
    path: "/user/preferences",
    isProtected: true,
    component: userDashboardLayout(profileLayout(Preference)),
  },
  DOUCMENTS: {
    name: "documents",
    path: "/user/documents",
    component: userDashboardLayout(profileLayout(Documents)),
  },
  SUBMIT: {
    name: "submit",
    path: "/user/submit",
    isProtected: true,
    component: userDashboardLayout(profileLayout(Submit)),
  },
  DASHBOARD: {
    name: "userDashboard",
    path: "/user/dashboard",
    isProtected: true,
    component: userDashboardLayout(userDashboard),
  },
};

export const adminDashboardRoutes = {
  ADMINDASHBOARD: {
    name: "adminDashboard",
    path: "/admin/dashboard",
    isProtected: true,
    component: adminDashboardLayout(adminDashboard),
  }
};

export const AppRoutes = {
  SIGNUP: {
    name: "signup",
    path: "/signup",
    isProtected: false,
    component: siteLayout(Signup),
  },
  LOGIN: {
    name: "login",
    path: "/login",
    isProtected: false,
    component: siteLayout(Login),
  },
  VERIFYEMAILBYOTP: {
    name: "verifyEmailByOtp",
    path: "/verify-email",
    isProtected: false,
    component: siteLayout(VerifyEmailByOtp),
  },
  LOGOUT: {
    name: "logout",
    path: "/logout",
    isProtected: false,
    component: Logout,
  },
  FORGETPASSWORD: {
    name: "forgetPassword",
    path: "/forget-password",
    isProtected: false,
    component: siteLayout(ForgetPassword),
  },
  VERIFYOTP: {
    name: "verifyOtp",
    path: "/verify-otp",
    isProtected: false,
    component: siteLayout(VerifyOtp),
  },
  RESETPASSWORD: {
    name: "resetPassword",
    path: "/reset-password",
    isProtected: false,
    component: siteLayout(ResetPassword),
  },
  ...userDashboardRoutes,
  ...adminDashboardRoutes,
};

export const AppRouter = RouterHOC(AppRoutes, "/login");
