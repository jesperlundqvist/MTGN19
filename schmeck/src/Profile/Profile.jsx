import React, { Component } from "react";
import "./Profile.css";

class Profile extends Component {
  state = {};
  render() {
    return (
      <div className='profile-page'>
        <div className='profile-contaner'>
          <div className='profile-box'>
            <div className='profile-top-img'>
                <img src="https://media.istockphoto.com/vectors/top-secret-rubber-stamp-vector-id503618658" alt=""/>
                <img className='profile-img' src="https://github.com/3mil95/MTGN19/blob/master/static/images/profiles/default.png?raw=true" alt=""/>
            </div>
            <h4>Namn</h4>

            <h4>grupp</h4>

            <h4>Om</h4>
            
            <h4>Fråga 1</h4>

            <h4>Fråga 2</h4>

            <h4>Fråga 3</h4>

          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
