const axios = require("axios");
const { cmd } = require("../command"); // Command handler

cmd({
  pattern: "trtt",
  alias: ["translate"],
  desc: "🌍 Translate text between languages",
  react: "⚡",
  category: "other",
  use: ".trt [language code]",
  filename: __filename,
},
async (conn, mek, m, { from, quoted, q, reply }) => {
  try {
    // Ensure language code is provided
    const args = q.split(" ");
    if (args.length < 1) {
      return await conn.sendMessage(from, { text: "❗ Provide a language code. Example: `.trt en` (Reply to a message to translate)." }, { quoted: m });
    }

    const targetLang = args[0].toLowerCase(); // Extract language code

    // Get text from quoted message (if any) or user input
    let textToTranslate;
    if (quoted && quoted.text) {
      textToTranslate = quoted.text; // Use quoted message text
    } else if (args.length > 1) {
      textToTranslate = args.slice(1).join(" "); // Use manually entered text
    } else {
      return await conn.sendMessage(from, { text: "❗ Reply to a message or enter text to translate." }, { quoted: m });
    }

    // Call translation API (auto-detects source language)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=auto|${targetLang}`;
    const { data } = await axios.get(url);

    if (!data.responseData || !data.responseData.translatedText) {
      return await conn.sendMessage(from, { text: "⚠️ Translation failed. Try again." }, { quoted: m });
    }

    const translation = data.responseData.translatedText;

    const translationMessage = `
🌍 *PRINCE MDXI TRANSLATION* 🌍

🔤 *Original:* ${textToTranslate}

🔠 *Translated:* ${translation}

🌐 *Language:* ${targetLang.toUpperCase()}

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ `;

    await conn.sendMessage(from, { text: translationMessage }, { quoted: m });

  } catch (e) {
    console.error("Translation Error:", e);
    await conn.sendMessage(from, { text: "⚠️ An error occurred while translating. Please try again later." }, { quoted: m });
  }
});
