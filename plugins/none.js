const { getContextInfo } = require('./new');
const { cmd } = require('../command');
const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');

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

    // Step 1: Fetch the initial page to get the token
    const getPage = await axios.get('https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html');
    const $ = cheerio.load(getPage.data);
    const token = $('input[name="token"]').attr('value');

    // Step 2: Prepare form data
    const form = new FormData();
    form.append('text_1', q);
    form.append('login', 'OK');
    form.append('token', token);

    // Step 3: Submit the form
    const res = await axios.post('https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    // Step 4: Parse the response to get the image URL
    const $$ = cheerio.load(res.data);
    const imageUrl = $$('div.thumbnail > img').attr('src');
    if (!imageUrl) return reply("Failed to generate the neon logo.");

    const fullImageUrl = 'https://photooxy.com' + imageUrl;

    // Step 5: Send the image
    await conn.sendMessage(from, {
      image: { url: fullImageUrl },
      caption: `Here's your party neon logo for: *${q}*`,
      contextInfo: getContextInfo(m.sender)
    }, { quoted: mek });

  } catch (e) {
    console.error("Error in partyneon command:", e);
    reply("Something went wrong while generating the neon logo.");
  }
});
