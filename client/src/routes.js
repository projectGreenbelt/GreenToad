import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import App from "./App";
import Main from "./pages/Main";
import Home from "./components/Home/Home";
import Callback from "./components/Callback/Callback";
import Auth from "./components/Authorization/Authorization";
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
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});
const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};
const NoMatch = () => <h3>No match</h3>;

export const makeMainRoutes = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/home"
            render={props => <App auth={auth} {...props} />}
          />
          <Route
            exact
            path="/"
            render={props => <App auth={auth} {...props} />}
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
      </Router>
    </MuiThemeProvider>
  );
};
