import React from 'react'
import './contact.css';
import { MdOutlineEmail } from 'react-icons/md';
import  { useRef } from 'react';
import emailjs from 'emailjs-com';
function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ovhfrk7', 'template_xvcdaub', form.current, 'EwLdACDaE_PKnN4TW')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <section id='contact'>
      <h5>Get In touch</h5>
      <h2>Contact me</h2>

      <div className="container  contact_container">
        <div className="contact_options">
          <article className='contact_option'>
            <MdOutlineEmail className='contact-icon'/>
            <h4>Email</h4>
            <h5>demo@gmail.com</h5>
            <a href="mailto:demo@gmail.com ">Send Msg</a>
          </article>
          <article className='contact_option'>
            <MdOutlineEmail className='contact-icon'/>
            <h4>Email</h4>
            <h5>demo@gmail.com</h5>
            <a href="mailto:demo@gmail.com ">Send Msg</a>
          </article>
          <article className='contact_option'>
            <MdOutlineEmail className='contact-icon'/>
            <h4>Whatsapp</h4>
            <h5>+91 9527909539</h5>
            <a href="https://api.whatsapp.com/send?phone=+919527909539">Send Msg</a>
          </article>
        </div>
        {/* End of Contact option  */}
        <div className='contact_form'>
            <form ref={form} onSubmit={sendEmail}>
              <input type="text" name='name' placeholder='Enter Your Name' required/>
              <input type="email" name="email" placeholder='Enter Your Email' required/>
              <textarea name="msg" rows='7' placeholder='Enter Message'></textarea>
              <input type="submit" value="Send Message" className='btn btn-primary' />
            </form>
        </div>
      </div>
    </section>
  )
}

export default Contact