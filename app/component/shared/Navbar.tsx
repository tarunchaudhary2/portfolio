"use client"

import { useState, useEffect } from "react"
import { sectionPadding } from "../styles/styles"
import Logo from "../logo/logoImg"

type Props = {}

const Navbar = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false); // Close mobile menu if open

    const element = document.getElementById(sectionId);
    console.log("Attempting to scroll to:", sectionId, element); // Debug log

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.warn(`Element with ID "${sectionId}" not found`);
    }
  };


  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "skills", "about", "experience", "projects", "Certifications"]
      const scrollPosition = window.scrollY

      // If at the very top of the page, set home as active
      if (scrollPosition < 100) {
        setActiveSection("home")
        return
      }

      // Otherwise check which section is in view
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [theme, setTheme] = useState("dark")
  
  return (
    <nav className={`fixed top-4 left-0 right-0 mx-auto z-50 ${sectionPadding} transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between backdrop-blur-lg bg-black/40 border border-white/10 rounded-xl p-4 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-purple-500/10' : ''}`}>
        {/* Logo */}
        <button title="Home" onClick={() => scrollToSection("home")} className="flex items-center">
          <Logo />
        </button>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-5">
          <button
            onClick={() => scrollToSection("home")}
            className={`${activeSection === "home" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"} cursor-pointer transition-colors px-3 py-1 rounded-lg hover:bg-white/5`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`${activeSection === "about" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"} cursor-pointer transition-colors px-3 py-1 rounded-lg hover:bg-white/5`}
          >
            About me
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className={`${activeSection === "services" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"} cursor-pointer transition-colors px-3 py-1 rounded-lg hover:bg-white/5`}
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className={`${activeSection === "Skills" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"} cursor-pointer transition-colors px-3 py-1 rounded-lg hover:bg-white/5`}
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className={`${activeSection === "experience" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"} cursor-pointer transition-colors px-3 py-1 rounded-lg hover:bg-white/5`}
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className={`${activeSection === "projects" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"} cursor-pointer transition-colors px-3 py-1 rounded-lg hover:bg-white/5`}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("education")}
            className={`${activeSection === "education" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"} cursor-pointer transition-colors px-3 py-1 rounded-lg hover:bg-white/5`}
          >
            Certifications
          </button>
        </div>

        {/* Hire Me Button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-purple-500/20"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 backdrop-blur-lg bg-black/80 border border-white/10 rounded-xl z-50 md:hidden p-4 flex flex-col space-y-2 mt-2">
            <button
              onClick={() => scrollToSection("home")}
              className={`${activeSection === "home" ? "text-purple-400 bg-white/5" : "text-gray-300"} text-left px-4 py-2 rounded-lg transition-colors`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`${activeSection === "about" ? "text-purple-400 bg-white/5" : "text-gray-300"} text-left px-4 py-2 rounded-lg transition-colors`}
            >
              About me
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`${activeSection === "services" ? "text-purple-400 bg-white/5" : "text-gray-300"} text-left px-4 py-2 rounded-lg transition-colors`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`${activeSection === "Skills" ? "text-purple-400 bg-white/5" : "text-gray-300"} text-left px-4 py-2 rounded-lg transition-colors`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className={`${activeSection === "experience" ? "text-purple-400 bg-white/5" : "text-gray-300"} text-left px-4 py-2 rounded-lg transition-colors`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`${activeSection === "projects" ? "text-purple-400 bg-white/5" : "text-gray-300"} text-left px-4 py-2 rounded-lg transition-colors`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("education")}
              className={`${activeSection === "education" ? "text-purple-400 bg-white/5" : "text-gray-300"} text-left px-4 py-2 rounded-lg transition-colors`}
            >
              Certifications
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-2"
            >
              Hire Me
            </button>
          </div>  
        )}
      </div>
    </nav>
  )
}
export default Navbar