const { cmd } = require('../command');
const axios = require('axios');
const { getBuffer, fetchJson } = require('../lib/functions2');

cmd({
    pattern: "partyneon",
    desc: "Generate Party Neon Text Effect",
    category: "logo",
    react: "🎉",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) return reply("❌ Please provide text.\n\nExample: .partyneon DarkCode");

        const text = args.join(" ");

        const apiUrl = `https://api-phoenix-efx.vercel.app/photooxy/party-neon?text=${encodeURIComponent(text)}`;
        
        const res = await fetchJson(apiUrl);
        
        if (!res?.url) return reply("❌ Failed to generate image. Please try again.");

        await conn.sendMessage(from, {
            image: { url: res.url },
            caption: `✅ *Party Neon Generated Successfully*\n🖊️ *Text:* ${text}`
        }, { quoted: mek });

    } catch (e) {
        console.error("Party Neon Error:", e);
        return reply(`❌ An error occurred: ${e.message}`);
    }
});
