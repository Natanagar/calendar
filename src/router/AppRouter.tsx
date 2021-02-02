import React, { FC, useState, useEffect } from "react";
import * as paths from "./paths";
import { History } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import NotePage from "../components/notes/NotePage";
import CalendarPage from "../components/calendar/CalendarPage";
import RegistrationWithFirebase from "../components/auth/RegistrationPage";
import DashboardLayout from "../components/dashboard/layout/DashboardLayout";
// import { getAuthToken } from '../model/authHelpers';

interface AppRouterProps {
  history: History;
}

interface RouteType {
  path: string;
  name: string;
  exact?: boolean;
  Component: any;
  Layout?: any;
}

const routes: RouteType[] = [
  {
    path: paths.AUTH,
    name: "Auth",
    exact: true,
    Component: AuthForm
  },
  {
    path: paths.ADD_NOTE,
    name: "Add Notes",
    Component: NotePage,
    Layout: DashboardLayout
  },
  {
    path: paths.REGISTER,
    name: "Registration",
    Component: RegistrationWithFirebase
  },
  {
    path: paths.MAIN,
    name: "Calendar",
    exact: true,
    Component: CalendarPage,
    Layout: DashboardLayout
  }
];

const AppRouter: FC<AppRouterProps> = ({ history }) => (
  <Router>
    <Switch>
      {routes.map(({ path, Component, Layout, exact }) => {
        const WrappedComponent = Layout ? (
          <Layout>
            <Component history={history} />
          </Layout>
        ) : (
          <Component history={history} />
        );

        return (
          <Route
            key={path}
            exact={exact}
            path={path}
            component={() => WrappedComponent}
          />
        );
      })}
    </Switch>
  </Router>
);

export default AppRouter;
