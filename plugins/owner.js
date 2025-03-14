const axios = require('axios');
const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const { exec } = require('child_process')
const {runtime} = require('../lib/functions')


cmd({
    pattern: "infoowner",
    desc: "owner the bot",
    category: "owner",
    react: "👨‍💻",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*👋 Hello ${pushname}*

*👨‍💻𝗣𝗥𝗜𝗡𝗖𝗘 𝗠𝗗𝗫𝗜👨‍💻*

> *𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢* 

*⚡Owner name -: ᴘʀɪɴᴄᴇ*
*⚡Number* -: https://t.me/faraday_11

⚡️◦ https://whatsapp.com/channel/0029Vac8SosLY6d7CAFndv3

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴍᴅxɪ*
`;
await conn.sendMessage(from,{image:{url:config.MENU_IMG},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
});

cmd({
    pattern: "repo",
    desc: "repo the bot",
    react: "📡",
    category: "main",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*📍ℝ𝔼ℙ𝕆-𝕃𝕀ℕ𝕂 ❤️‍🔥👇*

👨‍💻◦https://github.com/MayelPrince/PRINCE-MDXI


*📍ℙ𝕃𝔼𝔸𝕊𝔼 𝔽𝕆𝕃𝕃𝕆𝕎 𝕄𝕐 𝕎ℍ𝔸𝕋𝕊𝔸ℙℙ ℂℍ𝔸ℕℕ𝔼𝕃 ❤️‍🔥👇*

👨‍💻◦ *https://whatsapp.com/channel/0029Vakd0RY35fLr1MUiwO3O*

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴍᴅxɪ*
`;
await conn.sendMessage(from,{image:{url: config.MENU_IMG},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
});
cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "Check up time , ram usage and more",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `┌─────────────────────
├ *Runtime:-* ${runtime(process.uptime())}
├ *Ram usage:-* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}GB / ${Math.round(require('os').totalmem / 1024 / 1024)}GB
├  *Platform:-* Linux
├ *Owners:-* ᴜꜱᴇʀꜱ
├ *Version:-* xɪ
└─────────────────────

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴍᴅxɪ*
`;
return reply(`${status}`)
  
}catch(e){
console.log(e)
reply(`${e}`)

}
})
cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    react: "👋",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: config.ALIVE_MSG},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
});

cmd({
    pattern: "jid",
    desc: "Get the JID of the chat.",
    category: "main",
   // react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
       
        
        const chatJid = from;

        
       await reply (`${chatJid}`)

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "restart",
    desc: "restart the bot",
    react :"🔄",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner) return reply(`only for owner`);
const {exec} = require("child_process")
reply("restarting...")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
})
// 1. Shutdown Bot
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 Shutting down...").then(() => process.exit());
});

// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (args.length === 0) return reply("📢 Please provide a message to broadcast.");

    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }

    reply("📢 Message broadcasted to all groups.");
});

// 3. Set Profile Picture
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");

    try {
        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.jid, { url: media });
        reply("🖼️ Profile picture updated successfully!");
    } catch (error) {
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});

// 4. Block User
cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to block.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 User ${user} blocked successfully.`);
    } catch (error) {
        reply(`❌ Error blocking user: ${error.message}`);
    }
});

// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to unblock.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
        reply(`❌ Error unblocking user: ${error.message}`);
    }
});


cmd({
    pattern: "vv",
    desc: "Save quoted media (image/video).",
    react: "💾",
    category: "main",
    filename: __filename
}, 

async (conn, mek, m, { from, quoted, reply }) => {
    try {
        if (!quoted) return reply("❌ Please reply to an image or video.");

        if (quoted.message.imageMessage) {
            const imageCaption = quoted.message.imageMessage.caption || '';
            const media = await conn.downloadAndSaveMediaMessage(quoted);
            await conn.sendMessage(from, { image: { url: media }, caption: imageCaption }, { quoted: mek });
        } 
        else if (quoted.message.videoMessage) {
            const videoCaption = quoted.message.videoMessage.caption || '';
            const media = await conn.downloadAndSaveMediaMessage(quoted);
            await conn.sendMessage(from, { video: { url: media }, caption: videoCaption }, { quoted: mek });
        } 
        else {
            return reply("❌ No supported media found in the quoted message.");
        }
    } catch (error) {
        console.error(error);
        reply(`❌ Error: ${error.message}`);
    }
});

         
      



// 6. Clear All Chats
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '𝗣𝗶𝗻𝗴𝗶𝗻𝗴...' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `📍Ping :${ping}ms` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});