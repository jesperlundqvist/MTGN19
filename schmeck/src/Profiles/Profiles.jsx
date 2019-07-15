import React, { Component } from "react";
import ProfileButton from "./ProfileButton";
import Frack from "./../Frack";
import "./Profiles.css";

class Profiles extends Component {
  state = { profiles: [], types: [], n0llegroup: [] };

  componentDidMount() {
    Frack.User.GetAll().then(res => {
      console.log(res);
      this.setState({ profiles: res.data });
    });
    Frack.UserType.GetAll().then(res => {
      this.setState({ types: res.data });
    });
    Frack.N0lleGroup.GetAll().then(res => {
      this.setState({ n0llegroup: res.data });
    });
  }

  clickHandeler = url => {
    this.props.history.push(`/profiler/${url}`);
  };

  showUser = (userType, group) => (
    <React.Fragment key={userType}>
      <h1 className='group-divider'>{userType}</h1>
      {this.state.profiles.map((profile, i) => {
        if (this.isUserShown(userType, group, profile)) {
          return (
            <ProfileButton
              key={profile.id}
              name={profile.name}
              userName={profile.username}
              userImg={profile.profile_picture}
              clickHandeler={this.clickHandeler}
            />
          );
        }
        return null;
      })}
    </React.Fragment>
  );

  isUserShown = (userType, group, profile) => {
    if (profile.hidden === true) {
      return false;
    }
    if (group === null && profile.type.name === userType) {
      return true;
    }
    if (group === "nØllan" && profile.n0llegroup) {
      if (group === "nØllan" && profile.n0llegroup.name === userType) {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <div className='page'>
        <h1 className='view_header'>Profiles</h1>
        <div className='profiles-contaner'>
          {this.state.n0llegroup.map(element => {
            return this.showUser(element.name, "nØllan");
          })}
          {this.state.types.map(element => {
            if (element.name !== "nØllan") {
              return this.showUser(element.name, null);
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

export default Profiles;
