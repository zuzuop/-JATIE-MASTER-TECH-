const { cmd } = require('../command');
const axios = require('axios');


//============================================ai==============================================//

cmd({
    pattern: 'ai',
    react: '🤖',
    alias: ['chatgpt', 'ask'],
    desc: 'Chat with AI',
    category: 'ai',
    use: '.ai <text>',
    filename: __filename
}, async (conn, mek, m, { reply, args }) => {
    try {
        const text = args.join(' ');
        if (!text) return reply("Enter the text!");

        let prompt = "Your Name Is ELITEPRO"; // AI context prompt
        let { data } = await axios.get("https://mannoffc-x.hf.space/ai/logic", {
            params: {
                q: text,
                logic: prompt
            }
        });

        reply(data.result);
    } catch (e) {
        reply("Error: " + e.message);
        console.log(e);
    }
});

//============================================imgsearch=================================//


cmd({
    pattern: 'imgsearch',
    react: '🔍',
    alias: ['imagesearch', 'gis', 'img'],
    desc: 'Search for images online.',
    category: 'search',
    use: '.imgsearch <query>',
    filename: __filename
}, async (conn, mek, m, { reply, args }) => {
    try {
        const text = args.join(' ');
        if (!text) return reply(`*Usage:* .imgsearch <query>\n\n*Example:* .imgsearch cat`);

        await conn.sendMessage(m.chat, { react: { text: "🔍", key: m.key } });

        const apiResponse = await axios.get(`https://apis.davidcyriltech.my.id/googleimage`, {
            params: { query: text }
        });

        const { success, results } = apiResponse.data;

        if (!success || !results || results.length === 0) {
            return reply(`❌ No images found for "${text}". Try another search.`);
        }

        const maxImages = Math.min(results.length, 5);
        for (let i = 0; i < maxImages; i++) {
            await conn.sendMessage(m.chat, {
                image: { url: results[i] },
                caption: `📷 *Image Search*\n\n🔎 *Query:* "${text}"\n📄 *Result:* ${i + 1}/${maxImages}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ *`
            }, { quoted: m });
        }

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    } catch (error) {
        console.error("Error in Image Search:", error);
        reply(`❌ *Error fetching images. Try again later.*`);
    }
});

//=========//

cmd({
    pattern: 'blackbox',
    alias: ['bb'],
    desc: 'Fetches data from the Blackbox API.',
    category: 'ai',
    use: '.blackbox <query>',
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    if (!args.length) return reply('Please provide a query.\n*Example:* .blackbox hi');

    try {
        const query = encodeURIComponent(args.join(' '));
        const apiUrl = `https://apis.davidcyriltech.my.id/blackbox?q=${query}`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);

        const data = await response.json();
        if (data.success && data.status === 200) {
            reply(`*Creator:* ${data.creator}\n*Status:* ${data.status}\n*Success:* ${data.success}`);
        } else {
            reply('API returned an unexpected response.');
        }
    } catch (error) {
        console.error('Error fetching Blackbox API:', error);
        reply('Failed to fetch data from Blackbox API.');
    }
});

//================//


cmd({
    pattern: 'gpt4',
    alias: ['define'],
    desc: 'Ask GPT-4 AI a question.',
    category: 'ai',
    use: '.gpt4 <question>',
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    if (!args.length) return reply('Please provide a question.\n*Example:* .gpt4 What is AI?');

    try {
        const query = encodeURIComponent(args.join(' '));
        const apiUrl = `https://apis.davidcyriltech.my.id/ai/gpt4?text=${query}`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);

        const data = await response.json();
        if (data.success) {
            reply(`*🤖 GPT-4 AI Response:*\n${data.message}`);
        } else {
            reply('API returned an unexpected response.');
        }
    } catch (error) {
        console.error('Error fetching GPT-4 AI API:', error);
        reply('Failed to fetch response from GPT-4 AI.');
    }
});