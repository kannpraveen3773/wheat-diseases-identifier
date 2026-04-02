const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        // Initialize model (gemini-pro works perfectly for text chat)
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Base instructions to act as an agricultural expert
        // We inject these as initial hidden history because earlier Gemini SDK versions
        // don't always support systemInstructions natively in model init.
        const systemInstruction = {
            role: "user",
            parts: [{ text: "You are a specialized AI assistant for 'WheatGuard', an application built to support wheat farmers. You must strictly act as an expert agricultural advisor specializing in wheat farming, crop management, and wheat diseases. If the user asks something unrelated to agriculture or wheat, politely decline to answer and guide them back to wheat farming." }]
        };
        const systemAck = {
            role: "model",
            parts: [{ text: "Understood. I am the WheatGuard advisor. I will strictly act as an expert agricultural advisor and only answer questions related to wheat farming, crop management, and wheat diseases." }]
        };

        // Format history for Gemini SDK
        const formattedHistory = [systemInstruction, systemAck];
        if (history && Array.isArray(history)) {
            history.forEach(msg => {
                // Ensure proper structure: { role: "user" | "model", parts: [{ text: "..." }] }
                if (msg.role && msg.parts) {
                    formattedHistory.push({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: msg.parts
                    });
                } else if (msg.role && msg.text) {
                     // Handle alternate simpler format if sent by client
                     formattedHistory.push({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.text }]
                    });
                }
            });
        }

        const chat = model.startChat({
            history: formattedHistory,
        });

        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        res.json({ response: responseText });

    } catch (error) {
        console.error("Chatbot Error:", error.message);
        res.status(500).json({ message: "Failed to process chat message", details: error.message });
    }
});

module.exports = router;
