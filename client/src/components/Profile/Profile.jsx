import React, { Component } from "react";
import { Panel, ControlLabel, Glyphicon } from "react-bootstrap";
import { Redirect } from "react-router-dom";
// import "./Profile.css";

class Profile extends Component {
  state = {
    profile: {}
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
    } //else {
    //this.setState({ profile: userProfile });
    //}
  }
  //With arrow functions as opposed to standard functions, the context of 'this' points to Profile instead of the getUserInfo function.

  //class Profile calls getUserInfo- with standard function, 'this' is associated with getUserInfo. with Arrow function, 'this' is bound to the object that called it OR it's bound to the window if it's not called by a function.
  //With react, you always want to have access to the state of the component (object), which is why arrow functions are so prevalent.
  render() {
    if (!this.props.auth.isAuthenticated()) {
      alert("you gotta log in, bro");
      return <Redirect to="/home" />;
    }
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel>
                <Glyphicon glyph="user" /> Nickname
              </ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
