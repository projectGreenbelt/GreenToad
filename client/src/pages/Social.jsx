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
class Social extends Component {
  state = {
    otherPosts: [],
    post: "",
    // emailInput: "", //set name of input taking in email to name='emailInput'
    date: Date.now(),
    currentUser: {}
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
  //handleEmailChange
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    this.getPosts();
    this.getUserInfo();
  }
  handleFormSubmit = event => {
    const { post, date } = this.state;
    let userName = this.state.currentUser.nickname;
    API.savePost({
      post,
      date,
      userName
    })
      .then(res => alert(`Your post has been added to Green Toad.`))
      .then(window.location.reload())
      .catch(err => console.log(err));
  };
  getPosts = props => {
    API.getPosts()
      .then(res => this.setState({ otherPosts: res.data }))
      .catch(err => console.log(err));
    console.log(this.props);
  };

  render() {
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
                    {this.state.otherPosts.map(post => {
                      return (
                        <Typography>
                          <ListItem key={post._id} alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar src={this.state.currentUser.picture} />
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
                                    {this.state.currentUser.nickname}
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

export default withStyles(styles)(Social);
