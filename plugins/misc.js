const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const util = require("util");
const { getAnti, setAnti, initializeAntiDeleteSettings } = require('../data/antidel');

initializeAntiDeleteSettings();

cmd({
    pattern: "antidelete",
    react: "😎",
    alias: ['antidel', 'ad'],
    desc: "Sets up the Antidelete",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply, isOwner, q, text, isCreator, fromMe }) => {
    if (!isOwner) return reply('This command is only for the bot owner');
    try {
        const command = q?.toLowerCase();

        switch (command) {
            case 'on':
                await setAnti('gc', false);
                await setAnti('dm', false);
                return reply('_AntiDelete is now off for Group Chats and Direct Messages._');

            case 'off gc':
                await setAnti('gc', false);
                return reply('_AntiDelete for Group Chats is now disabled._');

            case 'off dm':
                await setAnti('dm', false);
                return reply('_AntiDelete for Direct Messages is now disabled._');

            case 'set gc':
                const gcStatus = await getAnti('gc');
                await setAnti('gc', !gcStatus);
                return reply(`_AntiDelete for Group Chats ${!gcStatus ? 'enabled' : 'disabled'}._`);

            case 'set dm':
                const dmStatus = await getAnti('dm');
                await setAnti('dm', !dmStatus);
                return reply(`_AntiDelete for Direct Messages ${!dmStatus ? 'enabled' : 'disabled'}._`);

            case 'set all':
                await setAnti('gc', true);
                await setAnti('dm', true);
                return reply('_AntiDelete set for all chats._');

            case 'status':
                const currentDmStatus = await getAnti('dm');
                const currentGcStatus = await getAnti('gc');
                return reply(`_AntiDelete Status_\n\n*DM AntiDelete:* ${currentDmStatus ? 'Enabled' : 'Disabled'}\n*Group Chat AntiDelete:* ${currentGcStatus ? 'Enabled' : 'Disabled'}`);

            default:
                const helpMessage = `❒ *ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴄᴏᴍᴍᴀɴᴅ ɢᴜɪᴅᴇ ❒*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏɴ* - _*ʀᴇꜱᴇᴛ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ᴀʟʟ ᴄʜᴀᴛꜱ (ᴅɪꜱᴀʙʟᴇᴅ ʙʏ ᴅᴇꜰᴀᴜʟᴛ)*_
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏꜰꜰ ɢᴄ* - *_ᴅɪꜱᴀʙʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛꜱ_*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏꜰꜰ ᴅᴍ* - *_ᴅɪꜱᴀʙʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ᴅɪʀᴇᴄᴛ ᴍᴇꜱꜱᴀɢᴇꜱ_*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴇᴛ ɢᴄ*- *_ᴛᴏɢɢʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛꜱ_*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴇᴛ ᴅᴍ*- *_ᴛᴏɢɢʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ᴅɪʀᴇᴄᴛ ᴍᴇꜱꜱᴀɢᴇꜱ_*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴇᴛ ᴀʟʟ* - *_ᴇɴᴀʙʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ᴀʟʟ ᴄʜᴀᴛꜱ_*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴛᴀᴛᴜꜱ* - *_ᴄʜᴇᴄᴋ ᴄᴜʀʀᴇɴᴛ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴛᴀᴛᴜꜱ_*`;

                return reply(helpMessage);
        }
    } catch (e) {
        console.error("Error in antidelete command:", e);
        return reply("An error occurred while processing your request.");
    }
});
