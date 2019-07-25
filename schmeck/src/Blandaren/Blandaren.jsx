import React, { Component } from "react";
import Frack from "../Frack";

class Blandaren extends Component {
  //Check if the user is admin, if --> they can upload and delete
  state = {
    Blandaren: []
  };

  componentDidMount() {
    Frack.Blandaren.GetAll().then((res) => {
      this.setState({Blandaren: res.data});
    }).catch((errer) => {
      Frack.Logout();
      this.props.history.push('/login');
    });
  }

  render() {
    console.log(this.state.Blandaren)
    return (
      <div className="page">
        <h1 className="view_header">Bländaren</h1>

        {this.state.Blandaren.map((file) => {
            return (<div key={file.id} className="document-container">
              <div className="document-blandare">
                {/*för att funka: `http://localhost:5000/static/blandaren/${file.filename}/static/blandaren/${file.filename}`*/}
                <a href={`http://localhost:5000/static/blandaren/${file.filename}`}><img src={`/static/blandaren/${file.thumbnail}`} className="image-hover" alt="bländaren"/></a> 
                <div className="document-text-container" ><h2 className="title">{file.title}</h2></div>
              </div>
            </div>)
        })}


      </div>
    );
  }
}

export default Blandaren;