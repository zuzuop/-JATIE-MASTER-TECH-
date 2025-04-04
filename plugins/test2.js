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
        const args = q.trim().split(' ');
        if (!args[0]) {
            return reply("❗ Please provide a target language code. Usage: .translate [lang]\nEg: .translate en");
        }

        if (!m.quoted || !m.quoted.text) {
            return reply("❗ Please reply to the message you want to translate.\nEg: .translate en");
        }

        const targetLang = args[0].toLowerCase();
        const textToTranslate = m.quoted.text;

        // If user wants translation TO English, assume source is unknown (most likely foreign)
        const langPair = targetLang === 'en' 
            ? `auto|en` 
            : `en|${targetLang}`;

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${langPair}`;

        const response = await axios.get(url);
        const translation = response.data?.responseData?.translatedText;

        const translationMessage = `
*PRINCE MDXI TRANSLATION* 

🔤 *Original*: ${textToTranslate}

🔠 *Translated*: ${translation}

🌐 *To Language*: ${targetLang.toUpperCase()}

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ`;

        return reply(translationMessage);
    } catch (e) {
        console.log("Translation error:", e);
        return reply("⚠️ Failed to translate. Make sure the language code is correct and try again.");
    }
});
