import React from 'react';

interface GKSlogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const GKSlogo: React.FC<GKSlogoProps> = ({ size = 80, label = 'GKS' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Icon */}
      <img
        src="/icons/GKS.png" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium">{label}</p>
    </div>
  );
};

export default GKSlogo;
