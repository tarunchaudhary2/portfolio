"use client";
import React from 'react';
import { Server, Cloud, Database, Lock, Code, LineChart, Github, Dribbble } from 'lucide-react';
import { sectionPadding } from '../styles/styles';
import { motion } from 'framer-motion';
import Logo from '../logo/logoImg';
import TodoappLogo from '../lottie_animation/todoappicon';

type projectProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  githubLink?: string;
  dribbbleLink?: string;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProjectCard = ({ icon, title, description, image, githubLink, dribbbleLink }: projectProps) => {
  const isLoaded = true; // Replace with your actual loading state

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20 mx-auto flex flex-col justify-between"
    >
      <div>
        {/* Icon */}
        <div className="text-purple-600 mb-4">{icon}</div>

        {/* Image */}
        {image && (
          <div className="mb-4 overflow-hidden rounded-xl flex justify-center items-center">
            <img
              src={image}
              alt={title}
              className="w-full h-64 object-contain scale-90"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

        {/* Description */}
        <p className="text-gray-300 text-sm">{description}</p>
      </div>

      {/* Dynamic Anchor Buttons with Text */}
      <div className="flex flex-row gap-6 mt-4">
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer ${isLoaded ? 'animate-bounce' : 'opacity-0'}`}
            style={{ animationDuration: '2s', animationDelay: '600ms', animationIterationCount: 1 }}
          >
            <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-all duration-300 ">
              <Github size={16} />
            </span>
            GitHub 
          </a>
        )}
        {dribbbleLink && (
          <a
            href={dribbbleLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer ${isLoaded ? 'animate-bounce' : 'opacity-0'}`}
            style={{ animationDuration: '2s', animationDelay: '600ms', animationIterationCount: 1 }}
          >
            <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-all duration-300">
              <Dribbble size={16} />
            </span>
            Website
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      icon: <Logo />,
      title: "Portfolio",
      description:
        "Developed a personal portfolio website highlighting my Experience, Services, Skills, Projects and certifications. This website is developed with tailwind css with responsive design compatible with Desktop, tablets and Mobiles. The Website is hosted on vercel app which is a free hosting platform for a certain amount of time for portfolios websites.",
      image: "/images/portfolioss.png",
      githubLink: "https://github.com/tarunchaudhary2/portfolio",
      dribbbleLink: "http://3.111.170.116:3000/",
    },
    {
      icon: <TodoappLogo />,
      title: "Todo Application",
      description:
        "Todo Application with add, update and deletion of new or old items or tasks in the list. Simple and easy to use UI",
      image: "/images/todoappss.png",
      githubLink: "https://github.com/tarunchaudhary2/todoapp",
      dribbbleLink: "https://todoapp-nine-henna.vercel.app/",
    },
  ];

  return (
    <motion.div
      id="projects"
      className={`${sectionPadding} bg-gradient-to-br from-black via-gray-900 to-black text-white py-28`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="container relative px-4 max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">My Projects</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Tailored Cloud & DevOps solutions to streamline development, enhance scalability, and ensure secure, reliable deployments
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              icon={project.icon}
              title={project.title}
              description={project.description}
              image={project.image}
              githubLink={project.githubLink}
              dribbbleLink={project.dribbbleLink}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
