const { getContextInfo } = require('./new');
const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "partyneon",
    alias: ["neonparty", "photooxyneon"],
    desc: "Create neon text image using Photooxy",
    category: "logo",
    react: "🎉",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please enter some text.");
        
        const api = `https://photooxy-api-1.yusufxdev.repl.co/api/photooxy/party-neon?text=${encodeURIComponent(q)}`;
        const res = await axios.get(api, { responseType: 'arraybuffer' });

        await conn.sendMessage(from, {
            image: res.data,
            caption: "*Here's your party neon logo!*",
            contextInfo: getContextInfo(m.sender)
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in partyneon command:", e);
        reply("Something went wrong while generating the neon logo.");
    }
});
