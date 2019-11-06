import React from 'react'
import Header from './header'
import Footer from './footer'

export default (props) => {
  return (
    <div className="main">
      <Header getOtp={props.getOtp} />
      <div id="page" className="clearfix">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};