import React, { Component } from "react";
//import { Link, Redirect } from "react-router-dom";
import "./Navigation.css";
import Frack from './../Frack';


class Navigation extends Component {
  state = { navOpen: false };
  Links = [
    { url: "/", text: "Idag" },
    { url: "/nyheter/", text: "Nyheter" },
    { url: "/schema/", text: "Schema" },
    { url: "/profiler/", text: "Profiler" },
    { url: "/media/", text: "Media" },
    { url: "/blandaren/", text: "Bländaren" },
    { url: "/admin/", text: "Admin" }

  ];


  /*componentDidUpdate() {
    Frack.UpdateCurrentUser().catch((error) => {
      Frack.Logout();
      this.props.history.push(`/login`);
    });
  }*/

  onClickHndler = url => {
    this.props.history.push(url);
    this.setState({ navOpen: false });
  };

  onOpenHndler = (state) => {
    this.setState({ navOpen: state});
  };

  LogoutHndler = () => {
    Frack.Logout();
    this.onClickHndler('/login')
  }  

  createButton = () => {
    if (this.state.navOpen === false) {
      return <button className='navButton' onClick={() => this.onOpenHndler(true)}>≡</button>;
    }
    return <button className='navButton' onClick={() => this.onOpenHndler(false)}>×</button>;
  };

  getOrganisation = () => {
    if (Frack.CurrentUser.n0llegroup) {
      return ( Frack.CurrentUser.n0llegroup.name)
    }
    return ( Frack.CurrentUser.type.name)
  }

  createNavigation = () => {
    if (this.state.navOpen === true) {
      return (
        <div className='navigationBar'>
          <div className='navigation-profil'>
            {//Här ska "id kortet" vara med den inloggades profil
            }
            <h3 className="agent-title">SECRET AGENT</h3>
            <div className='navigation-profil-text'>
            <h6>Subject: </h6>
            <p>{Frack.CurrentUser.name}</p>
            <h6>Organisation: </h6>
            <p> {this.getOrganisation()}</p>
            </div>
            <img src={Frack.CurrentUser.profile_picture} alt=""/>
          </div>
          {this.Links.map((l, i) => {
            let linkClass = "linkClosed link";
            if (l.url === this.props.location.pathname)
              linkClass = "linkOpen link";
            if (Frack.CurrentUser.admin !== true && l.text === this.Links[this.Links.length-1].text) {
              return null;
            }
            return (
              <button
                key={i}
                className={linkClass}
                onClick={() => this.onClickHndler(l.url)}>
                <p className='link-text'>{l.text}</p>
              </button>
            );
          })}
          <button
                className="linkClosed link"
                onClick={() => this.LogoutHndler()}>
                <p className='link-text'>logga ut</p>
              </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div className='navigation'>
        {this.createNavigation()}
        {this.createButton()}
      </div>
    );
  }
}

export default Navigation;
