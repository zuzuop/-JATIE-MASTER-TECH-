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
    const targetMsg = quoted ? quoted : m;
    const mimeType = (targetMsg.msg || targetMsg).mimetype || "";

    if (!mimeType || !mimeType.startsWith("image")) {
      return reply("❌ Please reply to an image.");
    }

    reply("🔄 Uploading image...");

    const imageBuffer = await targetMsg.download();
    const base64Image = imageBuffer.toString("base64");

    const imgbbApiKey = "e909ac2cc8d50250c08f176afef0e333";
    const response = await axios.post(`https://api.imgbb.com/1/upload`, null, {
      params: {
        key: imgbbApiKey,
        image: base64Image,
        name: `upload_${Date.now()}`
      }
    });

    const imageUrl = response?.data?.data?.url;
    if (!imageUrl) throw "❌ Failed to upload image.";

    await conn.sendMessage(from, {
      text: `✅ *Image Uploaded Successfully!*\n\n🔗 *URL:* ${imageUrl}`,
      contextInfo: {
        mentionedJid: [sender]
      }
    });

  } catch (error) {
    console.error("Upload Error:", error?.response?.data || error);
    reply("❌ Error: Failed to upload image. Check the API key or try again.");
  }
});
