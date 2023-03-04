import React from 'react'
import './about.css';
import img  from '../../assets/me-about.jpg';
import {FaAward} from 'react-icons/fa';
import {FiUsers} from 'react-icons/fi';
import {VscFolderLibrary} from 'react-icons/vsc';

const about = () => {
  return (
    <section id='about'>
      <h5>Get to know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <img src={img} alt="about me" />
        </div>
        <div className="about__content">
          <div className="about__cards">
          <article className='about__card'>
            <FaAward className='about__icon' />
            <h5>experiance</h5>
            <small>1+ year</small>
          </article>
          <article className='about__card'>
            <FiUsers className='about__icon' />
            <h5>Clients</h5>
            <small>1+ year</small>
          </article>
          <article className='about__card'>
            <VscFolderLibrary className='about__icon' />
            <h5>experiance</h5>
            <small>1+ year</small>
          </article>

          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non odit tempora harum, eveniet ut aliquid ab ipsum autem nisi repudiandae libero officia vitae pariatur dolore? Quas obcaecati iusto sunt officiis?
          </p>
          <a href="#contact" className='btn btn-primary'>Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default about