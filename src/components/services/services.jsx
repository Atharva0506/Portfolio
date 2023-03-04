import React from 'react'
import './services.css';
import {BiCheck} from 'react-icons/bi';
function services() {
  return (
    <section id='services'>
     <h5>What I offer</h5>
     <h2>Service</h2>
     <div className="container services_container">
      <article className='services'>
      <div className="services_head">
        <h3>UI/UX designs</h3>
        </div>
     
      <ul className='services_list'>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>
      </ul>
      </article>
      <article className='services'>
      <div className="services_head">
        <h3>UI/UX designs</h3>
        </div>
     
      <ul className='services_list'>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>

      </ul>
      </article>
      <article className='services'>
      <div className="services_head">
        <h3>UI/UX designs</h3>
        </div>
     
      <ul className='services_list'>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>
        <li>
          <BiCheck className='sevice_icon'/>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </li>

      </ul>
      </article>
     </div>
      </section>
  )
}

export default services