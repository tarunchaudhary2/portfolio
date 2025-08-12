import React from 'react';

interface PythonLogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const PythonLogo: React.FC<PythonLogoProps> = ({ size = 70, label = 'Python' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full pt-1">
      {/* Icon */}
      <img  
        src="/icons/python.png" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pt-3 pl-1">{label}</p>
    </div>
  );
};

export default PythonLogo;
