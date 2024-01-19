import React from 'react'
import './projects.css';
import Summarizer from '../../../../public/images/Summarizer.png';
import kanban from '../../../../public/images/Kanban.jpg';
import quiz from '../../../../public/images/quiz.jpg';
import blog from '../../../../public/images/blog.png'
import Image from 'next/image';
const proje = [
  {
    id: 4,
    img: blog,
    title: 'blog',
    github: 'https://github.com/Atharva0506/Blog-Platform',
    livedemo: 'https://blog-web-five-virid.vercel.app/',
  },
  {
    id: 1,
    img: kanban,
    title: 'Trackify',
    github: 'https://github.com/Atharva0506/Trackify',
    livedemo: 'https://trackify-atharva0506.vercel.app/',
  },
  {
    id: 2,
    img: quiz,
    title: 'AutoQuiz- AI based Quiz Generator',
    github: 'https://github.com/Atharva0506/AutoQuiz',
    livedemo: 'https://github.com/Atharva0506/AutoQuiz',
  },
  {
    id: 3,
    img: Summarizer,
    title: 'Summarizer',
    github: 'https://github.com/Atharva0506/Summarizer',
    livedemo: 'https://colab.research.google.com/github/Atharva0506/Summarizer/blob/main/books_sum.ipynb',
  },
];
function Projects() {
  return (
    <section id='Projects' className="fade-in">
      <h5>My recent Work</h5>
      <h2>Projects</h2>
      <div className="container projects_container">
      {
        proje.map(({id,img,title,github,livedemo})=>{
          return (
            <article key={id} className='projects_item'>
            <div className='projects_img'>
              <Image src={img} alt="Projects_img" />
            </div>
           
            <h3>{title}</h3>
            <div className='projects_item-cta'>
              <a href={github} className='btn' target='_blank'>GitHub</a>
              <a href={livedemo} className='btn btn-primary' target='_blank'>Live Demo</a>
            </div>
          </article>
          )
        })
      }

      </div>
    </section>
  )
}

export default Projects