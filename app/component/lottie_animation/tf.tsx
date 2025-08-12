import React from 'react';

interface TerraformLogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const TerraformLogo: React.FC<TerraformLogoProps> = ({ size = 80, label = 'Terraform' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full">
      {/* Icon */}
      <img
        src="/icons/terraform.png" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pt-2 pl-2">{label}</p>
    </div>
  );
};

export default TerraformLogo;
