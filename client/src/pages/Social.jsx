import React, { Component } from "react";
import CheckIn from "../components/CheckIn/CheckIn";
import Post from "../components/Post/Post";
import ViewPosts from "../components/ViewPosts/ViewPosts";
import "../App.css";

class Social extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    return (
      <div>
        User Posts Page Components Workspace:
        <br />
        <CheckIn />
        <Post />
        <ViewPosts />
      </div>
    ) 
  }
}

export default Social;
