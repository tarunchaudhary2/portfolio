"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Image from 'next/image';
import { sectionPadding } from '../styles/styles';
import { images } from '@/public/images';

const experiences = [
  {
    role: 'DevOps Engineer',
    company: 'NaturNest AI',
    date: 'Sep 2025 – Present',
    icon: images.naturNest,
    points: [
      'Design and implement CI/CD pipelines for application deployment and automation',
      'Manage cloud infrastructure and containerized applications using Kubernetes and Docker',
      'Automate infrastructure provisioning using Infrastructure as Code tools',
      'Monitor and optimize application performance and system reliability',
      'Regularly deploy applications on baremetal servers using Kubernetes and Docker, leveraging CI/CD pipelines to build applications and publish artifacts to Azure Blob Storage, then execute automated Bash scripts within the CD pipeline to orchestrate deployments.',
    ],
  },
  {
    role: 'Engineer - Cloud & Infra Services',
    company: 'LTIMindtree',
    date: 'Jun 2023 – Sep 2025',
    icon: images.wema,
    points: [
      'Utilized Azure DevOps and Git for version control and collaborative workflows, designing and implementing automated CI/CD pipelines with Infrastructure as Code tools like Terraform and AWS CloudFormation to streamline cloud provisioning.',
      'Managed deployment and orchestration of scalable applications using AWS cloud services, Docker containers, and Kubernetes (EKS) to enhance reliability and scalability.',
      'Developed automation scripts with PowerShell and Bash to support pipeline testing, deployment automation, and integration with monitoring solutions such as Prometheus, Grafana, and AWS CloudWatch for system health insights.',
      'Administered Linux environments, managing build artifacts, and ensuring secure, resilient infrastructure and application delivery.',
    ],
  },
];

const Experience = () => {
  return (
    <section id='experience' className={`${sectionPadding} relative bg-black py-14`}>
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Work Experience</h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 w-1 h-full bg-purple-600 transform -translate-x-1/2 z-0" />

        <div className="space-y-20">
          {experiences.map((exp, i) => {
            const initials = exp.company
              .split(' ')
              .map(word => word[0])
              .join('')
              .substring(0, 2)
              .toUpperCase();

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative z-10"
              >
                {/* Icon in the center */}
                <div className="absolute left-1/2 -top-7 transform -translate-x-1/2 z-20">
                  <div className="w-14 h-14 bg-[#fff] rounded-full flex items-center justify-center shadow-lg border border-purple-500">
                    {exp.icon ? (
                      <Image src={exp.icon} alt={exp.company} width={50} height={50} />
                    ) : (
                      <span className="text-lg font-bold text-purple-600">{initials}</span>
                    )}
                  </div>
                </div>

                {/* Experience Card */}
                <div className="bg-[#1c1e3a] rounded-2xl pt-14 shadow-lg p-6 border border-purple-500 mx-4 text-left backdrop-blur-sm">
                  <div className="px-4">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">{exp.role}</h3>
                    <h4 className="md:text-lg mb-1 text-white">{exp.company}</h4>
                    <span className="text-sm text-gray-400">{exp.date}</span>
                    <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-gray-300">
                      {exp.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;