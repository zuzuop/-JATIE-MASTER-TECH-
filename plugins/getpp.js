const { cmd } = require("../command");

cmd({
  pattern: "getpp",
  alias: ["profilepic", "pp", "getprofilepic"],
  react: "📷",
  desc: "Download the profile picture of the person you are replying to",
  category: "utility",
  use: ".getpp [reply to someone’s message]",
  filename: __filename
}, async (conn, m, store, { from, quoted, reply, sender }) => {
  try {
    // If the message is a reply
    const targetMsg = quoted || m;
    const userNumber = targetMsg.key.participant || targetMsg.key.remoteJid;  // Get the sender's number

    // Handle the case where no participant/remoteJid is found
    if (!userNumber) {
      return reply("❌ Could not find the user in the reply.");
    }

    // Get the profile picture URL of the user
    const profilePicUrl = await conn.getProfilePicture(userNumber);

    if (!profilePicUrl) {
      return reply("❌ Could not retrieve the profile picture.");
    }

    // Download and send the profile picture
    await conn.sendMessage(from, { image: { url: profilePicUrl }, caption: "Here's the profile picture!" }, { quoted: m });
  } catch (error) {
    console.error(error);
    await reply("❌ Error: " + (error.message || error));
  }
});
