const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { cmd } = require("../command");

cmd({
  pattern: "ttourl",
  alias: ["imgtourl", "imgurl", "url", "geturl", "upload"],
  react: '🖇',
  desc: "Convert media to a shareable Catbox URL",
  category: "convert",
  use: ".tourl [reply to media]",
  filename: __filename
}, async (client, message, args, { reply }) => {
  try {
    // Validate if the user replied to media
    const quotedMsg = message.quoted ? message.quoted : message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType) {
      return reply("❌ Please reply to an image, video, or audio file.");
    }

    // Download the media buffer
    const mediaBuffer = await quotedMsg.download();
    if (!mediaBuffer) return reply("❌ Failed to download the media.");

    // Determine file extension based on MIME type
    const extensionMap = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'video/mp4': '.mp4',
      'video/quicktime': '.mov',
      'audio/mpeg': '.mp3',
      'audio/ogg': '.ogg',
      'audio/wav': '.wav'
    };
    const extension = extensionMap[mimeType] || '';
    if (!extension) return reply("❌ Unsupported file type. Try image, video, or audio.");

    // Save temporary file
    const tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Prepare form data for Catbox upload
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `file${extension}`);
    form.append('reqtype', 'fileupload');

    // Upload file
    const { data } = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    // Check if upload failed
    if (!data || data.includes("ERROR")) {
      throw new Error("Failed to upload to Catbox.");
    }

    // Clean up temp file
    fs.unlinkSync(tempFilePath);

    // Determine media type
    let mediaType = "File";
    if (mimeType.includes('image')) mediaType = "Image";
    else if (mimeType.includes('video')) mediaType = "Video";
    else if (mimeType.includes('audio')) mediaType = "Audio";

    // Respond with the uploaded file URL
    await reply(
      `✅ *${mediaType} Uploaded Successfully*\n\n` +
      `📂 *Size:* ${formatBytes(mediaBuffer.length)}\n` +
      `🔗 *URL:* ${data}\n\n` +
      `> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ 
    );

  } catch (error) {
    console.error("Upload Error:", error);
    await reply(`❌ Error: ${error.message || "Something went wrong."}`);
  }
});

// Helper function to format file size
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
