import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const GitHubAnimation = ({ size = 80 }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Logo Animation */}
      <DotLottieReact
        src="https://lottie.host/86b2d18e-b5eb-4a6b-8515-6a7687d8b3cf/DGkEL5KkrP.lottie"
        loop
        autoplay
        style={{ width: size, height: size }} // Controlled by prop
      />

      {/* Label */} 
      <p className="text-white font-medium pl-1">GitHub</p>
    </div>
  );
};

export default GitHubAnimation;
