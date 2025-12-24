import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;
  return (
    <div className="flex items-center gap-2">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${color} `} />
      ))}

      {halfStars === 1 && <FaStarHalfAlt className={`text-${color} `} />}

      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar key={index} className={`text-${color} `} />
      ))}

      <span className={`rating-text p-2 text-${color}`}> {text && text}</span>
    </div>
  );
};

export default Rating;
