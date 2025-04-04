const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "trt",
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
            return reply("❗ Please provide a target language code.\nExample: .translate en");
        }

        if (!m.quoted || !m.quoted.text) {
            return reply("❗ Please reply to the message you want to translate.\nExample: .translate fr");
        }

        const targetLang = args[0].toLowerCase();
        const textToTranslate = m.quoted.text;

        // Step 1: Try detecting language with dummy langpair
        const detectUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;
        const detectRes = await axios.get(detectUrl);

        // Step 2: Get detected language code from response
        const detectedLang = detectRes.data?.responseData?.match?.lang || detectRes.data?.matches?.[0]?.segment?.lang || 'en';

        // Step 3: Use the actual detected language
        const translateUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${detectedLang}|${targetLang}`;
        const finalRes = await axios.get(translateUrl);

        const translation = finalRes.data?.responseData?.translatedText;

        const translationMessage = `
*PRINCE MDXI TRANSLATION* 

🔤 *Original*: ${textToTranslate}

🔠 *Translated*: ${translation}

🌐 *From*: ${detectedLang.toUpperCase()} ➜ *To*: ${targetLang.toUpperCase()}

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ`;

        return reply(translationMessage);
    } catch (e) {
        console.log("Translation error:", e);
        return reply("⚠️ Failed to translate. Please check the language code and try again.");
    }
});
