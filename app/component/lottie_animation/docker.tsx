import React from 'react';

interface DockerLogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const DockerLogo: React.FC<DockerLogoProps> = ({ size = 80, label = 'Docker' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full">
      {/* Icon */}
      <img
        src="/icons/docker.svg" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pr-5">{label}</p>
    </div>
  );
};

export default DockerLogo;
