import React from 'react';

interface TodoappLogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const TodoappLogo: React.FC<TodoappLogoProps> = ({ size = 80}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Icon */}
      <img
        src="/icons/todo.png" // Public folder path
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default TodoappLogo;
