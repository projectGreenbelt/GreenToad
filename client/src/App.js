import React, { Component } from "react";
import Nav from "./components/Nav/Nav";
// import { Navbar, Button } from "react-bootstrap";
// import Auth from "./components/Authorization/Authorization";
import Main from "./pages/Main";
import Profile from "./components/Profile/Profile";
import "./App.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  // componentDidMount() {
  //   const { renewSession } = this.props.auth;

  //   if (localStorage.getItem("isLoggedIn") === "true") {
  //     renewSession();
  //   }
  // }

  //1.send isAuthenticated as a default prop to my test that will generate JWT (token)
  //if sending as a default prop, would have to be a function that
  render() {
    const styles = {
      root: {
        flexGrow: 1
      },
      grow: {
        flexGrow: 1
      },
      menuButton: {
        marginLeft: -10,
        marginRight: 0
      }
    };
    const { isAuthenticated } = this.props.auth;
    console.log(isAuthenticated());
    const { classes } = this.props;

    return (
      <div>
        {/* <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, "home")}
            >
              Home
            </Button>
            {!isAuthenticated() && (
              <Button
                id="qsLoginBtn"
                bsStyle="primary"
                className="btn-margin"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                id="qsLogoutBtn"
                bsStyle="primary"
                className="btn-margin"
                onClick={this.logout.bind(this)}
              >
                Log Out
              </Button>
            )}
          </Navbar.Header>
        </Navbar> */}
        {withStyles}
        <div className={styles.root}>
          <AppBar position="static">
            <Toolbar className="theme">
              <Typography variant="h6" color="inherit" className={styles.grow}>
                Project GreenBelt
              </Typography>
              <Button onClick={this.login.bind(this)} color="inherit">
                Login
              </Button>
              <IconButton
                className={styles.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* <Nav /> */}
        </div>
        {isAuthenticated() && <Main />}
      </div>
    );
  }
}

export default App;
