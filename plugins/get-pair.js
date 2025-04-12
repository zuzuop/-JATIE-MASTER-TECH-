const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');
const { cmd } = require("../command");

// get pair 2
cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Pairing code",
    category: "download",
    use: ".pair +237887868XXX",
    filename: __filename
},
async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        // Validate input
        if (!q) return await reply("*Example:* .pair +237887868XXX");

        // Fetch pairing code (FIXED: use `number=` instead of `phone=`)
        const res = await fetch(`https://prince-mdx-session2.onrender.com/pair?number=${q}`);
        const data = await res.json();

        if (!data || !data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please check the number or try again.");
        }

        // Pairing code
        const code = data.code;

        // Success message
        await reply(`✅ *PAIRING SUCCESSFUL:*\n\n\`\`\`${code}\`\`\`\n\nNeed help?\nJoin:\n• https://whatsapp.com/channel/0029Vakd0RY35fLr1MUiwO3O\n• https://t.me/princetechbot`);

        // Optional: Delay and re-send just the code
        await new Promise(resolve => setTimeout(resolve, 2000));
        await reply(`${code}`);

    } catch (err) {
        console.error(err);
        await reply("❌ An error occurred. Please try again later.");
    }
});
