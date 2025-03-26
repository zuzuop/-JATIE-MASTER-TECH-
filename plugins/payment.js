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
