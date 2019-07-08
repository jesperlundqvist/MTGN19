import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  //Check if the user is admin, if --> they can upload and delete??? should this be here?
  state = {};
  render() {
    return (
      <div>
        <h1 className="view_header">Home</h1>
        <div>
          <h3 className="subtitle">Vad har du på hjärtat lådan</h3> 
          {//För att ändra styling på underrubtikerna ändra styling i filen Home.css vid .subtitle
          }
          {/*Här skulle det kunna vara en länk till ett google formulär där n0llan 
            kan skriva feedback om det har något på hjärtat*/
          }
        </div>
        <div>
          <h3 className="subtitle">Nyheter</h3>
          {//Senaste nyheter som lagts upp?
          }
        </div>
        <div>
          <h3 className="subtitle">Nästa event</h3>
          {//Skulle kunna ha kommande händelse i schemat?
          }
        </div>
      </div>
    );
  }
}

export default Home;