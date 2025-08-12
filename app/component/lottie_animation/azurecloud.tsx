import React from 'react';

interface AzurecloudlogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const Azurecloudlogo: React.FC<AzurecloudlogoProps> = ({ size = 80, label = 'AWS Cloud' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Icon */}
      <img
        src="/icons/Azure_Cloud.svg" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium">{label}</p>
    </div>
  );
};

export default Azurecloudlogo;
