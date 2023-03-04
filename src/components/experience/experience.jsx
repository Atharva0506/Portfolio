import React from 'react'
import './experience.css';
import { BsPatchCheckFill } from 'react-icons/bs';
function experience() {
  return (
    <section id='experience'>

      <h5>What Skill I have</h5>
      <h2>My Experience</h2>
      <div className="container experience__container">
        <div className=" container__webdev">
          <h3>Web Development</h3>
          <div className="experience_content">
          <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>HTML</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>
            <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>CSS</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>
            <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>JavaScript</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>
            <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>Bootstrap</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>
            <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>React</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>
            <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>AngularJs</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>
          </div>
        </div>

        {/* End of webdevelopment */}
        <div className=" container__dev">
          <h3>Backend</h3>
          <div className="experience_webdev">

            <div className="experience_content">
            <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>MySql</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>
            <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>DBMS/RDBMS</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>
            <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>C/C++</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>
            <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>Python</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>
            <article className="experience_details">
              <BsPatchCheckFill className='icon' />
              <div>
                <h4>NodeJS</h4>
                <small className='text-light'>Experienced</small>
                </div>
            </article>


            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default experience;