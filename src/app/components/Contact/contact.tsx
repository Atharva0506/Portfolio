"use client";
import "./contact.css";
import React, { useEffect } from "react";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { Toaster ,toast} from "react-hot-toast";
function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const submit = async (e: any) => {
    try {
      e.preventDefault();
      const rep = await axios.post("/api/form", formData);
      console.log(rep.data);
      toast(rep.data.message,
  {
    icon: '😊',
    style: {
      borderRadius: '10px',
      background: '#4db5ff',
      color: '#fff',
    },
  }
);
    } catch (error: any) {
      console.log("failed!: " + error.message);
      toast(error.message,
      {
        icon: '😐',
        style: {
          borderRadius: '10px',
          background: '#4db5ff',
          color: '#fff',
        },
      }
    );
    }
  };

  useEffect(() => {
    if (
      formData.name.length > 0 &&
      formData.email.length > 0 &&
      formData.message.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);
  return (
    <section id="Contact" className="fade-in">
      <Toaster position="bottom-center" reverseOrder={false} />
      <h5>Get In touch</h5>
      <h2>Contact me</h2>

      <div className="container  contact_container">
        <div className="contact_options">
          <article className="contact_option">
            <MdOutlineEmail className="contact-icon" />
            <h4>Email</h4>
            <h5>atharvan.coder@gmail.com</h5>
            <a href="mailto:atharvan.coder@gmail.com">Send Msg</a>
          </article>
          <article className="contact_option">
            <BsLinkedin className="contact-icon" />
            <h4>Linkdin</h4>
            <a href="https://www.linkedin.com/in/atharva-naik-527b74255/">
              Send Msg
            </a>
          </article>
          <article className="contact_option">
            <FaWhatsapp className="contact-icon" />
            <h4>Whatsapp</h4>
            <h5>+91 9527909539</h5>
            <a href="https://api.whatsapp.com/send?phone=+919527909539">
              Send Msg
            </a>
          </article>
        </div>
        <div className="contact_form">
          <form >
          <div className="form">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={7}
              placeholder="Enter Message"
            ></textarea>
            <input
              type="submit"
              value={buttonDisabled ? "Somthing Is Missing" : "Send Message"}
              className="btn btn-primary"
              onClick={submit}
            />
          </div>
        </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
