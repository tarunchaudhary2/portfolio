"use client";

import { images } from "@/public/images";
import { Download } from "lucide-react";
import Image from "next/image";
import { sectionPadding } from "../styles/styles";
import { motion } from "framer-motion";

type Props = {};

function AboutSection({}: Props) {
  return (
    <div id="about" className="bg-black text-white min-h-screen flex flex-col py-20">
      <div className={`${sectionPadding} py-22`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8 items-start bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto rounded-lg overflow-hidden"
          >
            <Image
              src={images.home}
              alt="Tarun Chaudhary"
              className="w-full transition-transform duration-700 hover:scale-110"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full md:w-2/3"
          >
            <h2 className="text-3xl font-bold mb-1">About Me</h2>
            <p className="text-purple-600 text-sm mb-6">
              Engineer - Cloud & Infra services
            </p>

            <div className="space-y-4">
              <p className="text-gray-300">
                Cloud & Infrastructure Engineer with 2+ years of professional experience in designing, deploying, and managing scalable cloud solutions and DevOps pipelines. Skilled in leveraging Azure DevOps, AWS Cloud, Terraform, Docker, and Kubernetes to automate infrastructure, streamline deployments, and ensure high availability.
              </p>
              <p className="text-gray-300">
                Proficient in CI/CD pipeline creation, containerized application deployment, and infrastructure orchestration using tools like PowerShell, Bash, and Python. Experienced in monitoring and optimizing applications with Prometheus, Grafana, and AWS CloudWatch, ensuring performance, reliability, and security.
              </p>
              <p className="text-gray-300">
                Adept at version control and collaborative workflows with Git and GitHub Actions, delivering projects that reduce deployment time, improve scalability, and align with business goals. Passionate about automation and cloud innovation, I continuously seek to enhance efficiency and bring value through modern DevOps practices.
              </p>
              <button 
              onClick={() => window.open('https://drive.google.com/file/d/1iq4fjfXkO2wiBHPIAUHu19bTKX2JVNT6/view?usp=sharing', '_blank')}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md flex items-center gap-2 transition-colors">
                <Download size={18} />
                Download CV
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

type SkillIconProps = {
  icon: React.ReactNode;
  label: string;
};

function SkillIcon({ icon, label }: SkillIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 5 }}
      className="flex flex-col items-center transition-transform duration-300 animate-rotateY3D"
    >
      <div className="text-purple-600 text-4xl">{icon}</div>
      <span className="text-purple-600 mt-2 text-sm">{label}</span>
    </motion.div>
  );
}

export default AboutSection;
