import React from 'react'
import Profile from './Profile'
import Services from './Services'
import Skills from './Skills'
import AboutSection from './AboutSection'
import Experience from './Experience'
import Projects from './Projects'
import Education from './Education'
import Contact from './Contact'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div>
        <Profile/>
        <AboutSection/>
        <Services/>
        <Skills/>
        <Experience/>
        <Projects />
        <Education/>
        <Contact />
    </div>
  )
}

export default HomePage
