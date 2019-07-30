import React, { Component } from "react";
import "./Home.css";
import Frack from "../Frack";
import Media from "../Media/MediaImg"

class Home extends Component {
  //Check if the user is admin, if --> they can upload and delete??? should this be here?
  state = {newNews: [], newImg: []};

  componentDidMount() {
    Frack.News.GetAll().then((res) => {
      console.log(res)
      this.setState({newNews: res.data})
    }).catch((errer) => {
      Frack.Logout();
      this.props.history.push('/login');
    });
    Frack.Media.GetAll().then((res) => {
      console.log(res)
      this.setState({newImg: res.data})
    });
  }

  mediaClick = () => {
    this.props.history.push('/media/');
  }

  render() {
    let news = this.state.newNews[0];
    let newImg = this.state.newImg.slice(this.state.newImg.length-5 ,this.state.newImg.length-1);
    newImg.reverse()
    return (
      <div className="page">
        <h1 className="view_header">Home</h1>
        <div>
          <h3 className="subtitle">Vad har du på hjärtat lådan</h3> 
          <button>Vad har du på hjärtat lådan</button>
          {//För att ändra styling på underrubtikerna ändra styling i filen Home.css vid .subtitle
          }
          {/*Här skulle det kunna vara en länk till ett google formulär där n0llan 
            kan skriva feedback om det har något på hjärtat*/
          }
        </div>
        <div>
          <h3 className="subtitle">Nästa event</h3>
          {//Skulle kunna ha kommande händelse i schemat?
          }
        </div>
        <div>
          <h3 className="subtitle">Nyheter</h3>
          {/*Senaste nyheter som lagts upp?*/}
          {(this.state.newNews.length !== 0) ?
          <div className="news-contaner"> 
            <h2 className="news-heder"> {news.headline} </h2>
            <div className="news-text" dangerouslySetInnerHTML={{ __html: news.text }} /> 
          </div> : null}
          <h3 className="subtitle">Nya bilder</h3>
          <div className='media-grid'>
            { newImg.map((media, i) => {
              return <Media key={i} media={media} index={i} onClickHandeler={this.mediaClick}></Media>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;