import React, { Component } from "react";
import './Footer.css'

class Footer extends Component {
  state = {};
  sponsors = [{url:"https://www.sverigesingenjorer.se/bli-medlem/?gclid=Cj0KCQjwjrvpBRC0ARIsAFrFuV8CwV8BuTUayh6t0L4EoZ2WLZT7SBK7QdFQyPmCdmAEkbO6JYQhLg8aAhK1EALw_wcB", img:"/static/images/sverigesingenjörer.png"},
  {url:"", img:"/static/images/mrg.png"},
  {url:"", img:"/static/images/comviq.png"},
  {url:"", img:"/static/images/dynabyte.png"}]

  render() {
    return (
      <div className='footer'>
      

        {this.sponsors.map((sponsor, i) => (
          <a key={i} className='footer-linck' href={sponsor.url}><img src={sponsor.img} height="40px" alt="sponsor"/></a>
        ))}
       
    </div>
    
    );
  }
}

export default Footer;