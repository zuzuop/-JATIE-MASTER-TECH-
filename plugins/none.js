const { cmd, commands } = require('../command');
const axios = require('axios');
const { fetchJson } = require('../lib/functions2');

cmd({
    pattern: "partyneon",
    desc: "Create a party neon text logo",
    category: "logo",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) return reply("❌ Please provide some text.\n\n*Example:* .partyneon Search You");

        const name = args.join(" ");
        const apiUrl = `https://api-pink-venom.vercel.app/api/logo?url=https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html&name=${encodeURIComponent(name)}`;

        const result = await fetchJson(apiUrl);

        if (!result?.result?.download_url) {
            return reply("❌ Failed to generate the image. Try a different text.");
        }

        await conn.sendMessage(from, {
            image: { url: result.result.download_url },
            caption: `*Party Neon Generated Successfully*\n\n🖋️ Text: ${name}`
        }, { quoted: mek });

    } catch (e) {
        return reply(`❌ Error occurred: ${e.message}`);
    }
});
