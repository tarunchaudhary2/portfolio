import React from 'react';

interface AWScloudlogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const AWScloudlogo: React.FC<AWScloudlogoProps> = ({ size = 80, label = 'AWS Cloud' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Icon */}
      <img
        src="/icons/AWS_Cloud.svg" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium">{label}</p>
    </div>
  );
};

export default AWScloudlogo;
