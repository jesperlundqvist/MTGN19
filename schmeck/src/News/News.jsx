import React, { Component } from "react";
import Frack from './../Frack';
import './News.css';

class News extends Component {
  //Check if the user is admin, if --> they can upload and delete
  state = { news: []};

  componentDidMount = () => {
    Frack.News.GetAll().then((res) => {
      this.setState({news: res.data})
    }).catch((errer) => {
      Frack.Logout();
      this.props.history.push('/login');
    });
  }


  createNews(n, i) {
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric' };
    //const timestamp = ;
    var timestamp = new Date(Date.parse(n.timestamp));
    timestamp = timestamp.toLocaleDateString('sv-SV', options);
    console.log(timestamp)
    
    return (
      <div key={i} className="news-contaner">
        <h2 className="news-heder typewriter-font"> {n.headline} </h2>
        <h5 className="typewriter-font">{timestamp}</h5>
        <h5 className="typewriter-font">Av: {n.author.type.name}-{n.author.name}</h5>
        <div className="news-text typewriter-font" dangerouslySetInnerHTML={{ __html: n.text }} />
      </div>
    )
  }

  render() {
    console.log(this.state.news)
    

    return (
      <div className="page">
        <h1 className="view_header">News</h1>
        {this.state.news.map((n, i) => (
          this.createNews(n,i)
        ))}
      </div>
    );
  }
}

export default News;