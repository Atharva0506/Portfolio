import React from 'react'
import Header from './components/header/header.jsx';
import Nav from './components/nav/nav.jsx';
import About from './components/about/about.jsx';
import Experience from './components/experience/experience.jsx';
import Services from './components/services/services.jsx';
import Portfolio from './components/portfolio/portfolio.jsx';
import Testimonial from './components/testimonials/testimonials.jsx';
import Contact from './components/contact/contact.jsx';
import Footer from './components/footer/footer.jsx';
const App = () => {
  return (
    <>
    <Header />
    <Nav/>
    <About />
    <Experience />
    <Services />
    <Portfolio />
    <Testimonial />
    <Contact />
    <Footer />


    </>
  )
}

export default App