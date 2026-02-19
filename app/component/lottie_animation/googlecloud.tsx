import React from 'react';

interface GoogleCloudlogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const GoogleCloudlogo: React.FC<GoogleCloudlogoProps> = ({ size = 80, label = 'Google Cloud' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Icon */}
      <img
        src="/icons/google-cloud.png" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium">{label}</p>
    </div>
  );
};

export default GoogleCloudlogo;
