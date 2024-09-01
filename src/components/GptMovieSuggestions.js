import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { moviesResults, moviesNames } = useSelector((store) => store.gpt);
  if (!moviesNames) return null;

  return (
    <div className="p-6 m-6 bg-black text-white bg-opacity-20 rounded-lg shadow-lg no-scrollbar">
      <div className="space-y-6">
        {moviesNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={moviesResults[index]}
          />
        ))}
      </div>
    </div>
  );
};
export default GptMovieSuggestions;
