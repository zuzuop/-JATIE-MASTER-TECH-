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

const linkPatterns = [
    /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,   // WhatsApp group or chat links
    /wa\.me\/\S+/gi,                                      // wa.me links without https
    /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,           // Telegram links
    /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,           // YouTube links
    /https?:\/\/youtu\.be\/\S+/gi,                        // YouTube short links
    /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,          // Facebook links
    /https?:\/\/fb\.me\/\S+/gi,                           // Facebook short links
    /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,         // Instagram links
    /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,           // Twitter links
    /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,            // TikTok links
    /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,          // LinkedIn links
    /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,          // Snapchat links
    /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,         // Pinterest links
    /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,            // Reddit links
    /https?:\/\/ngl\/\S+/gi,                              // NGL links
    /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,           // Discord links
    /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,             // Twitch links
    /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,             // Vimeo links
    /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,       // Dailymotion links
    /https?:\/\/(?:www\.)?medium\.com\/\S+/gi             // Medium links
];

cmd({
    on: "body"
}, async (conn, mek, m, { from, body, sender, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup || !isBotAdmins) return; // Skip if not in group or bot is not an admin

        const lowerCaseMessage = (body || '').toLowerCase();
        const containsLink = linkPatterns.some(pattern => pattern.test(lowerCaseMessage));

        if (containsLink && config.ANTI_LINK === 'true' && !isAdmins) {
            // Delete the message
            await conn.sendMessage(from, { delete: mek.key });

            // Warn the user
            await conn.sendMessage(from, { 
                text: `⚠️ Links are not allowed in this group.\n@${sender.split('@')[0]} has been removed. 🚫`, 
                mentions: [sender] 
            }, { quoted: mek });

            // Remove the user from the group (only if the sender is not an admin)
            await conn.groupParticipantsUpdate(from, [sender], 'remove');
        }
    } catch (error) {
        console.error(error);
        reply("An error occurred while processing the message.");
    }
});