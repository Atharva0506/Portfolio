import React from 'react'
import './testimonials.css';
import avt1 from '../../assets/avatar1.jpg';
import avt2 from '../../assets/avatar2.jpg';
import avt3 from '../../assets/avatar3.jpg';
import avt4 from '../../assets/avatar4.jpg';
// import Swiper core and required modules
import {  Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const data = [
  {
    id: 1,
    img: avt1,
    name: 'Project 1',
    desc :'      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam autem est deleniti corporis voluptatibus atque error, suscipit praesentium illo fuga facilis pariatur vero itaque, porro odit alias consectetur cupiditate quas? ',
  },
  {
    id: 2,
    img: avt2,
    name: 'Project 1',
    desc :'      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam autem est deleniti corporis voluptatibus atque error, suscipit praesentium illo fuga facilis pariatur vero itaque, porro odit alias consectetur cupiditate quas? ',
  },
  {
    id: 3,
    img: avt3,
    name: 'Project 1',
    desc :'      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam autem est deleniti corporis voluptatibus atque error, suscipit praesentium illo fuga facilis pariatur vero itaque, porro odit alias consectetur cupiditate quas? ',
  },
  {
    id: 4,
    img: avt4,
    name: 'Project 1',
    desc :'      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam autem est deleniti corporis voluptatibus atque error, suscipit praesentium illo fuga facilis pariatur vero itaque, porro odit alias consectetur cupiditate quas? ',
  },
  
];
function testimonials() {
  return (
    <section>

      <h5>Review from clients</h5>
      <h2>testimonials</h2>
      <Swiper className="container testimonials_container"
      // install Swiper modules
      modules={[ Pagination]}
      spaceBetween={40}
      slidesPerView={1}
      pagination={{ clickable: true }}
  >

{
  data.map(({id,img,name,desc})=>{
    return(
      <SwiperSlide key={id} className='testimonials'>
      <div className="avatar">
        <img src={img} alt={name} />
      </div>
      <h5 className='name'>{name}</h5>
      <small className='review'>{desc}</small>
    </SwiperSlide>
    )
  })
}
  
      </Swiper>
    </section>
  )
}

export default testimonials
