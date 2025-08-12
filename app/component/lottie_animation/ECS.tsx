import React from 'react';

interface ECSAnimationProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const ECSAnimation: React.FC<ECSAnimationProps> = ({ size = 70, label = 'ECS' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full pt-3">
      {/* Icon */}
      <img  
        src="/icons/ECS.png" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pt-3 pl-1">{label}</p>
    </div>
  );
};

export default ECSAnimation;
