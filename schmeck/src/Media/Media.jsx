import React, { Component } from "react";
import CheckBox from "./CheckBox";
import './Media.css'

class Media extends Component {
  //Check if the user is admin, if --> they can upload and delete
  state = {
    checkbox: [{text:"hej", check:false},
    {text:"hej2", check:false},
    {text:"hej3", check:false},
    {text:"hej4", check:false}]
  };

  checkboxHandler = (index) => {
    let checkbox = this.state.checkbox;
    checkbox[index].check = !checkbox[index].check
    this.setState({checkbox: checkbox})
  }

  render() {
    return (
      <div className="page">
        <h1 className="view_header">Media</h1>
        <div className="checkbox-contaner">
        {this.state.checkbox.map((box, i) => {
          return( <CheckBox key={i} index={i} text={box.text} check={box.check} clickHandeler={this.checkboxHandler}></CheckBox>)
        })}
        </div>
      </div>
    );
  }
}

export default Media;