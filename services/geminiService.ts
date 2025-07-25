

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Create a single chat instance to maintain conversation history
const chat: Chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: 'You are a helpful and professional HR assistant. Provide concise and accurate information related to human resources topics. Be friendly and approachable.',
    },
});

export const sendMessageToGeminiStream = async (message: string): Promise<AsyncGenerator<GenerateContentResponse>> => {
    try {
        const result = await chat.sendMessageStream({ message });
        return result;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw new Error("Failed to get response from AI assistant.");
    }
};
