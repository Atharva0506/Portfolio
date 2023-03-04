import React from 'react'
import './header.css';
import CTA from './cta.jsx';
import img from '../../assets/me.png';
import Header from './social.jsx';
function header() {
  return (
   <header>
    <div className="container header__container">
      <h5>Heloo I'm</h5 >
      <h1>Atharva Naik </h1>
      <h5 className="text-light">FUllstack Devloper</h5>
      <CTA />
      <Header/>
      <div className="me">
        <img src={img} alt="My Profile Pic" />
      </div>
      <a href="#contact" className="scroll_down">Scroll Down</a>
    </div>
   </header>
  )
}

export default header