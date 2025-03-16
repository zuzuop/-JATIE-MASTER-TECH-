const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const db = require('./data/database'); // Import the database functions

// List of bad words to check against
const badWords = ["wtf", "mia", "xxx", "fuck", "sex", "huththa", "pakaya", "ponnaya", "hutto"];

cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
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

// Link detection and warning system
if (config.ANTI_LINK === "true") {
    cmd({
        on: "body"
    }, async (conn, mek, m, { from, body, sender, isGroup, isAdmins, isBotAdmins, reply }) => {
        try {
            if (!isGroup || !isBotAdmins) return; // Skip if not in group or bot is not an admin

            const linkRegex = /(https?:\/\/[^\s]+)/g;
            if (body.match(linkRegex)) {
                if (isAdmins || isBotAdmins || sender === from) return; // Skip if sender is admin or bot admin

                const warningLimit = 3;
                const currentWarnings = await db.getWarnings(sender, from);

                if (currentWarnings + 1 >= warningLimit) {
                    // Remove user from the group
                    await conn.groupParticipantsUpdate(from, [sender], "remove");
                    await conn.sendMessage(from, { text: `🚫 User @${sender.split('@')[0]} has been removed for exceeding the warning limit.` }, { mentions: [sender] });

                    // Reset warnings after removal
                    await db.resetWarnings(sender, from);
                } else {
                    // Increment warning in the database
                    await db.addWarning(sender, from);

                    // Send warning message
                    await conn.sendMessage(from, { text: `⚠️ Warning ${currentWarnings + 1}: Do not send links in this group!` });
                }

                // Delete the link message
                await conn.sendMessage(from, { delete: mek.key });
            }
        } catch (error) {
            console.error(error);
            reply("An error occurred while processing the message.");
        }
    });
}