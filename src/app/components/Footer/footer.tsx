import React from 'react'
import './footer.css';
import {BsLinkedin} from 'react-icons/bs';
import {FaGithub} from 'react-icons/fa';
import {FaQuora} from 'react-icons/fa';
function footer() {
  return (
  <footer className="fade-in">
    <a href="#" className='footer_logo'>ATHARVA NAIK</a>
    <ul className='permalinks'>
      <li><a href="#">Home</a></li>
      <li><a href="#About">About</a></li>
      <li><a href="#Projects">Projects</a></li>
      <li><a href="#Contact">Contact</a></li>
    </ul>

    <div className='footer_socials'>
    <a href="https://www.linkedin.com/in/atharva-naik-527b74255" target="_blank" ><BsLinkedin/></a>
    <a href="https://github.com/Atharva0506" target="_blank" ><FaGithub/></a>
    <a href="https://www.quora.com/profile/Atharva-Naik-115" target="_blank"><FaQuora/></a>
    </div>
    <div className="footer_copyright">
      <small>
        &copy; Atharva Naik All Right Reserved;
      </small>
    </div>
     </footer>
    )
}

export default footer