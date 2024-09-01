import React from 'react';
import { useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import { useRef } from 'react';
import { genAI } from '../utils/openai';
import { addGptMovieResult } from '../utils/gptSlice';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=true&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchText = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const result = await model.generateContent(prompt);
    const response = result.response;
    const gptMovies = response.text().split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(addGptMovieResult({ moviesNames: gptMovies, moviesResults: tmdbResults }));
  };

  return (
    <div className="pt-16 md:pt-24 lg:pt-32 px-4 flex justify-center items-center">
      <form
        className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl bg-opacity-70 bg-gray-900 backdrop-blur-lg p-6 rounded-lg flex items-center space-x-4 shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="flex-grow p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200 ease-in-out"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="py-3 px-6 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-800 hover:scale-105 transform transition-all duration-300 ease-in-out"
          onClick={handleGptSearchText}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
