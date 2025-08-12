import React from 'react'
import { Linkedin, AtSign, Twitter, Instagram, Facebook, Dribbble, Github } from 'lucide-react'
// import { Instagram, AtSign, Linkedin, Dribbble, Github } from 'lucide-react';
import Logo from '../logo/logoImg'
import { sectionPadding } from '../styles/styles'

const Footer = () => {
  return (
    <footer className={`${sectionPadding} bg-black border-t border-gray-800 py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo />

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a 
              href="mailto:imtarunchaudhary2@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="AtSign"
            >
              <AtSign size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/imtarunchaudhary2/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://github.com/tarunchaudhary2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="http://3.111.170.116:3000/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="Dribble"
            >
              <Dribbble size={20} />
            </a>
            </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Tarun Chaudhary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer