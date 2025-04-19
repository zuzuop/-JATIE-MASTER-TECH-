const { cmd, commands } = require('../command');
const axios = require('axios');
const { fetchJson } = require('../lib/functions2');

cmd({
    pattern: "partyneon",
    desc: "Create a neon party text effect",
    category: "logo",
    react: "🎉",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) return reply("❌ Please provide a name. Example: partyneon Prince");

        const name = args.join(" ");
        const apiUrl = `https://api-pink-venom.vercel.app/api/logo?url=https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html&name=${encodeURIComponent(name)}`;

        const result = await fetchJson(apiUrl);

        if (!result?.result?.download_url) {
            return reply("Something went wrong while generating the neon logo.");
        }

        await conn.sendMessage(from, {
            image: { url: result.result.download_url }
        });

    } catch (e) {
        return reply(`*An error occurred while generating the image.*\n\n_Error:_ ${e.message}`);
    }
});
