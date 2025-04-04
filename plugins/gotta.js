const { getContextInfo } = require('./new');
const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "ggpt",
    alias: ["ai", "chatgpt"],
    desc: "Chat with an AI-powered assistant.",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please enter a message to ask the AI.");

        const apiUrl = `https://apis-keith.vercel.app/ai/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.result) return reply("Failed to get a response from AI.");

        const response = `🤖 *AI Response:*\n${data.result}`;

        await conn.sendMessage(from, {
            text: response,
            contextInfo: getContextInfo(m.sender)
        }, { quoted: mek });

    } catch (e) {
        console.error("GPT AI Error:", e);
        reply("An error occurred while getting a response.");
    }
});
