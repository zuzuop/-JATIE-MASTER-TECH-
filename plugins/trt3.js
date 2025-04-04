
const translatte = require('translatte');
const { cmd } = require('../command'); // Your bot command system

cmd({
  pattern: "trrt",
  alias: ["translate"],
  desc: "🌐 Translate quoted message to a target language",
  react: "🌍",
  category: "other",
  use: ".trt [language code] (reply to a message)",
  filename: __filename,
},
async (conn, mek, m, { from, quoted, q, reply }) => {
  try {
    const langCode = q.trim();

    // Check if the language code was provided
    if (!langCode) {
      return await conn.sendMessage(from, {
        text: "❌ Please provide a valid language code.\n\nExample: `.trt en` (reply to a message)\nUse `.langcode` to see supported languages."
      }, { quoted: m });
    }

    // Check if the user replied to a message
    if (!quoted || !quoted.text) {
      return await conn.sendMessage(from, {
        text: "❌ Please reply to a message to translate it."
      }, { quoted: m });
    }

    // Perform translation
    const result = await translatte(quoted.text, { to: langCode });

    // Send translated message
    const output = `🔤 *Translated Text:* \n${result.text}`;
    return await conn.sendMessage(from, { text: output }, { quoted: m });

  } catch (e) {
    console.error("Translation error:", e);
    return await conn.sendMessage(from, { text: "❌ An error occurred while translating. Please try again later." }, { quoted: m });
  }
});
