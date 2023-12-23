import Navbar from "@/app/components/Navbar/navbar"
import Hero from "@/app/components/Hero/hero"
import About from "@/app/components/About/about"
import Skill from "@/app/components/Skills/skill"
import Projects from "@/app/components/Projects/projects"
import Contact from "@/app/components/Contact/contact"
import Footer from "@/app/components/Footer/footer"
export default function Home() {
  return (
   <main>
    
    <Navbar/>
    <Hero/>
    <About/>
    <Skill/>
    <Projects/>
    <Contact/>
    <Footer/>
  
   </main>
  )
}
