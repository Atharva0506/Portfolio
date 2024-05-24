"use client"
import React from "react";
import "./about.css";
import Image from "next/image";
import img from "../../../../public/images/me.png";
import useMousePosition from "./useMousePosition";

const About = () => {
  const { x, y } = useMousePosition();

  // Calculate transform values based on mouse position
  const calcTransform = (x: number, y: number) => {
    const offsetX = (x - window.innerWidth / 2) / 20;
    const offsetY = (y - window.innerHeight / 2) / 20;
    return `rotateY(${offsetX}deg) rotateX(${-offsetY}deg)`;
  };

  return (
    <section id="About" className="fade-in">
      <h5>Get to know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me" style={{ transform: calcTransform(x, y) }}>
          <Image src={img} alt="about me" />
        </div>
        <div className="about__content">
          <h1>LET ME <span>INTRODUCE</span> MYSELF</h1>
          <p>
            As a fresh software developer, I{"'"}m passionate about web development,
            machine learning, and data science. I love working with teams that
            encourage learning and growth. My goal is to create user-friendly
            experiences and use data to make a meaningful impact. I enjoy taking on challenges, paying attention to details, and always pushing to
            learn new technology. <br />
          </p>
          <a href="#Contact" className="btn btn-primary">
            Lets Talk
          </a>
          <a href="/Atharva Naik CV.pdf" download="Atharva_Naik_CV.pdf" className="btn">
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
