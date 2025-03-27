//hello cloner what are you looking for? //




const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "repoinfo",
    desc: "Fetch information about a GitHub repository.",
    category: "other",
    react: "ℹ️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const repo = args.join(' ');
        if (!repo) {
            return reply("Please provide a GitHub repository name in the format 📌`owner/repo`.");
        }

        const apiUrl = `https://api.github.com/repos/${repo}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let repoInfo = `*ɢɪᴛʜᴜʙ ʀᴇᴘᴏꜱɪᴛᴏʀʏ ɪɴꜰᴏ*\n\n`;
        repoInfo += `📌 *ɴᴀᴍᴇ*: ${data.name}\n`;
        repoInfo += `🔗 *ᴜʀʟ*: ${data.html_url}\n`;
        repoInfo += `📝 *ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ*: ${data.description}\n`;
        repoInfo += `⭐ *ꜱᴛᴀʀꜱ*: ${data.stargazers_count}\n`;
        repoInfo += `🍴 *ꜰᴏʀᴋꜱ*: ${data.forks_count}\n`;
        repoInfo += `> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ \n`;

        await conn.sendMessage(from, { text: repoInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching repository data🤕: ${e.message}`);
    }
});

