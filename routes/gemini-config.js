const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/", async (req, res) => {
    try {
        const { fieldId, userInput } = req.body;

        if (!userInput) {
            return res.status(400).json({ error: "Input cannot be empty" });
        }

        let prompt = "";
        switch (fieldId) {
            case 'question':
                prompt = `Improve the following question by enhancing grammar, spelling, and word choice without changing its meaning. Keep the revision concise, adding no more than 10 extra words. Question: ${userInput}`;
                break;
            case 'description':
                prompt = `Enhance the following description by improving grammar, spelling, and word choice while keeping the original meaning intact. Expand the text by adding at least 25 more words for better clarity and detail. Description: ${userInput}`;
                break;
            case 'Intuition':
                prompt = `Improve the following intuition statement by enhancing grammar, spelling, and word choice without changing its meaning. Keep the revision concise, adding no more than 10 extra words. Intuition: ${userInput}`;
                break;
            case 'explanation':
                prompt = `Enhance the following explanation by improving grammar, spelling, and word choice while keeping the original meaning intact. Expand the text by adding at least 25 more words for better clarity and detail. Explanation: ${userInput}`;
                break;
            default:
                alert("Invalid field");
                return;
        }
        const aiResponse = await model.generateContent(prompt);
        const generatedText = await aiResponse.response.text(); // Ensure you're accessing the text property
        res.json({ generatedText });
    } catch (err) {
        console.error("AI Error:", err);
        res.status(500).json({ error: "AI service failed" });
    }
});

module.exports = router;
