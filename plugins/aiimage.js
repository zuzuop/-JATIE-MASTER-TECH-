const { cmd } = require("../command"); const axios = require("axios"); const fs = require("fs");

cmd({ pattern: "fluxai", alias: ["flux", "imagine"], react: "🚀", desc: "Generate an image using AI.", category: "ai", filename: __filename }, async (conn, mek, m, { q, reply }) => { try { if (!q) return reply("Please provide a prompt for the image.");

await reply("> ᴄʀᴇᴀᴛɪɴɢ ɪᴍᴀɢᴇ....");

    const apiUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
        return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `ɢᴇɴᴇʀᴀᴛᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴍᴅx \nPrompt: *${q}*\n\n🔹 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ 🔹`
    });
} catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
}

});

cmd({ pattern: "stablediffusion", alias: ["sdiffusion", "imagine2"], react: "🚀", desc: "Generate an image using AI.", category: "ai", filename: __filename }, async (conn, mek, m, { q, reply }) => { try { if (!q) return reply("Please provide a prompt for the image.");

await reply("> ᴄʀᴇᴀᴛɪɴɢ ɪᴍᴀɢᴇ...");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
        return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `ɢᴇɴᴇʀᴀᴛᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴍᴅxɪ \nPrompt: *${q}*\n\n🔹 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ 🔹`
    });
} catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
}

});

cmd({ pattern: "stabilityai", alias: ["stability", "imagine3"], react: "🚀", desc: "Generate an image using AI.", category: "ai", filename: __filename }, async (conn, mek, m, { q, reply }) => { try { if (!q) return reply("Please provide a prompt for the image.");

await reply("> ᴄʀᴇᴀᴛɪɴɢ ɪᴍᴀɢᴇ...");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
        return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `ɢᴇɴᴇʀᴀᴛᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴍᴅxɪ \nPrompt: *${q}*\n\n🔹 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ 🔹`
    });
} catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
}

});

