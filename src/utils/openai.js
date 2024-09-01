import { GoogleGenerativeAI } from "@google/generative-ai";
import { OPENAI_KEY } from "./constants";

// Access your API key as an environment variable.
 export const genAI = new GoogleGenerativeAI(OPENAI_KEY);

