const { cmd } = require("../command"); // Import command handler

cmd({
  pattern: "binance",
  react: "💰",
  alias: ["payment"],
  desc: "Displays Binance payment details with your USD address.",
  category: "finance",
  use: ".binance",
  filename: __filename
}, 
async (conn, mek, m, { from }) => {
  try {
    const binanceImage = "https://raw.githubusercontent.com/Mayelprince/url/main/url/IMG-20250325-WA0057.jpg"; // Binance image URL
    const binanceID = "926949781";
    const usdAddress = "TQgh6GRGZWp2uqKBd668sbPTCqe5uxYyxK";

    const caption = `╔✦『 *BINANCE PAYMENT* 』✦╗
║💳 *Binance ID:* \`${binanceID}\`
║💵 *USD Address:* \`${usdAddress}\`
║🔗 *Send your payments securely!*
╚═══════════════╝`;

    await conn.sendMessage(from, { image: { url: binanceImage }, caption }, { quoted: m });
  } catch (error) {
    console.error("Error in Binance command:", error);
    await conn.sendMessage(from, { text: "❌ An error occurred while fetching Binance details." }, { quoted: m });
  }
});


cmd({
  pattern: "opay",
  react: "🏦",
  alias: ["bank", "payment2"],
  desc: "Displays Opay payment details.",
  category: "finance",
  use: ".opay",
  filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
  try {
    const opayImage = "https://raw.githubusercontent.com/Mayelprince/url/main/url/images.png"; // Image URL
    const accountNumber = "9151864541";
    const accountName = "Juwon Mayowa";
    const bankName = "Opay";

    const caption = `╔═✦『 *OPAY PAYMENT* 』✦═╗
║🏦 *Bank Name:* \`${bankName}\`
║👤 *Account Name:* \`${accountName}\`
║💳 *Account Number:* \`${accountNumber}\`
║🔗 *Make payments securely!*
║🖼️ *screenshot needed*
╚═════════════╝`;

    await conn.sendMessage(from, { image: { url: opayImage }, caption }, { quoted: mek });
  } catch (error) {
    console.error("Error in Opay command:", error);
    reply("❌ An error occurred while fetching Opay details.");
  }
});
