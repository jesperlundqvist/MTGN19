import React, { Component } from 'react';

class Login extends Component {
    state = {  }

    clickHndeler = (e) => {
        
    }

    render() { 
        return ( 
        <div className="loginBG">
            <div className="loginBox">
                <form onSubmit={this.clickHndeler} >
                    <h1>Mottagningen</h1>
                    <label>Username:<br></br>> </label>
                    <input type="text"/> <br></br>
                    <label>Password:<br></br>> </label> 
                    <input type="password"/><br></br>
                    <input type="submit" title="login"/>
                </form>
            </div>
        </div>
        );
    }
}
 
export default Login;