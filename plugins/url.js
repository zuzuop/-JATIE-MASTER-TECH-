const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { cmd } = require("../command");

// List of ImgBB API Keys
const API_KEYS = [
  "40dfb24c7b48ba51487a9645abf33148",
  "4a9c3527b0cd8b12dd4d8ab166a0f592",
  "0e2b3697320c339de00589478be70c48",
  "7b46d3cddc9b67ef690ed03dce9cb7d5"
];

cmd({
  pattern: "tourl2",
  alias: ["imgtourl2", "imgurl2", "url", "geturl2", "upload"],
  react: "📤",
  desc: "Convert media to ImgBB URL",
  category: "utility",
  use: ".tourl2 [reply to media]",
  filename: __filename
}, async (client, message, args, { reply }) => {
  try {
    const quotedMsg = message.quoted ? message.quoted : message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || "";

    if (!mimeType || !/image|video|audio/.test(mimeType)) {
      throw "Please reply to an image, video, or audio file.";
    }

    // Download media
    const mediaBuffer = await quotedMsg.download();

    // Convert to base64 (with mime type prefix)
    const base64Image = mediaBuffer.toString("base64");
    const fullData = `data:${mimeType};base64,${base64Image}`;

    // Try all API keys
    let uploadedUrl;
    for (let key of API_KEYS) {
      try {
        const res = await axios.post("https://api.imgbb.com/1/upload", null, {
          params: {
            key,
            image: fullData
          }
        });

        if (res.data && res.data.data && res.data.data.url) {
          uploadedUrl = res.data.data.url;
          break;
        } else {
          console.log(`Key failed: ${key} - Invalid response`);
        }
      } catch (err) {
        console.log(`Key failed: ${key} -`, err.response?.data || err.message);
      }
    }

    if (!uploadedUrl) {
      throw "❌ All API keys failed. Please try again later.";
    }

    // Detect media type
    let mediaType = "File";
    if (mimeType.includes("image")) mediaType = "Image";
    else if (mimeType.includes("video")) mediaType = "Video";
    else if (mimeType.includes("audio")) mediaType = "Audio";

    // Send result
    await reply(
      `*${mediaType}* Uploaded Successfully ✅\n\n` +
      `*📁 Size:* ${formatBytes(mediaBuffer.length)}\n` +
      `*🔗 URL:* ${uploadedUrl}\n\n` +
      `> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ`
    );

  } catch (error) {
    console.error(error);
    await reply(`Error: ${error.message || error}`);
  }
});

// Format file size helper
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
