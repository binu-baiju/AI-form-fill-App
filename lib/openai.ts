import Configuration from "openai";
import OpenAIApi from "openai";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "YOUR_API_KEY_HERE",
});
const configuration = new Configuration({
  apiKey: "bhbuhbuhb",
});

export const openai2 = new OpenAIApi(configuration);
