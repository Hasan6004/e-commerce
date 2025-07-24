"use client";

import { useState, useEffect } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

const Slider = ({ children: images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  };

  const handleJump = (i) => {
    setCurrentIndex(i);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((child, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            {child}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          className="rounded-full bg-white/80 p-1 hover:bg-white"
          onClick={handlePrev}
        >
          <GrPrevious className="cursor-pointer w-[20px]" />
        </button>
        <button
          className="rounded-full bg-white/80 p-1 hover:bg-white"
          onClick={handleNext}
        >
          <GrNext className="cursor-pointer w-[20px]" />
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-opacity cursor-pointer ${
              i === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => handleJump(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
