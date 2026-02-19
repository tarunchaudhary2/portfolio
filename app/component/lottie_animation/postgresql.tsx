import React from 'react';

interface PostgreSQLlogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const PostgreSQLlogo: React.FC<PostgreSQLlogoProps> = ({ size = 80, label = 'PostgreSQL' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Icon */}
      <img
        src="/icons/postgresql.png" // Public folder path
        alt={label}
        style={{ width: size, height: size }}
      />

      {/* Label */}
      <p className="text-white font-medium">{label}</p>
    </div>
  );
};

export default PostgreSQLlogo;
