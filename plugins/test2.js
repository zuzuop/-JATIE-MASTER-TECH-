
const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const googleTTS = require('google-tts-api');

cmd({
    pattern: "trt2",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "⚡",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, q, reply }) => {
    try {
        const args = q.split(' ');
        if (!args || args.length === 0) {
            return reply("❗ Please provide a language code. Usage: .translate [language]\nEg: .translate fr");
        }

        if (!m.quoted) {
            return reply("❗ Please reply to the message you want to translate.\nUsage: .translate [language]\nEg: .translate fr");
        }

        const targetLang = args[0].toLowerCase();
        const textToTranslate = m.quoted.text;

        // Default source language set to English
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=no|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
*PRINCE MDXI TRANSLATION* 

🔤 *Original*: ${textToTranslate}

🔠 *Translated*: ${translation}

🌐 *Language*: ${targetLang.toUpperCase()}

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while translating your text. Please try again later 🤕");
    }
});
