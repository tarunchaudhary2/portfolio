import React from 'react';

interface JenkinslogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const Jenkinslogo: React.FC<JenkinslogoProps> = ({ size = 80, label = 'Jenkins' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full">
      {/* Icon */}
      <img
        src="/icons/jenkins.svg" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pr-6">{label}</p>
    </div>
  );
};

export default Jenkinslogo;
