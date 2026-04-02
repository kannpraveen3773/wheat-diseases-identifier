const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const upload = multer({ storage: multer.memoryStorage() });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/analyze-wheat', upload.single('image'), async (req, res) => {
    console.log("--- AI Analysis Request Received ---");
    try {
        if (!req.file) return res.status(400).json({ message: 'No image uploaded' });


        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const language = req.body.language || 'English';
        const prompt = `Identify the wheat disease in this image. Response MUST be ONLY a JSON object: {"diseaseName": "...", "detailedExplanation": "...", "symptoms": "...", "chemicalRemedy": "...", "organicRemedy": "..."}. The detailedExplanation should provide a comprehensive 2-3 sentence overview of the disease, its causes, and potential impact on the crop. No other text. Translate all the JSON string values (diseaseName, detailedExplanation, symptoms, chemicalRemedy, organicRemedy) into ${language}.`;

        const imageParts = [{
            inlineData: { data: req.file.buffer.toString("base64"), mimeType: req.file.mimetype }
        }];

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        let text = response.text().trim();

        // Clean JSON formatting (removes markdown backticks)
        const cleanJSON = text.match(/\{[\s\S]*\}/);

        if (cleanJSON) {
            console.log("AI Response Success!");
            res.json(JSON.parse(cleanJSON[0]));
        } else {
            throw new Error("Invalid JSON format from AI");
        }

    } catch (error) {
        console.error("DEBUG ERROR:", error.message);
        res.status(500).json({ message: "Gemini AI analysis failed", details: error.message });
    }
});

module.exports = router;