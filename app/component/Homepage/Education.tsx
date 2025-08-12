"use client";
import React, { useEffect, useRef } from "react";
import {
  Book,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import {
  motion,
  useAnimation,
  useInView,
  Variants
} from "framer-motion";

const Education = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const educationData = [
    {
      type: "education",
      icon: <Book className="text-purple-400" size={24} />,
      title: "GLA University, Mathura, Uttar Pradesh",
      subtitle: "Bachelor of Computer Applications",
      period: "2020 - 2023",
      bgColor: "bg-gray-800/50",
      borderColor: "border-purple-600/30",
      certLink:
        "https://drive.google.com/file/d/1ZxiK77zV56SS9hUhjXsP5SeuDmF9MswY/view?usp=sharing"
    },
    {
      type: "certification",
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: "Java Programming by Great Learning",
      subtitle: "Certificate of completion of Java Programing",
      bgColor: "bg-gray-800/50",
      borderColor: "border-purple-600/30",
      certLink:
        "https://drive.google.com/file/d/1iC_7BLc-rgG6NM9_15zzEHasq_xgEbpx/view?usp=sharing"
    },
    // ... rest of your data unchanged
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'Full Stack development using Java',
      subtitle: 'ShapeMySkills E-Certificate',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://drive.google.com/file/d/1yjQO_jlpnFKhwyfHC-xZquRRowp3NXxg/view?usp=sharing"
    },
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'Javascript & React Bootcamp',
      subtitle: 'Shape AI certification for Javascript and React bootcamp',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://drive.google.com/file/d/1pAO_TQwMCqzuh7OsP1i7L7CwawXk33El/view?usp=sharing"
    },
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'Javascript & React Bootcamp by Developer student clubs',
      subtitle: 'Developer student club certification for Javascript and React bootcamp',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://drive.google.com/file/d/1SOfSwEsBeTQDM_Np2XL3zrCVbJKMAy7m/view?usp=sharing"
    },
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'Javascript & React Bootcamp by GDG Ranchi',
      subtitle: 'Certificate of completion of Java Programing',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://drive.google.com/file/d/1NJ-N3_voy9_sobLuhOacY5SRAM9aQHzK/view?usp=sharing"
    },
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'My SQL Basics by Great Learning',
      subtitle: 'Certificate of SQL Basics by Great Learning',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://drive.google.com/file/d/1svONmkUsouRTr7poScx2BavvlE8z3xjT/view?usp=sharing"
    },
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'Web Designing by ShapeMySkills',
      subtitle: 'ShapeMySkills E-Certification for Web Designing',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://drive.google.com/file/d/1kNSqGGRuRqKhHUWij7o_5KzfB2qWUNZn/view?usp=sharing"
    },
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'Develop a company website with wix',
      subtitle: 'Company website development with wix by Coursera',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://drive.google.com/file/d/1loPKN4EPRUDrmckBJ_7QiNRW5IJuGF0M/view?usp=sharing"
    },
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'Java (Basic)',
      subtitle: 'Java Basic by HackerRank',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://www.hackerrank.com/certificates/12db183b236b"
    },
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'Problem Solving (Basic)',
      subtitle: 'Problem Solving Basic by HackerRank',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://www.hackerrank.com/certificates/f646bb091922"
    },
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'Problem Solving (Basic)',
      subtitle: 'Problem Solving Basic by HackerRank',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://www.hackerrank.com/certificates/f646bb091922"
    },
    {
      type: 'certification',
      icon: <ShieldCheck className="text-purple-400" size={24} />,
      title: 'SQL (Basic)',
      subtitle: 'SQL Basic by HackerRank',
      bgColor: 'bg-gray-800/50',
      borderColor: 'border-purple-600/30',
      certLink: "https://www.hackerrank.com/certificates/04fc73f05297"
    },
  ];

  const CardContent = ({ item }: { item: any }) => (
    <div className="flex items-start">
      <div className="mr-4 mt-1">{item.icon}</div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        <p className="text-gray-300 mt-1">{item.subtitle}</p>
        {item.period && (
          <p className="text-sm text-gray-400 mt-2">{item.period}</p>
        )}
        <div className="mt-3 flex justify-between items-center">
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
              item.type === "education"
                ? "bg-purple-600/20 text-purple-300"
                : "bg-purple-600/20 text-purple-300"
            }`}
          >
            {item.type === "education" ? "Degree" : "Certificate"}
          </span>

          {item.certLink && (
            <div className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center transition-colors">
              View Certificate <ExternalLink size={16} className="ml-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <div className="bg-black py-16 px-4" ref={ref} id="education">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
            >
              {item.certLink ? (
                <a
                  href={item.certLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-6 rounded-xl backdrop-blur-sm border ${item.borderColor} ${item.bgColor} hover:border-purple-600/60 hover:shadow-lg hover:shadow-purple-600/10 transition-all duration-300`}
                >
                  <CardContent item={item} />
                </a>
              ) : (
                <div
                  className={`p-6 rounded-xl backdrop-blur-sm border ${item.borderColor} ${item.bgColor} hover:border-purple-600/60 hover:shadow-lg hover:shadow-purple-600/10 transition-all duration-300`}
                >
                  <CardContent item={item} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
