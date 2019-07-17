import React, { Component } from "react";
import CheckBox from "./CheckBox";
import Frack from "./../Frack";
import "./Media.css";
import MediaImg from "./MediaImg";

class Media extends Component {
  //Check if the user is admin, if --> they can upload and delete
  state = {
    check: [
      [
        { text: 33, check: true },
        { text: 34, check: true },
        { text: 35, check: true },
        { text: 36, check: true }
      ],
      [],
      [
        { text: "Bild", engText: "image", check: true },
        { text: "Video", engText: "video", check: true }
      ]
    ],
    isOpen: false,
    medias: []
  };

  checkboxHandler = (index, type) => {
    let check = this.state.check;
    check[type][index].check = !check[type][index].check;
    this.setState({ check: check });
  };

  componentDidMount() {
    Frack.Event.GetAll().then(res => {
      //console.log(res);
      let check = this.state.check;
      let events = [];
      for (let i = 0; i < res.data.length; i++) {
        events.push({ text: res.data[i].name, check: true });
      }
      check[1] = events;
      this.setState({ check: check });
    });
    Frack.Media.GetAll().then(res => {
      console.log(res);
      this.setState({ medias: res.data });
    });
  }

  createCheckType = (index, type) => {
    return (
      <React.Fragment>
        <h4 className='type-checkbox-text'>{type}</h4>
        <div className='type-checkbox-contaner'>
          {this.state.check[index].map((box, i) => {
            return (
              <CheckBox
                key={i}
                type={index}
                index={i}
                text={box.text}
                check={box.check}
                clickHandeler={this.checkboxHandler}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  };

  showImg = img => {
    for (let i = 0; i < this.state.check.length; i++) {
      let show = false;
      for (let j = 0; j < this.state.check[i].length; j++) {
        if (i === 0) {
          if (this.state.check[i][j].check && this.state.check[i][j].text === img.week) {
            show = true;
          }
          console.log(
            show,
            this.state.check[i][j].text === img.week,
            this.state.check[i][j].text,
            img.week
          );
        } else if (i === 1) {
          if (this.state.check[i][j].check && this.state.check[i][j].text === img.event.name) {
            show = true;
          }
        } else if (i === 2) {
          if (this.state.check[i][j].check && this.state.check[i][j].engText === img.type) {
            show = true;
          }
          console.log(
            show,
            this.state.check[i][j].engText === img.type,
            this.state.check[i][j].engText,
            img.type
          );
        }
      }
      console.log(show);
      if (show === false) {
        return show;
      }
    }
    return true;
  };

  filterButtonHandeler = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    //console.log(this.state.check);
    return (
      <div className='page'>
        <div className='checkbox-contaner'>
          <h1 className='view_header'>Media</h1>
          <button className='media-button' onClick={this.filterButtonHandeler}>
            {(!this.state.isOpen) ? <h3>▼ Filter</h3> : <h3>▶ Filter</h3>}
          </button>
          {this.state.isOpen ? (
            <React.Fragment>
              {this.createCheckType(0, "Vecka:")}
              {this.createCheckType(1, "Event:")}
              {this.createCheckType(2, "Mediatyp:")}{" "}
            </React.Fragment>
          ) : null}
        </div>
        <div className='media-grid'>
          {this.state.medias.map((media, i) => {
            if (this.showImg(media)) {
              console.log(media, 'hej');
              return <MediaImg key={i} media={media} />;
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

export default Media;
