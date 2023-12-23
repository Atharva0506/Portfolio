"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../../../../public/images/home-main.svg";
import "./hero.css";

function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  

  const words = ["Web Developer", "Software Developer|", "Data Scientist"];
  useEffect(() => {
    const typeDelay = 200;
    const deleteDelay = 50;
    const waitDelay = 2000;

    const type = async () => {
      if (charIndex < words[textIndex].length) {
        setCharIndex((prev) => prev + 1);
      } else {
        setIsDeleting(true);
        await new Promise((resolve) => setTimeout(resolve, waitDelay));
      }
    };

    const deleteChars = () => {
      if (charIndex > 0) {
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % words.length);
      }
    };

    const mainLoop = () => {
      if (isDeleting) {
        deleteChars();
      } else {
        type();
      }
    };

    const intervalId = setInterval(mainLoop, isDeleting ? deleteDelay : typeDelay);

    return () => clearInterval(intervalId);
  }, [charIndex, isDeleting, textIndex,words]);

  return (
    <section id="Home" >
      <div className="container hero__container">
        <div className="hero_info">
          <h2>
            Hi There! <span className="wave">👋🏻</span>
          </h2>
          <h1>
            <span>I{"'"}M</span> AHARVA NAIK
          </h1>
          <h1 className="hybrid">
            <span>{words[textIndex].substring(0, charIndex)}</span>
          </h1>
        </div>
        <div className="hero__me">
          <Image src={img} className="img"  alt="Home Image" />
        </div>
      </div>
    </section>
  );
}

export default Hero;


