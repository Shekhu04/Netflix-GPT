import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black min-h-screen overflow-auto">
        <div className="pt-4 md:pt-8 lg:pt-12 px-4 md:px-8 lg:px-12">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Movies</h1>
          
          <div className="space-y-8">
            <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
            <MovieList title="Popular" movies={movies.popularMovies} />
            <MovieList title="Upcoming Movies" movies={movies.UpcomingMovies} />
            <MovieList title="Top Rated" movies={movies.topRatedMovies} />
          </div>
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
