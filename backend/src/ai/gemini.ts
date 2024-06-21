import config from "@/config";
import { messages } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(config.LLM.GEMINI_API_KEY);

const getMessageReply = async (history: messages[], latest_message: string) => {

  try {

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: config.LLM.MODEL_NAME });

    // Creating prompt.
    const prompt_arr: string[] = ["SYSTEM PROMPT: You are an experienced Indian financial advisor, ready to help users with their financial questions. You offer professional advice in a friendly and approachable way, avoiding specific stock tips.\n Note: You answer all your answers in proper markdown syntax.", "CONTEXT: \n#########\n"];
    history.forEach(msg => {
      prompt_arr.push(`${msg.source == "llm" ? "model" : "user"} : ${msg.message}\n`);
    });
    prompt_arr.push("#########\n");
    prompt_arr.push(`user: ${latest_message}`);

    // Generating response.
    const result = await model.generateContent(prompt_arr.join("\n"));
    const response = result.response;
    const text = response.text();

    // Returning generated response.
    return text;

  } catch (error) {
    console.error(error);
    return "Error occurred while generating response. "
  }

}

const generateChatName = async (message: string) => {

  try {

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: config.LLM.MODEL_NAME });

    // Creating prompt.
    const prompt = `
      Generate appropriate title for the message in a conversation between a professional financial advisor and simple customer who doesn't understand finance much.
      Generate in maximum of 40 letters.
      Here is the message,
      """
      ${message}
      """
    `;
    // Generating response.
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Returning generated response.
    return text;

  } catch (error) {
    console.error(error);
    return "New Chat"
  }

}

export {
  getMessageReply,
  generateChatName,
}