import React, { Component } from "react";
<<<<<<< HEAD
import PropTypes from "prop-types";
=======
// import Nav from "./components/Nav/Nav";
>>>>>>> d21e15a55a58a8b7a2ec5bcd9e3d9eaa1884fbe3
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
<<<<<<< HEAD
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

//Material UI Icons for Menu
import AccountBalance from "@material-ui/icons/AccountBalance";
import LocationOn from "@material-ui/icons/LocationOn";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Person from "@material-ui/icons/Person";

const styles = theme => ({
  menuItem: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
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
});

class App extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

=======

class App extends Component {
>>>>>>> d21e15a55a58a8b7a2ec5bcd9e3d9eaa1884fbe3
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
              {isAuthenticated() && (
                <Button onClick={this.logout.bind(this)} color="inherit">
                  Logout
                </Button>
              )}
              {!isAuthenticated() && (
                <Button onClick={this.login.bind(this)} color="inherit">
                  Login
                </Button>
              )}

              <IconButton
                className={styles.menuButton}
                color="inherit"
                aria-label="Menu"
<<<<<<< HEAD
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem
                  onClick={this.handleClose}
                  className={classes.menuItem}
                >
                  <ListItemIcon className={classes.icon}>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Profile"
                  />
                </MenuItem>
                <MenuItem
                  onClick={this.handleClose}
                  className={classes.menuItem}
                >
                  <ListItemIcon className={classes.icon}>
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Home"
                  />
                </MenuItem>
                <MenuItem
                  onClick={this.handleClose}
                  className={classes.menuItem}
                >
                  <ListItemIcon className={classes.icon}>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Location"
                  />
                </MenuItem>
                <MenuItem
                  onClick={this.handleClose}
                  className={classes.menuItem}
                >
                  <ListItemIcon className={classes.icon}>
                    <Fingerprint />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Logout"
                  />
                </MenuItem>
              </Menu>
=======
              >
                <MenuIcon />
              </IconButton>
>>>>>>> d21e15a55a58a8b7a2ec5bcd9e3d9eaa1884fbe3
            </Toolbar>
          </AppBar>
        </div>
        {isAuthenticated() && <Main />}
      </div>
    );
  }
}

<<<<<<< HEAD
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
=======
export default App;
>>>>>>> d21e15a55a58a8b7a2ec5bcd9e3d9eaa1884fbe3
