

const { cmd } = require('../command')
const fs = require('fs');
const path = require('path');
const config = require('../config')
// List of bad words to check against
 // Replace with actual words
cmd({
  on: "body"
},
async (conn,mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
    
        const badWords = ["wtf", "mia", "xxx","fuck","sex","huththa","pakaya","ponnaya","hutto"]
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin
      
        const lowerCaseMessage = body.toLowerCase();
        const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));
        
        if (containsBadWord & config.ANTI_BAD_WORD === 'true') {
          await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });
          await conn.sendMessage(from, { text: "🚫 ⚠️BAD WORDS NOT ALLOWED⚠️ 🚫" }, { quoted: mek });
        }
    } catch (error) {
        console.error(error)
        reply("An error occurred while processing the message.")
    }
})


const linkPattern = /https?:\/\/\S+/gi; // Match any URL starting with http:// or https://

cmd({
    on: "body"
}, async (conn, mek, m, { from, body, sender, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin

        const containsLink = linkPatterns.some(pattern => pattern.test(body));

        if (containsLink && config.ANTI_LINK === 'true') {
            // Delete the message
            await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });

            // Warn the user
            await conn.sendMessage(from, { text: `⚠️ Links are not allowed in this group.\n@${sender.split('@')[0]} has been removed. 🚫`, mentions: [sender] }, { quoted: mek });

            // Remove the user from the group
            await conn.groupParticipantsUpdate(from, [sender], 'remove');
        }
    } catch (error) {
        console.error(error);
        reply("An error occurred while processing the message.");
    }
});
