import React, { useState } from "react";

// https://codepen.io/saleh-mubashar/pen/poZprej

const NiceMovingPicture = () => {
  const [mousePosition, setMousePosition] = useState({ x: -40, y: -95 });

  const picture = {
    url: "https://i.imgur.com/4oO1Qke.png",
    width: 815,
    height: 581,
  };

  const divWidth = 500;
  const divHeight = 300;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: -e.nativeEvent.offsetX * divWidth / picture.width,
      y: -e.nativeEvent.offsetY * divHeight / picture.height,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="max-w-full"
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: `${divWidth}px`,
        height: `${divHeight}px`,
        backgroundImage: `url(${picture.url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${mousePosition.x}px ${mousePosition.y}px`,
      }}
    />
  );
};

export default NiceMovingPicture;
