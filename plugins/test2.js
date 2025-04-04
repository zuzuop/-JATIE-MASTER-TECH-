
const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

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
        
        if (!quoted) return reply("❗ Please reply to the message you want to translate.\nUsage: `.translate [lang_code]`\nExample: `.translate en`");

        if (!args[0]) return reply("❗ Please provide a target language code.\nUsage: `.translate [lang_code]`\nExample: `.translate en`");

        const targetLang = args[0].toLowerCase();
        const textToTranslate = quoted.text;

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=auto|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data?.responseData?.translatedText;

        if (!translation) return reply("❌ Could not retrieve translation.");

        const translationMessage = `
*PRINCE MDXI TRANSLATION*

🔤 *Original:* ${textToTranslate}
🔠 *Translated:* ${translation}
🌐 *To Language:* ${targetLang.toUpperCase()}

> Powered by *PRINCE TECH*`;

        return reply(translationMessage);

    } catch (e) {
        console.error("Translation Error:", e);
        return reply("⚠️ An error occurred while translating the text. Please try again later.");
    }
});
