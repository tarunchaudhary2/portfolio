import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SQLAnimation = ({ size = 80 }) => {
  return (
    <div className="flex flex-col items-center gap-2 pt-2">
      {/* Logo Animation */}
      <DotLottieReact
        src="https://lottie.host/44ef44c7-91c4-452e-bb2a-9a6291f77c26/qxvwISZfi5.lottie"
        loop
        autoplay
        style={{ width: size, height: size }} // Controlled by prop
      />

      {/* Label */}
      <p className="text-white font-medium pr-2">SQL</p>
    </div>
  );
};

export default SQLAnimation;
