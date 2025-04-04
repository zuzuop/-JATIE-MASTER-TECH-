const axios = require('axios');
const { cmd } = require('../command'); // Your bot command system

cmd({
  pattern: "gpt4",
  alias: ["askgpt", "ai4"],
  desc: "🤖 Ask GPT-4 and get a response",
  react: "🤖",
  category: "ai",
  use: ".gpt [question]",
  filename: __filename,
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return await conn.sendMessage(from, { text: "❌ Please provide a question for GPT-4." }, { quoted: m });
    }

    // Construct the API URL
    const apiUrl = `https://apis.davidcyriltech.my.id/ai/gpt4?text=${encodeURIComponent(q)}`;

    // Make the API request
    const { data } = await axios.get(apiUrl);

    // Check if the request was successful
    if (data.success) {
      return await conn.sendMessage(from, { text: `🤖 *GPT-4 Response:* \n${data.message}` }, { quoted: m });
    } else {
      return await conn.sendMessage(from, { text: "❌ GPT-4 couldn't process your request. Please try again later." }, { quoted: m });
    }

  } catch (e) {
    console.error("Error in GPT-4 command:", e);
    return await conn.sendMessage(from, { text: "⚠️ An error occurred while querying GPT-4. Please try again later." }, { quoted: m });
  }
});
