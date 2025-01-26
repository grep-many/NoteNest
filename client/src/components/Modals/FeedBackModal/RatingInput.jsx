import React, { useState } from "react";
import clsx from "clsx";
import { Star } from "lucide-react";

const StarRating = ({ maxStars = 5, onChange, value = 0 }) => {
  const [hovered, setHovered] = useState(null);

  const handleClick = (rating) => {
    if (onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const isHovered = hovered !== null;
        const filled = isHovered ? starValue <= hovered : starValue <= value;

        return (
          <button
            key={index}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={clsx(
              "transition duration-200 p-1",
              "hover:text-yellow-500",
              filled ? "text-yellow-400" : "text-gray-400"
            )}
            aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            <Star size={20} fill={filled ? "currentColor" : "none"} />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
