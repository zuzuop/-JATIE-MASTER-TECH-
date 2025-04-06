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
    // Ensure the message is a reply
    if (!quoted) return reply('❌ Reply to a message to get their profile picture!');

    // Get the sender of the original message (the one being replied to)
    const repliedUser = quoted.sender;

    // Fetch the profile picture of the user being replied to
    const profilePic = await conn.getProfilePicture(repliedUser);

    if (!profilePic) {
      return reply('❌ Sorry, I could not fetch the profile picture of the user.');
    }

    // Send the profile picture with a caption
    await conn.sendMessage(from, { image: { url: profilePic }, caption: '*PRINCE-TECH*' }, { quoted: m });

  } catch (error) {
    console.error('Error fetching profile picture:', error);
    await reply('❌ Sorry, I could not fetch the profile picture of the user.');
  }
});
