
import React, { Component } from "react";
import { css } from '@emotion/core';
import { RingLoader} from 'react-spinners';

class Loader extends Component {
    
constructor(props) {
    super(props)
}

    render() {
      const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
  `;
  
      return (
        <div className='sweet-loading'>
        <RingLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'goldenrod'}
          loading={this.props.loading}
        />
      </div> 
      );
    }
  }
  
  export default Loader;