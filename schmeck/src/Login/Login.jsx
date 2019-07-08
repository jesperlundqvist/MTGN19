import React, { Component } from "react";
import Frack from "./../Frack";
import "./Login.css";

class Login extends Component {
  state = { isLogdin: false };

  clickHndeler = event => {
    event.preventDefault();
    console.log(event.target.password.value);
    Frack.Login(event.target.username.value, event.target.password.value).then(
      res => {
        sessionStorage.authToken = res.data.token;
        return Frack.UpdateCurrentUser();
      }
    );
    console.log(Frack.HasToken());
    if (Frack.HasToken()) {
      this.accessGranted("/");
    }
  };

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  accessGranted = async url => {
    this.setState({ isLogdin: true });
    await this.sleep(1000);
    this.props.history.push(url);
  };

  createContent = () => {
    if (this.state.isLogdin === false) {
      return (
        <form onSubmit={this.clickHndeler}>
          <h1>Mottagningen</h1>
          <label>
            Username:
            <br />
          </label>
          <input name='username' type='text' autoComplete='off'/> <br />
          <label>
            Password:
            <br />
          </label>
          <input name='password' type='password' />
          <br />
          <input type='submit' title='login' />
        </form>
      );
    }
    return <h1>Access Granted</h1>;
  };

  render() {
    return (
      <div className='login-bg'>
        <div className='login-box'>{this.createContent()}</div>/>
      </div>
    );
  }
}

export default Login;
