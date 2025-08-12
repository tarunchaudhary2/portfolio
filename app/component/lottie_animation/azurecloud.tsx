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
        src="/icons/azurecloud.png" // Public folder path
        alt={label}
        style={{ width: 200, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pt-5">{label}</p>
    </div>
  );
};

export default Azurecloudlogo;
