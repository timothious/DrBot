import axios from "axios";

const GEMINI_API_KEY = "AIzaSyD9ORI8Ye84AcjLR3oaC78jD2g7txgF62k"; // Store this securely (e.g., in a .env file)

export const getGeminiResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
        },
      },
      {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GEMINI_API_KEY}` },
      }
    );

    return response.data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, something went wrong.";
  }
};
