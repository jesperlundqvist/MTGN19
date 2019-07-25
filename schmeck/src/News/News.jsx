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

  render() {
    console.log(this.state.news)
    return (
      <div className="page">
        <h1 className="view_header">News</h1>
        {this.state.news.map((n, i) => {
          return (
            <div key={i} className="news-contaner">
              <h2 className="news-heder"> {n.headline} </h2>
              <div className="news-text" dangerouslySetInnerHTML={{ __html: n.text }} />
            </div>
          )
        })}
      </div>
    );
  }
}

export default News;