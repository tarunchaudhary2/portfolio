import React from 'react';

interface PowershellAnimationProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const PowershellAnimation: React.FC<PowershellAnimationProps> = ({ size = 80, label = 'Bash' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full">
      {/* Icon */}
      <img
        src="/icons/PowerShell.png" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pt-4 pr-2">{label}</p>
    </div>
  );
};

export default PowershellAnimation;
