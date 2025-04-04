const { cmd, commands } = require('../command');
const axios = require('axios');
const translatte = require('translatte');

cmd({
  pattern: "translate",
  alias: ["trt2"],
  desc: "Translate a quoted message to the specified language",
  category: "utility",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!quoted) {
      return reply("❌ Please quote a message to translate.");
    }

    const langCode = q.trim();

    if (!langCode) {
      return reply("❌ Please provide a valid language code. Example: `.translate en` or use .langcode to list all language codes");
    }

    // Get the quoted message
    const quotedMessage = quoted.text;

    // Translate the quoted message
    const { text } = await translatte(quotedMessage, { to: langCode });

    // Send the translated message
    await conn.sendMessage(from, {
      text: `🔤 *Translated Text:* \n${text}`
    }, { quoted: m });
  } catch (e) {
    console.error("Error in .translate command:", e);
    reply("❌ An error occurred while translating the text. Please try again later.");
  }
});
