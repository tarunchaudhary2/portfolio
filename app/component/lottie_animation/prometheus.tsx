import React from 'react';

interface PrometheusLogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const PrometheusLogo: React.FC<PrometheusLogoProps> = ({ size = 70, label = 'Prometheus' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full">
      {/* Icon */}
      <img
        src="/icons/prometheus.svg" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium pt-3 pl-1">{label}</p>
    </div>
  );
};

export default PrometheusLogo;
