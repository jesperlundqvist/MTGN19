import React, { Component } from "react";
import "./Home.css";
import Frack from "../Frack";
import Media from "../Media/MediaImg";
import Loader from "../loader"

class Home extends Component {
  //Check if the user is admin, if --> they can upload and delete??? should this be here?
  state = { newNews: [], newImg: [], hjarta_link: "https://forms.gle/oxUD276qkeENk3gr7", loading: true };

  componentDidMount() {
    Frack.News.GetAll().then((res) => {
      this.setState({ newNews: res.data })
      Frack.Media.GetAll().then((res) => {
        this.setState({ newImg: res.data, loading: false })
      });
    }).catch((errer) => {
      Frack.Logout();
      this.props.history.push('/login');
    });

    Frack.UpdateCurrentUser().then(() => {
      console.log(Frack.CurrentUser.type.name)
      if (Frack.CurrentUser.type.name != "nØllan") {
        this.setState({ hjarta_link: "https://docs.google.com/forms/d/e/1FAIpQLSeSi5hqEQuxtJ-3cn2sfTC0aQVcNXEMsG-NppbNswRPsMQwMQ/viewform" })
      }
    })


  }

  mediaClick = () => {
    this.props.history.push('/media/');
  }

  render() {
    let news = this.state.newNews[0];
    let newImg = this.state.newImg;
    if (newImg.length > 4) {
      newImg = this.state.newImg.slice(this.state.newImg.length - 4, this.state.newImg.length);
    }
    console.log(newImg)
    newImg.reverse()
    return (
      <div className="page">

        {(this.state.loading ? <Loader loading={true} /> :
          <div>
            <div className="hjarta_lada">
            <a className='footer-linck' href={this.state.hjarta_link} >
              <img className="bubbel" src="https://cdn1.iconfinder.com/data/icons/glyph-communication-responsive-icons/128/5.Filled_128px_Love-512.png" height="70px" alt="Hjartat_lada" /></a>
            <p style={{ color: "white", textAlign: "center" }}>Vad har du på hjärtat lådan</p>
          </div>



          <div>

            {/*Senaste nyheten som lagts upp*/}
            {(this.state.newNews.length !== 0) ?
              <div >
                <h3 className="subtitle">Nyheter</h3>
                <div className="news-contaner">
                  <h2 className="news-heder"> {news.headline} </h2>
                  <div className="news-text" dangerouslySetInnerHTML={{ __html: news.text }} />
                </div></div> : null}
            {(this.state.newImg.length !== 0) ?
              <h3 className="subtitle">Nya bilder</h3> : null}
            <div className='media-grid'>
              {newImg.map((media, i) => {
                return (<Media key={i} media={media} index={i} onClickHandeler={this.mediaClick}></Media>)
              })}
            </div>
          </div></div>)}

      </div>
    );
  }
}

export default Home;