"use client";
import React, { useState } from "react";
import { sectionPadding } from "../styles/styles";
import { motion } from "framer-motion";

import GitAnimation from "../lottie_animation/git";
import Jenkinslogo from "../lottie_animation/jenkins";
import AWScloudlogo from "../lottie_animation/awscloud";
import AKSAnimation from "../lottie_animation/AKS";
import EKSAnimation from "../lottie_animation/EKS";
import SQLAnimation from "../lottie_animation/SQL";
import GitHubAnimation from "../lottie_animation/github";
import DockerLogo from "../lottie_animation/docker";
import ECSAnimation from "../lottie_animation/ECS"; 
import KubernetesLogo from "../lottie_animation/kubernetes";
import TerraformLogo from "../lottie_animation/tf";
import PowershellAnimation from "../lottie_animation/powershell";
import BashLogo from "../lottie_animation/bash";
import { AnimatePresence } from "framer-motion";
import Azurecloudlogo from "../lottie_animation/azurecloud";
import AWSCloudwatchLogo from "../lottie_animation/awscloudwatch";
import GrafanaLogo from "../lottie_animation/Grafana";
import PrometheusLogo from "../lottie_animation/prometheus";
import MongoDBLogo from "../lottie_animation/mongodb";
import PythonLogo from "../lottie_animation/python";
import ReactLogo from "../lottie_animation/react";
import NodeLogo from "../lottie_animation/node";

type ServiceProps = {
  icon: React.ReactNode;
  title: string;
  category: string;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // All skills & tools with categories
  const skillsData: ServiceProps[] = [
    { icon: <AWScloudlogo size={80} label="AWS Cloud" />, title: "AWS Cloud", category: "Cloud" },
    { icon: <Azurecloudlogo size={60} label="Azure Cloud" />, title: "Azure Cloud", category: "Cloud" },
    { icon: <Jenkinslogo size={80} label="Jenkins" />, title: "Jenkins", category: "CI/CD" },
    { icon: <GitAnimation size={80} />, title: "Git", category: "CI/CD" },
    { icon: <GitHubAnimation size={80} />, title: "GitHub", category: "CI/CD" },
    { icon: <TerraformLogo size={70} label="Terraform" />, title: "Terraform", category: "IaC" },
    { icon: <DockerLogo size={80} label="Docker"/>, title: "Docker", category: "Containerization" },
    { icon: <ECSAnimation size={70} />, title: "ECS", category: "Containerization" },
    { icon: <EKSAnimation size={70} />, title: "EKS", category: "Orchestration" },
    { icon: <AKSAnimation size={80} />, title: "AKS", category: "Orchestration" },
    { icon: <KubernetesLogo size={80} label="Kubernetes"/>, title: "Kubernetes", category: "Orchestration" },
    { icon: <PowershellAnimation size={70} label="Powershell"/>, title: "Powershell", category: "Scripting" },
    { icon: <BashLogo size={70} label="Bash"/>, title: "Bash", category: "Scripting" }, 
    { icon: <PythonLogo size={80} />, title: "Python", category: "Programming Languages" },
    { icon: <ReactLogo size={80} />, title: "React", category: "Programming Languages" },
    { icon: <NodeLogo size={80} />, title: "Node", category: "Programming Languages" },
    { icon: <SQLAnimation size={80} />, title: "SQL", category: "Databases" },
    { icon: <MongoDBLogo size={80} />, title: "MongoDB", category: "Databases" },
    { icon: <AWSCloudwatchLogo size={70} label="AWS CloudWatch"/>, title: "AWS CloudWatch", category: "Monitoring" },
    { icon: <PrometheusLogo size={70} label="Prometheus"/>, title: "Prometheus", category: "Monitoring" },
    { icon: <GrafanaLogo size={70} label="Grafana"/>, title: "Grafana", category: "Monitoring" },
  ];

  const categories = [
    "All",
    "Cloud",
    "CI/CD",
    "IaC",
    "Containerization",
    "Orchestration",
    "Scripting",
    "Programming Languages",
    "Databases",
    "Monitoring",    
  ];

  // Filter logic (case-insensitive)
  const filteredSkills =
    selectedCategory.toLowerCase() === "all"
      ? skillsData
      : skillsData.filter(
          (skill) => skill.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
        );

  return (
    <motion.div
      id="skills"
      className={`${sectionPadding} bg-gradient-to-br from-black via-gray-900 to-black text-white py-28`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }} 
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Skills</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Proficient in a broad range of cloud platforms, automation tools, programming languages, and monitoring solutions for end-to-end development.
          </p>
          </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === category
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-gray-500 text-gray-300 hover:bg-purple-500 hover:text-white"
              } transition`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 justify-items-center pt-10">
  <AnimatePresence mode="wait">
    {filteredSkills.length > 0 ? (
      filteredSkills.map((skill) => (
        <motion.div
          key={skill.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          {skill.icon}
          {/* <p className="mt-2 text-sm">{skill.title}</p> */}
        </motion.div>
      ))
    ) : (
      <motion.p
        key="empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="col-span-full text-gray-400"
      >
        No skills found.
      </motion.p>
    )}
  </AnimatePresence>
</div>
      </div>
    </motion.div>
  );
};

export default Skills;
