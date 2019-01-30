import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "../../App.css";
import API from "../../utils/API";
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
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Arrow from "@material-ui/icons/KeyboardArrowLeft";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

//Material UI Icons for Menu
import AccountBalance from "@material-ui/icons/AccountBalance";
import LocationOn from "@material-ui/icons/FlightLand";

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
  mainContainer: {
    marginTop: 5,
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
  },
  profile: {
    maxWidth: 210,
    minWidth: 210
  },
  container: {
    maxWidth: 800,
    minWidth: 300,
    marginTop: 5,
    
  },
  text: {
    marginTop: 10,
    marginLeft: 15,
    width: '95%',
    maxWidth: 250,
    minWidth: 150
  },
  button: {
    Height:100,
    maxWidth: 100
  },
  paper: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 115
  },
});

class Profile extends Component {
  state = {
    profile: {},
    anchorEl: null,
    toProfile: false
  };

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

  handleFormSubmit = event => {
    const {picture}=this.state.currentUser
    
    API.savePost({
      picture
    })
      .then(this.handleRefresh())
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const { userProfile, getUserInfo, userInfo } = this.props.auth;
    if (this.props.auth.isAuthenticated()) {
      let oldToken = localStorage.getItem("access_token");
      let newProfile;
      this.props.auth.lock.getUserInfo(oldToken, (err, profile) => {
        console.log(profile);
        newProfile = profile;
        this.setState({ profile: newProfile });
      });
    } 
  }
  
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(isAuthenticated());
    const { classes } = this.props;
    const { anchorEl } = this.state;
    if (!this.props.auth.isAuthenticated()) {
      alert(
        "Hold up! You have to log in first before you can access the profile area."
      );
      return <Redirect to="/home" />;
    }
    if (this.state.toProfile === true) {
      return <Redirect to="/profile" />;
    }
    const { profile } = this.state;
    return (
      <div>
        {withStyles}
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar className="theme">
              <Typography variant="h5" color="inherit" className={classes.grow}>
                Greentoad
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
              <ListItemAvatar>
                <Avatar
                  src={profile.picture}
                />
              </ListItemAvatar>
              <IconButton
                className={classes.menuItem}
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
              <Link to="/home" style={{ textDecoration: 'none', display: 'block' }} >
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
                    onclick
                  />
                </MenuItem>
              </Link>  
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
          <Paper className="profileBackground" elevation={20}>
            <br /><br /><br />
            <div className="profileContents">
              <div className="profileLeft">
                <Card className={classes.profile} id="pictureCard" elevation={20}>
                  <img src={profile.picture} id="picture" alt="profile" width="200" />
                </Card>
                <br />
                <Paper className={classes.paper}>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    aria-label="Add" 
                    size="large" 
                    className={classes.margin}
                    href="/home"
                  >
                    <Arrow/> Back
                  </Button>
                </Paper>
              </div>
              <br />
              <Card id="profileRight" elevation={20}>
                <br />
                <Typography className={classes.text} variant="h5">
                  <strong>Name:</strong> {profile.name}
                </Typography>
                <br />
                <Typography className={classes.text} variant="body1">
                  <strong>Nickname:</strong> {profile.nickname}
                </Typography>
                <Typography className={classes.text} variant="body1">
                  <strong>Gender:</strong> {profile.gender}
                </Typography>
                <Typography className={classes.text} variant="body1">
                  <strong>Logged In:</strong> {profile.updated_at}
                </Typography>
                {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
              </Card>
            </div>
          </Paper>
        </div>
        <div className="footer">
          <div>
            <List>
            <ListItem>
                <div>
                &copy; {1900 + new Date().getYear()} ,{" "}
                Project Greenbelt
                </div>
                <IconButton
                justIcon
                color="primary"
                >
                <a 
                  href="https://github.com/projectGreenbelt/projectGreenbelt"
                  classname="iconButton"
                >
                  <i className="fab fa-github-square" id="icon" aria-hidden="true" color="secondary" />
                </a>
                </IconButton>
            </ListItem>
            </List>
          </div>
        </div>  
      </div>
    );
  }
}

export default withStyles(styles) (Profile);
