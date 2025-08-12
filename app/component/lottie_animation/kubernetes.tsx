import React from 'react';

interface KubernetesLogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const KubernetesLogo: React.FC<KubernetesLogoProps> = ({ size = 80, label = 'Kubernetes' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full">
      {/* Icon */}
      <img
        src="/icons/kubernetes.svg" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pt-3">{label}</p>
    </div>
  );
};

export default KubernetesLogo;
