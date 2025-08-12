import React from 'react';

interface BashLogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const BashLogo: React.FC<BashLogoProps> = ({ size = 80, label = 'EKS' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full pt-3">
      {/* Icon */}
      <img
        src="/icons/EKS.webp" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pt-4 pr-1">{label}</p>
    </div>
  );
};

export default BashLogo;
