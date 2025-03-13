import { Star } from "lucide-react";

interface IRate {
  totalStars?: number;
  rating?: number;
}
const StarRating = ({ totalStars = 5, rating = 0 }: IRate) => {
  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <div key={index} className="relative">
            {/* Full Star */}
            <Star
              className="w-4 h-4 text-gray-300"
              stroke={starValue <= rating ? "gold" : "currentColor"}
              fill={starValue <= rating ? "gold" : "none"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
