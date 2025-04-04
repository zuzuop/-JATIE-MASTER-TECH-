const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "trt3",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "⚡",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, quoted }) => {
    try {
        const args = q.split(' ');
        if (args.length < 1) return reply("❗ Provide a language code. Example: `.trt en` (Reply to a message to translate).");

        const targetLang = args[0].toLowerCase(); // Target language code

        // Get text from quoted message (if any) or user input
        let textToTranslate;
        if (quoted && quoted.text) {
            textToTranslate = quoted.text;
        } else if (args.length > 1) {
            textToTranslate = args.slice(1).join(' '); // If user types text manually
        } else {
            return reply("❗ Reply to a message or enter text to translate.");
        }

        // Call translation API (auto-detects source language)
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=auto|${targetLang}`;
        const { data } = await axios.get(url);

        // Handle cases where API fails
        if (!data.responseData || !data.responseData.translatedText) {
            return reply("⚠️ Translation failed. Try again.");
        }

        const translation = data.responseData.translatedText;

        const translationMessage = `
🌍 *PRINCE MDXI TRANSLATION* 🌍

🔤 *Original:* ${textToTranslate}

🔠 *Translated:* ${translation}

🌐 *Language:* ${targetLang.toUpperCase()}

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ `;

        await reply(translationMessage);

    } catch (e) {
        console.error("Translation Error:", e);
        return reply("⚠️ An error occurred while translating. Please try again later.");
    }
});
