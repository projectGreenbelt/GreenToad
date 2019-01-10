import React from "react";
import { Route, Router } from "react-router-dom";
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

export const makeMainRoutes = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <div>
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
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </div>
      </Router>
    </MuiThemeProvider>
  );
};
