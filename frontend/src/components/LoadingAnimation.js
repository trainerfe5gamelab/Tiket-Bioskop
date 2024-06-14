import React from "react";
import "./LoadingAnimation.css"; // Import the CSS file for the animation styling
import loadingImage from "../image/loading/loading.gif"; // Replace with the path to your loading image

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <img src={loadingImage} alt="Loading..." className="loading-image" />
    </div>
  );
};

export default LoadingAnimation;
