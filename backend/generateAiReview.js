const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GEMINI_API_KEY,
});

const generateAiReview = async (code) => {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
            You are a code review expert. You are given the following code, review it and give a short,
            concise review of the code. Also mention its time and space complexity.
            The code is: ${code}
            `,
        });
        
        console.log(response.text);
        return response.text;
};

module.exports = {
    generateAiReview,
};