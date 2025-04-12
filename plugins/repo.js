const fetch = require('node-fetch');
const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "repo",
  alias: ["sc", "script"],
  desc: "Fetch information about PRINCE-MDXI GitHub repository",
  react: "📂",
  category: "main",
  filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
  const repoUrl = 'https://github.com/Mayelprince/PRINCE-MDXI';

  try {
    const [, username, repoName] = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);

    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    if (!res.ok) throw new Error(`GitHub API failed with status ${res.status}`);

    const data = await res.json();

    const createdAt = new Date(data.created_at).toLocaleDateString('en-GB');
    const updatedAt = new Date(data.updated_at).toLocaleDateString('en-GB');

    const styledText = `
Hello 👋,

This is *PRINCE-MDXI,* A WhatsApp Bot Built by *PRINCE TECH,* Enhanced with Amazing Features to Make Your WhatsApp Communication and Interaction Experience Amazing.

*ʀᴇᴘᴏ ʟɪɴᴋ:* https://github.com/Mayelprince/PRINCE-MDXI

*❲❒❳ ɴᴀᴍᴇ:* ${toFancyCase(data.name)}
*❲❒❳ ⭐ sᴛᴀʀs:* ${data.stargazers_count}
*❲❒❳ 🍴 ғᴏʀᴋs:* ${data.forks_count}
*❲❒❳ 📅 ᴄʀᴇᴀᴛᴇᴅ ᴏɴ:* ${createdAt}
*❲❒❳ 🔄 ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇᴅ:* ${updatedAt}
*❲❒❳ 👑 ᴏᴡɴᴇʀ:* ${toFancyCase(data.owner.login)}
`.trim();

    await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/kzfne8.jpeg" },
      caption: styledText,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363322606369079@newsletter',
          newsletterName: 'PRINCE TECH',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error("Error in repo command:", e);
    reply("❌ Failed to fetch repo info. Please try again later.");
  }
});

// Helper to convert to fancy lowercase style
function toFancyCase(text) {
  return text.toLowerCase().split("").map(char =>
    /[a-z]/.test(char) ? String.fromCharCode(0x1d00 + char.charCodeAt(0)) : char
  ).join("");
}