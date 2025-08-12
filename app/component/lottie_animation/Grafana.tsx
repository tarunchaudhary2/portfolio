import React from 'react';

interface GrafanaLogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const GrafanaLogo: React.FC<GrafanaLogoProps> = ({ size = 70, label = 'Prometheus' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full">
      {/* Icon */}
      <img  
        src="/icons/grafana.png" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pt-3 pl-1">{label}</p>
    </div>
  );
};

export default GrafanaLogo;
