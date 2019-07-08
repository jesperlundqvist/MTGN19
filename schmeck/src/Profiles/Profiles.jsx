import React, { Component } from "react";
import ProfileButton from "./ProfileButton";
import Frack from './../Frack'

class Profiles extends Component {
  state = {};

  profiles = [{name: "hej", url: ""},
  {name: "hej1", url: ""},
  {name: "hej2", url: ""},
  {name: "hej3", url: ""},
  {name: "hej4", url: ""},
  {name: "hej5", url: ""}
]


  render() {
    console.log(Frack.CurrentUser);

    return (
      <div className="profiles-contaner">
        {this.profiles.map((profile, i) => {
          return (<ProfileButton className="profiles-button" key={i} userName={profile.name} userImg={profile.url}></ProfileButton>)
        })}
      </div>
    );
  }
}

export default Profiles;