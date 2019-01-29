import React, { Component } from "react";
import CheckIn from "../components/CheckIn/CheckIn";
import Post from "../components/Post/Post";
import "../App.css";
import API from "../utils/API";
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
import { Redirect } from "react-router-dom";
import Modal from "@material-ui/core/Modal";

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
    maxWidth: 500,
    minwidth: 275
  },
  list: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 800,
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
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper
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
    // emailInput: "", //set name of input taking in email to name='emailInput'
    date: Date.now(),
    currentUser: {},
    showModal:false
    
  };
  getUserInfo = user => {
    let token;
    token = localStorage.getItem("access_token");
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
  }

  handleFormSubmit = event => {
    const { post, date } = this.state;
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

  render() {
    if (!this.props.auth.isAuthenticated()) {
      alert(
        "Slow down! You have to log in first before you can access the GreenToad post area."
      );
      return <Redirect to="/" />;
    }
    const { classes } = this.props;
    return (
      <div>
        {withStyles}
        <Paper className={classes.paper} elevation={20}>
          <CheckIn />
          <Post
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
          <br />
          <Paper className={classes.posts} elevation={20}>
            <Grid container wrap="nowrap" spacing={16}>
              <Grid item xs>
                <Typography variant="h5" component="h3">
                  Current Location Updates:
                </Typography>
                <hr />

                <Paper className={classes.list} elevation={20}>
                  <List className={classes.postStyle} id="list">
                  <Modal
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                      open={this.state.showModal}
                    >
                      <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                          <h1>Your post has been added to Green Toad!</h1>
                          <span>
                            <img
                              className="mario"
                              src="https://3.bp.blogspot.com/-35XcSUkkKEw/WDZIEP8bteI/AAAAAAALaVk/rjrZxNa_nls4x_PxqjDJdtwonvdtlI_sQCLcB/s1600/AS002064_07.gif"
                            />
                          </span>
                        </Typography>

                        <SimpleModalWrapped />
                      </div>
                    </Modal>
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
                                    color="textPrimary"
                                  >
                                    {post.name}
                                  </Typography>
                                  - {post.post}
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

export default withStyles(styles)(Social);
