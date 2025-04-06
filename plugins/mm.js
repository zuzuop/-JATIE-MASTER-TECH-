const { fetchJson } = require("../lib/functions");
const axios = require("axios");
const { cmd, commands } = require('../command');

// Sinhala Movie Download (sent as document)
cmd({
  pattern: "movie",
  alias: ["slmovie"],
  desc: "Download Sinhala-subbed movies by link",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  q,
  reply
}) => {
  try {
    if (!q || !q.includes("https://sinhalasub.lk")) {
      return reply("❌ Please provide a valid SinhalaSub.lk movie link.");
    }

    await conn.sendMessage(from, {
      react: { text: '🎬', key: m.key }
    });

    const api = `https://manul-official-new-api-site.vercel.app/sl-mv-download?url=${q}&apikey=free`;
    const response = await axios.get(api);
    const res = response.data;

    if (!res || res.status !== "success" || !res.data.downloadLink) {
      return reply("⚠️ Failed to fetch movie download link.");
    }

    const { downloadLink, fullUrl } = res.data;

    await conn.sendMessage(from, {
      text: `📽️ Fetching your movie...\n\n🔗 ${downloadLink}`
    }, { quoted: m });

    // Send the video as a document
    await conn.sendMessage(from, {
      document: { url: downloadLink },
      mimetype: "video/mp4",
      fileName: "Sinhala_Movie.mp4",
      caption: "✅ Here is your Sinhala movie in document format!"
    }, { quoted: m });

  } catch (e) {
    console.error("Movie Download Error:", e);
    reply("⚠️ Something went wrong while processing your movie request.");
  }
});
