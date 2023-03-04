import React from 'react'
import {BsLinkedin} from 'react-icons/bs';
import {FaGithub} from 'react-icons/fa';
import {FaQuora} from 'react-icons/fa';
function social() {
  return (
<div className="header_socials">
    <a href="https://www.linkedin.com/in/atharva-naik-527b74255" target="_blank"><BsLinkedin/></a>
    <a href="https://github.com/Atharva0506" target="_blank" ><FaGithub/></a>
    <a href="https://www.quora.com/profile/Atharva-Naik-115" target="_blank"><FaQuora/></a>
</div>
  )
}

export default social