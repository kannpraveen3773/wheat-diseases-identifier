require('dotenv').config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) { console.error("No API key"); return; }
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + key);
        const data = await response.json();
        console.log("Status:", response.status);
        if (data.models) {
            console.log("Available models:");
            data.models.forEach(m => console.log(m.name, m.supportedGenerationMethods.join(", ")));
        } else {
            console.log("Response:", data);
        }
    } catch(err) {
        console.error("Error:", err);
    }
}

listModels();
