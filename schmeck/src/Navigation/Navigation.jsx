import React, { Component } from "react";
//import { Link, Redirect } from "react-router-dom";
import "./Navigation.css";

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

  onClickHndler = url => {
    this.props.history.push(url);
    this.setState({ navOpen: false });
  };

  onOpenHndler = (state) => {
    this.setState({ navOpen: state});
  };

  createButton = () => {
    if (this.state.navOpen === false) {
      return <button className='navButton' onClick={() => this.onOpenHndler(true)}>≡</button>;
    }
    return <button className='navButton' onClick={() => this.onOpenHndler(false)}>×</button>;
  };

  createNavigation = () => {
    if (this.state.navOpen === true) {
      return (
        <div className='navigationBar'>
          <div className='profil'></div>
          {this.Links.map((l, i) => {
            let linkClass = "linkClosed link";
            if (l.url === this.props.location.pathname)
              linkClass = "linkOpen link";
            return (
              <button
                key={i}
                className={linkClass}
                onClick={() => this.onClickHndler(l.url)}>
                <p>{l.text}</p>
              </button>
            );
          })}
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
