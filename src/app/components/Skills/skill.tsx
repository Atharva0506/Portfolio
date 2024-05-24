import React from 'react';
import './skill.css';
import { FaHtml5,FaCss3Alt ,FaNode,FaReact,FaDocker ,FaAws  ,FaGithub    } from "react-icons/fa";
import { BiLogoTypescript,BiLogoJavascript,BiLogoTailwindCss  } from "react-icons/bi";
import { SiMysql ,SiMongodb,SiNextdotjs  } from "react-icons/si";
import { DiTerminal,DiPython,DiPostgresql   } from "react-icons/di";
function Skills() {
  const webDevSkills = [
    { name: 'HTML', level: 'skilled', icon: <FaHtml5 /> },
    { name: 'CSS', level: 'skilled', icon: <FaCss3Alt   /> },
    { name: 'JavaScript', level: 'skilled', icon: <BiLogoJavascript /> },
    { name: 'TypeScript', level: 'skilled', icon: <BiLogoTypescript /> },
    { name: 'Tailwind css', level: 'skilled', icon: <BiLogoTailwindCss  /> },
    { name: 'React', level: 'skilled', icon: <FaReact /> },
    { name: 'Next JS', level: 'skilled', icon: <SiNextdotjs /> },
  ];

  const backendSkills = [
    { name: 'MySql', level: 'skilled', icon: <SiMysql /> }, 
    { name: 'Mongodb', level: 'skilled', icon: <SiMongodb  /> },
    { name: 'PostgreSQL', level: 'skilled', icon: <DiPostgresql  /> },
    { name: 'C/C++', level: 'skilled', icon: <DiTerminal /> },
    { name: 'NodeJS', level: 'skilled', icon: <FaNode  /> },
    { name: 'Python', level: 'skilled', icon: <DiPython  /> },
    { name: 'Git/Github', level: 'skilled', icon: <FaGithub  /> },
    { name: 'Docker', level: 'skilled', icon: <FaDocker  /> },
    { name: 'Aws', level: 'skilled', icon: <FaAws  /> },
  ];

  const renderSkills = (skills:any) => {
    return skills.map((skill:any, index:any) => (
      <article className="skills_details" key={index}>
         {React.cloneElement(skill.icon, { className: 'icon' })}
        <div>
          <h4>{skill.name}</h4>
          <small className='text-light'>{skill.level}</small>
        </div>
      </article>
    ));
  };

  return (
    <section id='Skill' className="fade-in">
      <h5>What Skill I have</h5>
      <h2>My skills</h2>
      <div className="container skills__container">
        <div className="container__webdev">
          <h3>Web Development</h3>
          <div className="skills_content">
            {renderSkills(webDevSkills)}
          </div>
        </div>

        <div className="container__dev">
          <h3>Other Skills</h3>
          <div className="skills_webdev">
            <div className="skills_content">
              {renderSkills(backendSkills)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
