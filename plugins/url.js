const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { cmd } = require("../command");

// All your provided ImgBB API keys
const API_KEYS = [
  "40dfb24c7b48ba51487a9645abf33148",
  "4a9c3527b0cd8b12dd4d8ab166a0f592",
  "0e2b3697320c339de00589478be70c48",
  "7b46d3cddc9b67ef690ed03dce9cb7d5"
];

cmd({
  pattern: "tourl",
  alias: ["imgtourl", "img2url", "url"],
  react: "🖇",
  desc: "Convert an image to a URL using ImgBB.",
  category: "convert",
  use: ".tourl (Reply to an image)",
  filename: __filename
}, async (conn, m, store, { from, quoted, reply, sender }) => {
  try {
    const targetMsg = quoted ? quoted : m;
    const mimeType = (targetMsg.msg || targetMsg).mimetype || "";

    if (!mimeType || !mimeType.startsWith("image")) {
      return reply("❌ Please reply to an image.");
    }

    reply("🔄 Uploading image...");

    const imageBuffer = await targetMsg.download();
    const base64Image = imageBuffer.toString("base64");

    let uploaded = false;
    let imageUrl = "";

    for (let key of API_KEYS) {
      try {
        const res = await axios.post(`https://api.imgbb.com/1/upload`, null, {
          params: {
            key,
            image: base64Image,
            name: `upload_${Date.now()}`
          }
        });

        if (res.data && res.data.data && res.data.data.url) {
          imageUrl = res.data.data.url;
          uploaded = true;
          break;
        }
      } catch (err) {
        console.log(`Key failed: ${key} - Trying next...`);
      }
    }

    if (!uploaded) {
      return reply("❌ All API keys failed. Please try again later.");
    }

    await conn.sendMessage(from, {
      text: `✅ *Image Uploaded Successfully!*\n\n🔗 *URL:* ${imageUrl}`,
      contextInfo: {
        mentionedJid: [sender]
      }
    });

  } catch (error) {
    console.error("Upload Error:", error?.response?.data || error);
    reply("❌ Error: Failed to upload image.");
  }
});
