import { BGIMAGE } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
    
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src={BGIMAGE}
          alt="background"
        />
      </div>

      {/* Content Wrapper */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-20 py-8">
        
        {/* Search Bar */}
        <div className="w-full max-w-xl mb-8 md:p-0 pt-[30%]">
          <GptSearchBar />
        </div>

        {/* Movie Suggestions */}
        <div className="w-full max-w-4xl">
          <GptMovieSuggestions />
        </div>
      </div>
    </>
  );
};

export default GPTSearch;
