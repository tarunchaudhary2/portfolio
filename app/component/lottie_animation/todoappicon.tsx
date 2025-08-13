import React from 'react';

interface TodoappLogoProps {
  size?: number; // Optional prop for icon size
  label?: string; // Optional prop for custom label
}

const TodoappLogo: React.FC<TodoappLogoProps> = ({ size = 40}) => {
  return (
    <div>
      {/* Icon */}
      <img
        src="/icons/todo.png" // Public folder path
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default TodoappLogo;
