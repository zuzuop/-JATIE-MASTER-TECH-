const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { cmd } = require("../command");

cmd({
  pattern: "tourl2",
  alias: ["imgtourl2", "imgurl2", "url", "geturl2", "upload"],
  react: "📤",
  desc: "Convert media to Catbox URL",
  category: "utility",
  use: ".tourl2 [reply to media]",
  filename: __filename
}, async (conn, m, store, { from, quoted, reply, sender }) => {
  try {
    const targetMsg = quoted || m;
    const mimeType = (targetMsg.msg || targetMsg).mimetype || "";

    if (!mimeType) {
      return reply("❌ Please reply to an image, video, or audio.");
    }

    reply("🔄 Uploading to Catbox...");

    const mediaBuffer = await targetMsg.download();
    const tempPath = path.join(os.tmpdir(), `upload_${Date.now()}`);

    fs.writeFileSync(tempPath, mediaBuffer);

    let ext = "";
    if (mimeType.includes("image/jpeg")) ext = ".jpg";
    else if (mimeType.includes("image/png")) ext = ".png";
    else if (mimeType.includes("video")) ext = ".mp4";
    else if (mimeType.includes("audio")) ext = ".mp3";

    const fileName = "file" + ext;
    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(tempPath), fileName);
    form.append("reqtype", "fileupload");

    const response = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    fs.unlinkSync(tempPath);

    if (!response.data) {
      throw new Error("❌ Upload failed.");
    }

    let mediaType = "File";
    if (mimeType.includes("image")) mediaType = "Image";
    else if (mimeType.includes("video")) mediaType = "Video";
    else if (mimeType.includes("audio")) mediaType = "Audio";

    await conn.sendMessage(from, {
      text:
        `✅ *${mediaType} Uploaded Successfully!*\n` +
        `📦 *Size:* ${formatBytes(mediaBuffer.length)}\n` +
        `🔗 *URL:* ${response.data}\n\n` +
        `> ⚙️ *Powered by PRINCE TECH*`,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363306168354073@newsletter",
          newsletterName: "ᴍᴀʟᴠɪɴ ᴋɪɴɢ",
          serverMessageId: 143
        }
      }
    });

  } catch (error) {
    console.error(error);
    await reply("❌ Error: " + (error.message || error));
  }
});

// Byte size formatter
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
