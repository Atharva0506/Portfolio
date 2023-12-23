"use client"
import React, { useState } from "react";
import "./nav.css";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GoProject } from "react-icons/go";
import { MdConnectWithoutContact } from "react-icons/md";

const navItems = [
  { id: "Home", icon: <AiOutlineHome /> },
  { id: "About", icon: <AiOutlineUser /> },
  { id: "Skill", icon: <BiBook /> },
  { id: "Projects", icon: <GoProject /> },
  { id: "Contact", icon: <MdConnectWithoutContact /> },
];

function Nav() {
  const [activeNav, setActiveNav] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <input
        type="checkbox"
        id="menu-toggle"
        className="checkbox"
        checked={isMenuOpen}
        onChange={() => setIsMenuOpen(!isMenuOpen)}
      />
      <label htmlFor="menu-toggle" className="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
        <div className="logo">{"<AN/>"}</div>

        <div className="links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                setActiveNav(item.id);
                setIsMenuOpen(false);
              }}
              className={activeNav === item.id ? "active" : ""}
            >
              <span>{item.icon}</span>
              <span>{item.id}</span>
            </a>
          ))}
        </div>

        <div className={`social`}>
          <a href="https://github.com/Atharva0506">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/atharva-naik-527b74255/">
            <FaLinkedin />
          </a>
          <a href="mailto:atharvan.coder@gmail.com">
            <SiGmail />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
