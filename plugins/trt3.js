const axios = require('axios');
const { cmd } = require('../command'); // Your bot command system



cmd({
  pattern: "trt3",
  alias: ["translate", "trans"],
  desc: "🌍 Translate quoted text to a specified language",
  react: "🌍",
  category: "other",
  use: ".trt [lang_code]",
  filename: __filename,
},
async (conn, mek, m, { from, sender, quoted, q, reply }) => {
  try {
    // Check if a message is quoted
    if (!quoted) {
      return await conn.sendMessage(from, { text: "❌ Please quote a message to translate." }, { quoted: m });
    }

    // Get the language code from the command argument (e.g., '.trt en' will translate to English)
    const langCode = q.trim();

    // Ensure the language code is provided
    if (!langCode) {
      return await conn.sendMessage(from, { text: "❌ Please provide a valid language code. Usage: `.trt [lang_code]`. Example: `.trt en`" }, { quoted: m });
    }

    // Extract the text from the quoted message
    const quotedText = quoted.text;

    // Construct the API URL
    const apiUrl = `https://abhi-api-uhjv.onrender.com/api/tool/translate?text=${encodeURIComponent(quotedText)}&lang=${langCode}`;

    // Make the API request
    const { data } = await axios.get(apiUrl);

    // Check if the translation was successful
    if (data.status) {
      // Send the translated text back
      return await conn.sendMessage(from, { text: `🌍 *Translated Text:*\n${data.result.translatedText}\nLanguage: ${data.result.language}` }, { quoted: m });
    } else {
      return await conn.sendMessage(from, { text: "❌ Translation failed. Please try again later." }, { quoted: m });
    }

  } catch (e) {
    console.error("Error in translation command:", e);
    return await conn.sendMessage(from, { text: "⚠️ An error occurred while translating the text. Please try again later." }, { quoted: m });
  }
});
