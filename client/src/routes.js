import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Profile from "./components/Profile/Profile";
import Callback from "./components/Callback/Callback";
import Auth from "./components/Authorization/Authorization";
import Landing from "./pages/Landing";
import Social from "./pages/Social";
import Footer from "./components/Footer/Footer";

import history from "./history";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6fbf73",
      main: "#66BB6A",
      dark: "#357a38",
      contrastText: "#fff"
    },
    secondary: {
      light: "#6fbf73",
      main: "#f5f5f5",
      dark: "#ba000d",
      contrastText: "#000"
    },
    typography: {
      useNextVariants: true
    }
  }
});

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const NoMatch = () => <h3>Wubalubadubdub</h3>;

export const makeMainRoutes = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/landing"
            render={props => <Landing auth={auth} {...props} />}
          />
          <Route
            exact
            path="/home"
            render={props => <App auth={auth} {...props} />}
          />
          <Route
            exact
            path="/"
            render={props => <Landing auth={auth} {...props} />}
          />
          <Route
            exact
            path="/profile"
            render={props => <Profile auth={auth} {...props} />}
          />
          <Route
            exact
            path="/social/:checkInLocation"
            render={props => <Social auth={auth} {...props} />}
          />
          <Route
            exact
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </Router>
    </MuiThemeProvider>
  );
};
