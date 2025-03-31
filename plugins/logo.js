const { cmd, commands } = require("../command"); const { fetchJson } = require("../lib/functions");

cmd({ pattern: "logo", desc: "Create logos", react: '🎗', category: "other", filename: __filename }, async (conn, message, store, { from, quoted, args, q, sender, reply }) => { try { if (!args[0]) return reply("Please give me a text.");

let responseText = `*ᴘʀɪɴᴄᴇ ᴍᴅx ʟᴏɢᴏ ᴍᴀᴋᴇʀ*\n\n` +
  `*🔢 Reply with a number to choose a style ➠*\n\n` +
  `1 ➠ Black Pink\n2 ➠ Black Pink 2\n3 ➠ Silver 3D\n4 ➠ Naruto\n5 ➠ Digital Glitch\n` +
  `6 ➠ Pixel Glitch\n7 ➠ Comic Style\n8 ➠ Neon Light\n9 ➠ Free Bear\n10 ➠ Devil Wings\n\n` +
  `> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ*`;

let sentMessage = await conn.sendMessage(from, { text: responseText, mentions: [sender] }, { quoted });

conn.ev.once('messages.upsert', async (event) => {
  const receivedMessage = event.messages[0];
  if (!receivedMessage || !receivedMessage.message) return;

  const contextInfo = receivedMessage.message.extendedTextMessage?.contextInfo;
  if (!contextInfo || contextInfo.stanzaId !== sentMessage.key.id) return;

  const receivedText = receivedMessage.message.extendedTextMessage.text.trim();
  const logoUrls = {
    '1': "https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html",
    '2': "https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html",
    '3': "https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html",
    '4': "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html",
    '5': "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html",
    '6': "https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html",
    '7': "https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html",
    '8': "https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html",
    '9': "https://en.ephoto360.com/free-bear-logo-maker-online-673.html",
    '10': "https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html"
  };

  if (logoUrls[receivedText]) {
    let response = await fetchJson(`https://api-pink-venom.vercel.app/api/logo?url=${logoUrls[receivedText]}&name=${q}`);
    await conn.sendMessage(from, { image: { url: response.result.download_url }, caption: "> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ*" }, { quoted });
  } else {
    reply("*_Invalid number. Please reply with a valid number._*");
  }
});

} catch (error) { console.log(error); reply(Error: ${error.message}); } });

