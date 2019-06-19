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
import Arrow from "@material-ui/icons/KeyboardArrowLeft";
import Moment from 'react-moment';
import Direction from "@material-ui/icons/Directions";

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
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
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
    date: Date.now(),
    currentUser: {},
    showModal:false
    
  };

  getUserInfo = user => {
    let token;
    token = localStorage.getItem("access_token");
    //console.log(token)
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
    });
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

    switch (this.props.match.params.checkInLocation) {
      case "1":
        this.setState({ 
          currentLocation: "Trail Head",
          latitude: "30.2644894",
          longitude: "-97.8074639",
          opening: "https://www.google.com/maps/dir//''/@",
          closing: ",13z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0x8644b53aeecd69b5:0xb7b4c9c89bcebf32!2m2!1d-97.7724445!2d30.2644941!3e1", 
          photo: "Trail Photo"
        });
        break;
      case "2":
        this.setState({ 
          currentLocation: "Spyglass",
          latitude: "30.257926",
          longitude: "-97.787518",
          opening: "https://www.google.com/maps/dir//''/@",
          closing: ",17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x865b4ad30a2ba6c1:0x46d10571c8900bd7!2m2!1d-97.7876587!2d30.2577944", 
          photo: "Spyglass Photo"
        });
        break;
      case "3":
        this.setState({ 
          currentLocation: "Barton Hills",
          latitude: "30.255326",
          longitude: "-97.783981",
          opening: "https://www.google.com/maps/dir//''/@",
          closing: ",13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8644b52b5b47860d:0x7a4dcd3f88c55c0e!2m2!1d-97.7842272!2d30.255575",
          photo: "Barton Hills Photo"
      });
        break;
      case "4":
        this.setState({ 
          currentLocation: "Gus Fruh",
          latitude: "30.249326",
          longitude: "-97.79515",
          opening: "https://www.google.com/maps/dir//''/@",
          closing: ",17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x865b4b281b6de51b:0x7b2969062fed0392!2m2!1d-97.795208!2d30.24941",
          photo: "Gus Fruh Photo"
        });
        break;
      case "5":
        this.setState({ 
          currentLocation: "Loop 360",
          latitude: "30.243766",
          longitude: "-97.800123",
          opening: "https://www.google.com/maps/dir//''/@",
          closing: ",13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x865b4b2422b94247:0x21bc03e7da138b0f!2m2!1d-97.8000041!2d30.2431916"
        });
        break;
      case "6":
        this.setState({ 
          currentLocation: "Gaines",
          latitude: "30.244221",
          longitude: "-97.809666",
          opening: "https://www.google.com/maps/dir//''/@",
          closing: ",17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x865b4b1ee16d3b4b:0x64688b35c405ddad!2m2!1d-97.809824!2d30.244939"
        });
        break;
      case "7":
        this.setState({
          currentLocation: "Trail's End",
          latitude: "30.2746493",
          longitude: "-97.8306456",
          opening: "https://www.google.com/maps/dir//''/@",
          closing: ",17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x865b4a8bb82912cb:0xe957ecebdb94a485!2m2!1d-97.8252237!2d30.2751231"
        });
        break;
      
        default:
          // do nothing
    }
  }
  
  handleFormSubmit = event => {
    const { post, date, } = this.state;
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
  };
  
  getCheckInLocation = props => {
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
    const { anchorEl } = this.state;
    if (this.state.toProfile === true) {
      return <Redirect to="/profile" />;
    }
    
    return (
      <div>
        <AppBar position="static">
          <Toolbar className="theme">
            <Typography variant="h5" color="inherit" className={classes.grow}>
              GreenToad
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
        <Paper className="card">
        <br /><br /><br /><br /><br /><br/>
          <div className="socialBannerText">     
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
          </div> 
        </Paper>
        <Paper className={classes.paper} elevation={20}>
          <div className="socialLayout">
            <div className="socialLeft">
              <Post
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
              <br />
              <Paper elevation={24}>
                <Button 
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button} 
                  href={`${this.state.opening + this.state.latitude + this.state.longtitude + this.state.closing}`}
                >
                  <Direction className={classes.leftIcon}/>  Go: {this.state.currentLocation && this.state.currentLocation}
                </Button>
              </Paper>
              <br />
              <Paper elevation={24}>
                <Link to="/home" style={{ textDecoration: 'none', display: 'block' }}>
                  <Button 
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                  >
                    <Arrow/> Back
                  </Button>
                </Link>    
              </Paper>
            </div>
            <br />
            <Paper className={classes.posts} elevation={24}>
              <Grid container wrap="nowrap" spacing={16}>
                <Grid item xs>
                  <Typography variant="h5" component="h3">
                    {this.state.currentLocation && this.state.currentLocation} Updates:
                  </Typography>
                  <hr />
                  <Paper className={classes.list}  elevation={24}>
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
                          <SimpleModalWrapped />
                        </div>
                      </Modal>
                      {this.state.otherPosts.filter(post=>{
                        return post.checkInId===this.getCheckInLocation()
                      }).map(post => {
                        return (
                          <ListItem key={post._id} alignItems="flex-start" className="smoothScroll">
                            <ListItemAvatar >
                              <Avatar src={post.picture} />
                            </ListItemAvatar>
                            <ListItemText
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    className={classes.inline}
                                    color="primary"
                                  >
                                    {post.name}
                                  </Typography>
                                  <br />
                                  <Paper className={classes.userPosts} elevation={24}>
                                    {post.post}
                                    <br /><br/>
                                    <Typography color="primary">
                                      Posted: 
                                    </Typography>  
                                    <Moment format="M/DD/YY">{(post.date)}</Moment>
                                    <strong color="primary"> at </strong>
                                    <Moment format="h:mm a">{(post.date)}</Moment>
                                  </Paper>
                                </React.Fragment> 
                              }
                            />
                          </ListItem> 
                        );
                      })}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </div> 
        </Paper>
      </div>
    );
  }
}

const SimpleModalWrapped = withStyles(styles)(Modal);

export default withStyles(styles)(withRouter(Social));
