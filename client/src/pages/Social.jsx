import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Post from "../components/Post/Post";
import "../App.css";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Card from "@material-ui/core/Card";
import CardMedia from '@material-ui/core/CardMedia';
import Arrow from "@material-ui/icons/KeyboardArrowLeft";
import Moment from 'react-moment';


//Material UI Icons for Menu
import AccountBalance from "@material-ui/icons/AccountBalance";
import LocationOn from "@material-ui/icons/FlightLand";
import Person from "@material-ui/icons/Person";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    flexGrow: 1,
    overflow: "hidden"
  },
  posts: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 550,
    minwidth: 300
  },
  userPosts: {
    margin: `${theme.spacing.unit}px auto`,
    padding: 10,
    maxWidth: 550,
    minwidth: 290
  },

  list: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 500,
    minwidth: 275,
    height: 600
  },
  paper: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2
  },
  inline: {
    display: "inline"
  },
  postStyle: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  menuItem: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    },
    menuButton: {
      marginLeft: -10,
      marginRight: 0
    }
  },
  grow: {
    flexGrow: 1
  },
  media: {
    height: 0,
    /* paddingTop: '56.25%', // 16:9 */
  },
  text: {
    marginTop: 10,
    marginLeft: 15,
    width: '95%',
    maxWidth: 450,
    minWidth: 150
  },
  button: {
    margin: theme.spacing.unit * 2,
    
  },
  modal: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  }
});
function getModalStyle() {
  return {
    position: `absolute`,
    float: `left`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}
class Social extends Component {
  state = {
    otherPosts: [],
    post: "",
    anchorEl: null,
    toProfile: false,
    // emailInput: "", //set name of input taking in email to name='emailInput'
    date: Date.now(),
    currentUser: {},
    showModal:false
    
  };
  getUserInfo = user => {
    let token;
    token = localStorage.getItem("access_token");
    console.log(token)
    this.props.auth.lock.getUserInfo(token, (err, profile) => {
      if (err) {
        console.log("problem with getting user data");
      } else {
        this.setState({ currentUser: profile });
      }
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  
    handleRefresh = () => {
      // Setting access point information in the state
      this.setState({
        showModal:true
      });
      this.handleRedirect = setTimeout(() => {
        window.location.reload();
      }, 1100);
    };
    
  //handleEmailChange
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    this.getPosts();
    if (this.props.auth.isAuthenticated()) {
      this.getUserInfo();
    }
    this.getCheckInLocation();
    console.log(this.props.match.params.checkInLocation)
    switch(this.props.match.params.checkInLocation) {
      case "1":
        this.setState({ currentLocation: "Trail Head"});
        break;
      case "2":
        this.setState({ currentLocation: "Spyglass"});
        break;
      case "3":
        this.setState({ currentLocation: "Barton Hills"});
        break;
      case "4":
        this.setState({ currentLocation: "Gus Fruh"});
        break;
      case "5":
        this.setState({ currentLocation: "Loop 360"});
        break;
      case "6":
        this.setState({ currentLocation: "Gaines"});
        break;
      case "7":
        this.setState({ currentLocation: "Trail's End"});
        break;
      default: 
        this.setState({ currentLocation: "defaultPhrase"})

}
  }
  
  handleFormSubmit = event => {
    const { post, date, currentLocation } = this.state;
    const {name, picture}=this.state.currentUser
    
    let checkInId = this.getCheckInLocation();
    console.log(checkInId);
    API.savePost({
      post,
      date,
      name,
      checkInId,
      picture
    })
      .then(this.handleRefresh())
      .catch(err => console.log(err));
  };
  
  getPosts = props => {
    API.getPosts()
      .then(res => this.setState({ otherPosts: res.data}))
      .catch(err => console.log(err));
    console.log(this.state.otherPosts);
  };
  getCheckInLocation = props => {
    console.log(window.location.href);
    console.log(window.location.href.split("social/"));
    let checkInId = window.location.href.split("social/")[1];
    return checkInId;
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


  render() {
    if (!this.props.auth.isAuthenticated()) {
      alert(
        "Slow down! You have to log in first before you can access the GreenToad post area."
      );
      return <Redirect to="/home" />;
    }
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;
    console.log(isAuthenticated());
    const { anchorEl } = this.state;
    if (this.state.toProfile === true) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        {withStyles}
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
              {this.state.currentUser ?  <Avatar
                src={this.state.currentUser.picture}
              /> : <Avatar />}

             
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
        <Card className="card">
          <CardMedia
            className="cardText"
            image="../assets/img/Social.jpg"
            height="140"
            title="Beautiful picture of running water on the Greenbelt"
            >
            <Typography className={classes.text} variant="h4" component="h3" color="secondary">
              {this.state.currentLocation && this.state.currentLocation} Happenings
            </Typography>
            <Typography className={classes.text} variant="body1" component="h3" color="secondary">
              Looking for something to do or wondering where all the action is at? 
              Here you can checkout the latest status updates and activities at all the access points 
              on the trails provided in real-time by fellow Greenbelters. The posts are updated daily to keep you informed
              and aware. You can also post to the page if you would like to add your own status updates. 
              Post about anything. How's the water? Is the Trail muddy? Parking? Crowds? Mega hippie drum circles? 
              Let us know!
            </Typography>
          </CardMedia>
        </Card>
        <Paper className={classes.paper} elevation={20}>
          <div className="socialLayout">
            <div className="socialLeft">
              <Post
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
              <br />
              <Paper elevation={20}>
                <Button 
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  href="/home"
                >
                  <Arrow /> Back
                </Button>
              </Paper>
            </div>
            <br />
            <Paper className={classes.posts} elevation={20}>
              <Grid container wrap="nowrap" spacing={16}>
                <Grid item xs>
                  <Typography variant="h5" component="h3">
                    {this.state.currentLocation && this.state.currentLocation} Updates:
                  </Typography>
                  <hr />
                  <Paper className={classes.list} elevation={20}>
                    <List className={classes.postStyle} id="list">
                    <Modal
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                      open={this.state.showModal}
                    >
                      <div style={getModalStyle()} className={classes.modal} id="modal">
                        <Typography variant="h6" color="primary" id="modal-title">
                          Your Post has been added!
                        </Typography>
                          <span>
                            <img
                              src="https://3.bp.blogspot.com/-35XcSUkkKEw/WDZIEP8bteI/AAAAAAALaVk/rjrZxNa_nls4x_PxqjDJdtwonvdtlI_sQCLcB/s1600/AS002064_07.gif"
                            />
                          </span>
                        <SimpleModalWrapped />
                      </div>
                    </Modal>
                    {console.log(this.state.otherPosts)}
                      {this.state.otherPosts.filter(post=>{
                        return post.checkInId===this.getCheckInLocation()
                      }).map(post => {
                        return (
                          <Typography>
                            <ListItem key={post._id} alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar src={post.picture} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={""}
                                secondary={
                                  <React.Fragment>
                                    
                                      <Typography
                                        component="span"
                                        className={classes.inline}
                                        color="Primary"
                                      >
                                        {post.name}
                                      </Typography>
                                      <br />
                                      <Paper className={classes.userPosts} elevation={20}>
                                        {post.post}
                                      <br /><br/>
                                      <div>
                                        <Typography color="primary">
                                          Posted: 
                                        </Typography>  
                                        <Moment format="M/DD/YY">{(post.date)}</Moment>
                                        <strong color="primary"> at </strong>
                                        <Moment format="h:mm a">{(post.date)}</Moment>
                                      </div>
                                    </Paper>
                                  </React.Fragment> 
                                }
                              />
                            </ListItem> 
                          </Typography>
                        );
                      })}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </div> 
        </Paper>
        <div className="footer">
          <div>
            <List>
              <ListItem>
                <div>
                  &copy; {1900 + new Date().getYear()} , Project Greenbelt
                </div>
                <IconButton justIcon color="primary">
                  <a
                    href="https://github.com/projectGreenbelt/projectGreenbelt"
                    classname="iconButton"
                  >
                    <i
                      className="fab fa-github-square"
                      id="icon"
                      aria-hidden="true"
                      color="secondary"
                    />
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
const SimpleModalWrapped = withStyles(styles)(Modal);

export default withStyles(styles)(withRouter(Social));
