const { cmd } = require("../command");
const axios = require("axios");


cmd({
  pattern: "vvv",
  react: "📩",
  alias: ["videoview", "savevv"],
  desc: "Saves and resends quoted image or video with its caption.",
  category: "media",
  use: ".vv",
  filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
  try {
    if (!quoted) return reply("❌ Please reply to an image or video to save and resend it.");

    if (quoted.mtype === "imageMessage") {
      let imageCaption = quoted.msg.caption || "";
      let imageUrl = await conn.downloadAndSaveMediaMessage(quoted);
      await conn.sendMessage(from, { image: { url: imageUrl }, caption: imageCaption }, { quoted: m });
    } 
    
    else if (quoted.mtype === "videoMessage") {
      let videoCaption = quoted.msg.caption || "";
      let videoUrl = await conn.downloadAndSaveMediaMessage(quoted);
      await conn.sendMessage(from, { video: { url: videoUrl }, caption: videoCaption }, { quoted: m });
    } 
    
    else {
      reply("❌ Please reply to an image or video.");
    }

  } catch (error) {
    console.error("Error in vv command:", error);
    reply("❌ An error occurred while processing the media.");
  }
});




cmd({
  pattern: "sss",
  react: "📸",
  alias: ["screenshot", "webshot"],
  desc: "Takes a screenshot of a website.",
  category: "search",
  use: ".ss <website_url>",
  filename: __filename
}, 
async (conn, mek, m, { from, args, q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a website URL to screenshot.");

    const url = q.trim();
    if (!/^https?:\/\//.test(url)) {
      return reply("❌ Please enter a valid URL starting with http:// or https://");
    }

    // Screenshot API URL
    const screenshotApi = `https://api.nexoracle.com/misc/ss-phone?apikey=MepwBcqIM0jYN0okD&url=${encodeURIComponent(url)}`;

    // Fetch the screenshot
    const webimage = await axios.get(screenshotApi, { responseType: "arraybuffer" });

    await conn.sendMessage(from, {
      image: Buffer.from(webimage.data),
      mimetype: "image/png",
      caption: `📸 Screenshot of: ${url}`
    }, { quoted: mek });

  } catch (error) {
    console.error("Error in ss command:", error.response?.data || error.message);
    reply(`❌ Failed to take a screenshot. Error: ${error.response?.data?.error || error.message}`);
  }
});
