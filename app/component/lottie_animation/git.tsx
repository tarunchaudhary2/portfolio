import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const GitAnimation = ({ size = 80 }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Logo Animation */}
      <DotLottieReact
        src="https://lottie.host/5131a134-0894-4ca0-8ad6-eda12e4ec7a2/F1rBYOKCT3.lottie"
        loop
        autoplay
        style={{ width: size, height: size }} // Controlled by prop
      />

      {/* Label */}
      <p className="text-white font-medium">GitBash</p>
    </div>
  );
};

export default GitAnimation;
