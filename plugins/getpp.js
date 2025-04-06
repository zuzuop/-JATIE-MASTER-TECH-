const { cmd } = require("../command");

cmd({
  pattern: "getpp",
  alias: ["profilepic", "pp", "getprofilepic"],
  react: "📷",
  desc: "Get or Download someone's profile picture when replying to it",
  category: "utility",
  use: ".getpp [reply to profile picture]",
  filename: __filename
}, async (conn, m, store, { from, quoted, reply, sender }) => {
  try {
    const targetMsg = quoted || m;
    const mimeType = (targetMsg.msg || targetMsg).mimetype || "";

    // Check if the reply is an image (profile picture is usually sent as an image)
    if (!mimeType || !mimeType.includes("image")) {
      return reply("❌ Please reply to an image, especially a profile picture.");
    }

    const senderNumber = targetMsg.key.participant; // Get the number of the person whose profile picture is being requested
    const profilePicUrl = await conn.getProfilePicture(senderNumber); // Fetch profile picture URL

    if (!profilePicUrl) {
      return reply("❌ Could not retrieve the profile picture.");
    }

    // Send the profile picture as a message
    await conn.sendMessage(from, { image: { url: profilePicUrl }, caption: "Here's the profile picture!" }, { quoted: m });
  } catch (error) {
    console.error(error);
    await reply("❌ Error: " + (error.message || error));
  }
});
