import React from 'react'
import './portfolio.css';
import img1 from '../../assets/portfolio1.jpg';
import img2 from '../../assets/portfolio2.jpg';
import img3 from '../../assets/portfolio3.jpg';
import img4 from '../../assets/portfolio4.jpg';
import img5 from '../../assets/portfolio5.png';
import img6 from '../../assets/portfolio6.jpg';
const proje = [
  {
    id: 1,
    img: img1,
    title: 'Project 1',
    github: 'https://github.com',
    livedemo: 'xy',
  },
  {
    id: 2,
    img: img2,
    title: 'Project 1',
    github: 'https://github.com',
    livedemo: 'xy',
  },
  {
    id: 3,
    img: img3,
    title: 'Project 1',
    github: 'https://github.com',
    livedemo: 'xy',
  },
  {
    id: 4,
    img: img4,
    title: 'Project 1',
    github: 'https://github.com',
    livedemo: 'xy',
  },
  {
    id: 5,
    img: img5,
    title: 'Project 1',
    github: 'https://github.com',
    livedemo: 'xy',
  },
  {
    id: 6,
    img: img6,
    title: 'Project 1',
    github: 'https://github.com',
    livedemo: 'xy',
  },
];
function portfolio() {
  return (
    <section id='portfolio'>
      <h5>My recent Work</h5>
      <h2>Portfolio</h2>
      <div className="container portfolio_container">
      {
        proje.map(({id,img,title,github,livedemo})=>{
          return (
            <article key={id} className='portfolio_item'>
            <div className='portfolio_img'>
              <img src={img} alt="portfolio_img" />
            </div>
           
            <h3>{title}</h3>
            <div className='portfolio_item-cta'>
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

export default portfolio