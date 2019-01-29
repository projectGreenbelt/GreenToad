import React, { Component } from "react";
import Main from "./pages/Main";
import { Redirect, Link } from "react-router-dom";
import "./App.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

//Material UI Icons for Menu
import LocationOn from "@material-ui/icons/FlightLand";
import Person from "@material-ui/icons/Person";
//enzyme to remove:
// import { shallow, configure } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// configure({ adapter: new Adapter() });
// const wrapper = shallow(<App auth={{ isAuthenticated: () => true }} 
//     state = {{
//     anchorEl: null,
//     toProfile: false
//   } }/>);
//   console.log(wrapper)

//enzyme to remove
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
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -10,
    marginRight: 0
  }
});

class App extends Component {
  state = {
    anchorEl: null,
    toProfile: false,
    date: Date.now(),
    currentUser: null
  };
  getUserInfo = user => {
    let token;
    token = localStorage.getItem("access_token");
    console.log(token)
    if (token) {
      this.props.auth.lock.getUserInfo(token, (err, profile) => {
        if (err) {
          console.log("problem with getting user data");
        } else {
          this.setState({ currentUser: profile });
        }
      });
    }
    
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    this.getUserInfo();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleProfile = () => {
    this.setState({ toProfile: true });
  };

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  //1.send isAuthenticated as a default prop to my test that will generate JWT (token)
  //if sending as a default prop, would have to be a function that
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(isAuthenticated());
    const { classes } = this.props;
    const { anchorEl } = this.state;
    if (this.state.toProfile === true) {
      return <Redirect to="/profile" />;
    }
    return (
      <div data-name>
        {withStyles}
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar className="theme">
              <Typography variant="h5" color="inherit"  className={classes.grow}>
                Greentoad
              </Typography>
              {isAuthenticated() && (
                <React.Fragment>
                <Button onClick={this.logout.bind(this)} color="inherit">
                  Logout
                </Button>
                {this.state.currentUser && <ListItemAvatar>
                  <Avatar
                    src={this.state.currentUser.picture}
                  />
                </ListItemAvatar>}
                </React.Fragment>
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
                {isAuthenticated() && (
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
                      onClick={() => this.handleProfile()}
                    />
                  </MenuItem>
                )}
                <Link to="/landing" style={{ textDecoration: 'none', display: 'block' }} >
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
                      primary="Landing"
                    />
                  </MenuItem>
                </Link>  
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
        <Main />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
