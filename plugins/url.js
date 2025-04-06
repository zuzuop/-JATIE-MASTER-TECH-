const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { cmd } = require("../command");

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
    const targetMsg = quoted || m;
    const mimeType = (targetMsg.msg || targetMsg).mimetype || "";

    if (!mimeType || !mimeType.startsWith("image")) {
      return reply("❌ Please reply to an image.");
    }

    reply("🔄 Uploading image...");

    const imageBuffer = await targetMsg.download();

    // Convert to base64
    const base64Image = imageBuffer.toString("base64");

    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=e909ac2cc8d50250c08f176afef0e333`, null, {
      params: {
        image: base64Image,
        name: `upload_${Date.now()}`
      }
    });

    if (!data || !data.data || !data.data.url) {
      return reply("❌ Failed to upload the image.");
    }

    const imageUrl = data.data.url;

    await conn.sendMessage(from, {
      text: `✅ *Image Uploaded Successfully 📸*\n🔗 *URL:* ${imageUrl}\n\n> ⚖️ *Uploaded via MALVIN-AI*`,
      contextInfo: {
        mentionedJid: [sender]
      }
    });

  } catch (error) {
    console.error("Upload Error:", error?.response?.data || error);
    reply("❌ Error: Failed to upload image. Check your API key or try again later.");
  }
});
