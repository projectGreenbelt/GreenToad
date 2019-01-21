import React, { Component } from "react";
import CheckIn from "../components/CheckIn/CheckIn";
import Post from "../components/Post/Post";
import ViewPosts from "../components/ViewPosts/ViewPosts";
import "../App.css";
import API from "../utils/API";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { List, ListItem } from "../components/PostsList/PostsList";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    flexGrow: 1,
    overflow: "hidden"
  },
  paper: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 300,
    minwidth: 275
  },
  list: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 400,
    minwidth: 275,
    height: 600
  }
});
class Social extends Component {
  state = {
    otherPosts: [],
    post: "",
    // emailInput: "", //set name of input taking in email to name='emailInput'
    date: Date.now()
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
  }
  handleFormSubmit = event => {
    // event.preventDefault();
    const { post, date } = this.state;
    API.savePost({
      post,
      date
    })
      .then(res => alert(`Your post has been added to Green Toad.`))
      .catch(err => console.log(err));
  };
  getPosts = props => {
    API.getPosts()
      .then(res => this.setState({ otherPosts: res.data }))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        User Posts Page Components Workspace:
        <br />
        <CheckIn />
        <Post
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <Paper className={styles.paper} elevation={20}>
          <Grid container wrap="nowrap" spacing={16}>
            <Grid item xs>
              <Typography variant="h5" component="h3">
                Current Location Updates:
              </Typography>
              <hr />
              <Paper className={styles.list} elevation={20}>
                <List>
                  {this.state.otherPosts.map(post => {
                    return <ListItem key={post._id}>{post.post}</ListItem>;
                  })}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default Social;
