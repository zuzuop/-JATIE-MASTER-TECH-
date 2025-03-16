const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// List of bad words to check against
const badWords = ["wtf", "mia", "xxx", "fuck", "sex", "huththa", "pakaya", "ponnaya", "hutto"];

cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup || !isBotAdmins) return; // Skip if not in group or bot is not an admin

        const lowerCaseMessage = (body || '').toLowerCase();
        const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));

        if (containsBadWord && config.ANTI_BAD_WORD === 'true' && !isAdmins) {
            // Delete the message
            await conn.sendMessage(from, { delete: mek.key });
            // Send warning message
            await conn.sendMessage(from, { text: "🚫 ⚠️ BAD WORDS NOT ALLOWED ⚠️ 🚫" }, { quoted: mek });
        }
    } catch (error) {
        console.error(error);
        reply("An error occurred while processing the message.");
    }
});

const linkPattern = /https?:\/\/\S+/gi; // Match any URL starting with http:// or https://

cmd({
    on: "body"
}, async (conn, mek, m, { from, body, sender, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin

        const containsLink = linkPattern.test(body); // Check if message contains any link

        if (containsLink && config.ANTI_LINK === 'true') {
            // Delete the message with a link
            await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });

            // Warn the user
            await conn.sendMessage(from, { text: `*⚠️ LINKS ARE NOT ALLOWED IN THIS GROUP.*\n@${sender.split('@')[0]} 📛`, mentions: [sender] }, { quoted: mek });

            // Remove the user from the group
            await conn.groupParticipantsUpdate(from, [sender], 'delete');
        }
    } catch (error) {
        console.error(error);
        reply("*_Link delete successful._");
    }
});
