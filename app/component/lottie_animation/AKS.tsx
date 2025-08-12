import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AKSAnimation = ({ size = 80 }) => {
  return (
    <div className="flex flex-col items-center gap-2 pt-2">
      {/* Logo Animation */}
      <DotLottieReact
        src="https://lottie.host/268a0394-1a44-4b72-a311-9ac02e00bef4/yLshlOYrKi.lottie"
        loop
        autoplay
        style={{ width: size, height: size }} // Controlled by prop
      />

      {/* Label */}
      <p className="text-white font-medium">AKS</p>
    </div>
  );
};

export default AKSAnimation;
