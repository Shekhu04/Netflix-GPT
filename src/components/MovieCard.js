import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        alt="Movie Card"
        className="w-full h-auto rounded-lg shadow-md hover:shadow-lg object-cover"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};
export default MovieCard;
