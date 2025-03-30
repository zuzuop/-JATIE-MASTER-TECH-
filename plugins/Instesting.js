const { fetchJson } = require("../lib/functions");
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const { facebook } = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const axios = require("axios");
const { cmd, commands } = require('../command');



cmd({
    pattern: "insta",
    alias: ["igdl", "reel", "ig", "instadl"],
    desc: "Download Instagram reels or image posts",
    category: "download",
    react: "⏳",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide an Instagram post or reel link.");
        if (!q.includes("instagram.com")) return reply("Invalid Instagram link.");

        const apiUrl = `https://delirius-apiofc.vercel.app/download/igv2?url=${q}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            await react("❌"); 
            return reply("Failed to fetch Instagram media.");
        }

        const { username, fullname, caption, likes, comments, followed, download } = data.data;

        const captionText = `📸 *Iɴsᴛᴀɢʀᴀᴍ Posᴛ* 📸\n\n` +
                            `👤 *Usᴇʀ:* ${fullname} (@${username})\n` +
                            `❤️ *Lɪᴋᴇs:* ${likes}\n💬 *Coᴍᴍᴇɴᴛs:* ${comments}\n👥 *Foʟʟᴏᴡᴇʀs:* ${followed}\n` +
                            `📝 *Cᴀᴘᴛɪᴏɴ:*\n${caption || "Nᴏ cᴀᴘᴛɪᴏɴ ᴀᴠᴀɪʟᴀʙʟᴇ."}`;

        for (const media of download) {
            if (media.type === "image") {
                await conn.sendMessage(from, {
                    image: { url: media.url },
                    caption: captionText,
                    contextInfo: { mentionedJid: [m.sender] }
                }, { quoted: mek });
            } else if (media.type === "video") {
                await conn.sendMessage(from, {
                    video: { url: media.url },
                    caption: captionText,
                    contextInfo: { mentionedJid: [m.sender] }
                }, { quoted: mek });
            }
        }

        await react("✅"); // React after successfully sending media
    } catch (e) {
        console.error("Error in Instagram downloader command:", e);
        await react("❌");
        reply(`An error occurred: ${e.message}`);
    }
});
