const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "download",
    desc: "Download videos from supported platforms",
    category: "download",
    react: "📥",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args[0]) return reply("Please provide a valid video link.");

        const url = args[0];
        const apiUrl = `https://dl55.yt-dl.click/api/json?url=${encodeURIComponent(url)}`;

        reply("🔄 Fetching video, please wait...");

        const { data } = await axios.get(apiUrl);

        if (!data || !data.result || !data.result.url) {
            return reply("❌ Failed to download. Make sure the URL is supported.");
        }

        const videoUrl = data.result.url;
        const fileName = data.result.title || "video.mp4";

        await conn.sendMessage(from, { 
            video: { url: videoUrl }, 
            caption: `✅ *Download Complete*\n📌 *Title:* ${fileName}\n🔗 *Source:* ${url}`
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while downloading the video.");
    }
});
