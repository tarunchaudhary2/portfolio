import React from 'react';

interface ReactLogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const ReactLogo: React.FC<ReactLogoProps> = ({ size = 70, label = 'React Js' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full pt-1">
      {/* Icon */}
      <img  
        src="/icons/react.png" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pt-3 pl-1">{label}</p>
    </div>
  );
};

export default ReactLogo;
