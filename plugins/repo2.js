const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "repo2",
  react: "📌",
  alias: ["git", "github"],
  desc: "Displays the PRINCE MDXI repository details with live stars & forks.",
  category: "info",
  use: ".repo",
  filename: __filename
}, 
async (conn, mek, m, { from, reply, pushname }) => {
  try {
    const repoUrl = "https://api.github.com/repos/mayelprince/PRINCE-MDXI";
    const response = await axios.get(repoUrl);
    const { stargazers_count, forks_count, created_at, updated_at } = response.data;

    const repoInfo = `Hello *${pushname}*,\n\nThis is *PRINCE-MDXI,* A WhatsApp Bot Built by *PRINCE TECH,* Enhanced with Amazing Features to Make Your WhatsApp Communication and Interaction Experience Amazing.\n\n` +
      `*ʀᴇᴘᴏ ʟɪɴᴋ:* https://github.com/mayelprince/PRINCE-MDXI\n\n` +
      `*❲❒❳ ɴᴀᴍᴇ:* PRINCE-MDXI\n` +
      `*❲❒❳ ⭐ sᴛᴀʀs:* ${stargazers_count}\n` +
      `*❲❒❳ 🍴 ғᴏʀᴋs:* ${forks_count}\n` +
      `*❲❒❳ 📅 ᴄʀᴇᴀᴛᴇᴅ ᴏɴ:* ${new Date(created_at).toLocaleDateString()}\n` +
      `*❲❒❳ 🔄 ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇᴅ:* ${new Date(updated_at).toLocaleDateString()}\n` +
      `*❲❒❳ 👑 ᴏᴡɴᴇʀ:* PRINCE TECH`;

    const imageUrl = "https://raw.githubusercontent.com/Mayelprince/url/main/url/1264.jpg";

    await conn.sendMessage(from, { 
      image: { url: imageUrl }, 
      caption: repoInfo 
    }, { quoted: mek });

  } catch (error) {
    console.error(error);
    reply("❌ Error fetching repository details. Try again later.");
  }
});
