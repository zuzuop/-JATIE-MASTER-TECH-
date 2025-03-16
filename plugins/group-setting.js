const fs = require('fs');
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')



//vcf//

cmd({
    pattern: 'savecontact',
    alias: ["vcf","scontact"],
    desc: 'gc vcard',
    category: 'group',
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply("This command is for groups only.");
        if (!isOwner) return reply("*_This command is for the owner only_*");

        let card = quoted || m; // Handle if quoted message exists
        let cmiggc = groupMetadata;
        const { participants } = groupMetadata;
        
        let orgiggc = participants.map(a => a.id);
        let vcard = '';
        let noPort = 0;
        
        for (let a of cmiggc.participants) {
            vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${a.id.split("@")[0]}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`;
        }

        let nmfilect = './contacts.vcf';
        reply('Saving ' + cmiggc.participants.length + ' participants contact');

        fs.writeFileSync(nmfilect, vcard.trim());
        await sleep(2000);

        await conn.sendMessage(from, {
            document: fs.readFileSync(nmfilect), 
            mimetype: 'text/vcard', 
            fileName: 'prince_tech.vcf', 
            caption: `\nDone saving.\nGroup Name: *${cmiggc.subject}*\nContacts: *${cmiggc.participants.length}*`
        }, { quoted: mek });

        fs.unlinkSync(nmfilect); // Cleanup the file after sending
    } catch (err) {
        reply(err.toString());
    }
});




//join//
cmd({
    pattern: "join",
    react: "📬",
    alias: ["joinme","f_join"],
    desc: "To Join a Group from Invite link",
    category: "group",
    use: '.join < Group Link >',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/kingmalvn/KING-DATA/refs/heads/main/MSG/mreply.json')).replyMsg

if (!isCreator && !isDev && !isOwner && !isMe) return reply(msr.own_cmd)
if (!q) return reply("*Please write the Group Link 🖇️*")
 let result = args[0].split('https://chat.whatsapp.com/')[1]
 await conn.groupAcceptInvite(result)
     await conn.sendMessage(from , { text: `*Successfully Joined ✅*`}, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )


//kick//


cmd({
    pattern: "kick",
    alias: [".."],
    desc: "Kicks replied/quoted user from group.",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
  },           
      async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
     try {
         if (!m.isGroup) return reply(`only for groups`);
    if (!isBotAdmins) return reply(`I can't do that. give group admin`);
  
  
      const user = m.quoted.sender;
      if (!user) return reply(`*Please give me a user to kick ❗*`);
      await conn.groupParticipantsUpdate(m.chat, [user], "remove");
     reply(`${user} *has been kicked out of the group!* \n\n${yn} `);
    } catch (e) {
  reply('*Done ✓✓*')
  l(e)
  }
  })

cmd({
    pattern: "revoke",
    react: "🖇️",
    alias: ["revokegrouplink","resetglink","revokelink","f_revoke"],
    desc: "To Reset the group link",
    category: "group",
    use: '.revoke',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/kingmalvn/KING-DATA/refs/heads/main/MSG/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
await conn.groupRevokeInvite(from)
 await conn.sendMessage(from , { text: `*Group link Reseted* ⛔`}, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )


cmd({
    pattern: "promote",
    react: "🥏",
    alias: ["addadmin"],
    desc: "To Add a participatant as a Admin",
    category: "group",
    use: '.promote',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/kingmalvn/KING-DATA/refs/heads/main/MSG/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)   
	
		let users = mek.mentionedJid ? mek.mentionedJid[0] : mek.msg.contextInfo.participant || false;
	
	if (!users) return reply("*Couldn't find any user in context* ❌")
	
		const groupAdmins = await getGroupAdmins(participants) 
		if  ( groupAdmins.includes(users)) return reply('❗ *User Already an Admin*  ✔️')
		    await conn.groupParticipantsUpdate(from, [users], "promote")
			await conn.sendMessage(from,{text:`*_User promoted as an Admin_*`},{quoted:mek })
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )

cmd({
    pattern: "demote",
    react: "🥏",
    alias: ["removeadmin"],
    desc: "To Demote Admin to Member",
    category: "group",
    use: '.demote',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/kingmalvn/KING-DATA/refs/heads/main/MSG/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
		let users = mek.mentionedJid ? mek.mentionedJid[0] : mek.msg.contextInfo.participant || false;
			if (!users) return reply("*Couldn't find any user in context* ❌")
		const groupAdmins = await getGroupAdmins(participants) 
		if  ( !groupAdmins.includes(users)) return reply('❗ *User Already not an Admin*')
		    await conn.groupParticipantsUpdate(from, [users], "demote")
			await conn.sendMessage(from,{text:`*_User No longer an Admin_*`},{quoted:mek })
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )

cmd({
    pattern: "taggp",
    react: "🔊",
    alias: ["tggp","djtaggp"],
    desc: "To Tag all Members for Message",
    category: "group",
    use: '.tag Hi',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
		if ( !m.quoted ) return reply('*Please mention a message* ℹ️')
		if(!q) return reply('*Please add a Group Jid* ℹ️')
		//if ( q == "120363372230280282@g.us" ) { if ( !isDev ) return reply("❌ *Acai wage ! You can send Tag messages to Official Support Group*") }
		let teks = `${m.quoted.msg}`
        conn.sendMessage(q, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek })
                
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )

cmd({
    pattern: "ginfo",
    desc: "Get group information.",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    isGroup,
    isAdmins,
    isOwner,
    isBotAdmins,
    reply
}) => {
    try {
        // Ensure the command is used in a group
        if (!isGroup) return reply("*`[❌]`This command can only be used in groups.*");

        // Only admins or the owner can use this command
        if (!isAdmins && !isOwner) return reply("*`[❌]`Only admins and the owner can use this command.*");

        // Ensure the bot has admin privileges
        if (!isBotAdmins) return reply("*`[❌]`I need admin privileges to execute this command.*");

        // Get group metadata
        const groupMetadata = await conn.groupMetadata(from);
        const groupName = groupMetadata.subject;
        const memberCount = groupMetadata.participants.length;

        // Get group creator
        let creator = groupMetadata.owner ? `@${groupMetadata.owner.split('@')[0]}` : 'Unknown';

        // Get list of admins
        const groupAdmins = groupMetadata.participants
            .filter(member => member.admin)
            .map((admin, index) => `${index + 1}. @${admin.id.split('@')[0]}`)
            .join("\n") || "No admins found";

        // Get creation date (convert from timestamp)
        const creationDate = groupMetadata.creation 
            ? new Date(groupMetadata.creation * 1000).toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }) 
            : 'Unknown';

        // Format the output message
        const message = `
╭───「 *GROUP INFORMATION* 」───◆  
│ 🏷️ *Group Name:* ${groupName}  
│ 🆔 *Group ID:* ${from}  
│ 👥 *Total Members:* ${memberCount}  
│ 👑 *Creator:* ${creator}  
│ 📅 *Created On:* ${creationDate}  
│ 🚻 *Admins:*  
│ ${groupAdmins}  
╰──────────────────────────◆`;

        // Send the group information with mentions
        await conn.sendMessage(from, {
            text: message,
            mentions: groupMetadata.participants
                .filter(member => member.admin)
                .map(admin => admin.id)
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in ginfo command:", error);
        reply("❌ An error occurred while retrieving the group information.");
    }
});

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        
        const botOwner = conn.user.id.split(":")[0]; // Extract bot owner's number
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("❌ Only group admins or the bot owner can use this command.");
        }

        // Ensure group metadata is fetched properly
        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ No members found in this group.");

        let emojis = ['🍇', '🌻', '🎗️', '🔮', '❤‍🩹', '🦋', '☃️', '🩵', '📝', '💗', '🔖', '🪩', '📦', '🌸', '🛡️', '💸', '🐍', '🗿', '🚀', '🎧', '🪀', '⚡', '🚩', '🍁', '🗣️', '👻', '⚠️', '🔥'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Ensure message is properly extracted
        let message = (m.body || "").slice((prefix + command).length).trim();
        if (!message) message = "ATTENTION EVERYONE!"; // Default message

        let teks = `*▢ GROUP : ${groupName}*\n*▢ MEMBERS : ${totalMembers}*\n*▢ MESSAGE : ${message}*\n\n┌───❒ *MENTIONS*\n`;

        for (let mem of participants) {
            if (!mem.id) continue; // Prevent undefined errors
            teks += `${randomEmoji}🪾͎᪳᪳𝆺ྀི𝅥 @${mem.id.split('@')[0]}\n`;
        }


        conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});
//add//

cmd({
    pattern: "add",
    alias: ["invite"],
    desc: "Adds a user to the group.",
    category: "group",
    filename: __filename,
    use: '<number>',
},           
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the command is used in a group
        if (!m.isGroup) return reply(`This command is only for groups.`);
        
        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply(`I need admin privileges to add users.`);
        
        // Check if the number is provided (from q or args)
        if (!q || isNaN(q)) return reply('Please provide a valid phone number to add.');
        
        const userToAdd = `${q}@s.whatsapp.net`;  // Format the phone number

        // Add the user to the group
        await conn.groupParticipantsUpdate(m.chat, [userToAdd], "add");

        // Confirm the addition
        reply(`User ${q} has been added to the group.`);
    } catch (e) {
        console.error('Error adding user:', e);
        reply('An error occurred while adding the user. Please make sure the number is correct and they are not already in the group.');
    }
});


cmd({
    pattern: "setgcdesc",
    alias: ["upgdesc", "gdesc"],
    react: "📜",
    desc: "Change the group description.",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, args, q, reply }) => {
    try {
        if (!isGroup) return reply("*📛 This command can only be used in groups.*");
        if (!isAdmins) return reply("*❌ Only group admins can use this command.*");
        if (!isBotAdmins) return reply("❌ I need to be an admin to update the group description.");
        if (!q) return reply("*❌ Please provide a new group description.*");

        await conn.groupUpdateDescription(from, q);
        reply("*✅ Group description has been updated.*");
    } catch (e) {
        console.error("Error updating group description:", e);
        reply("❌ Failed to update the group description. Please try again.");
    }
});

cmd({
    pattern: "setgcname",
    alias: ["upgname", "gname"],
    react: "📝",
    desc: "Change the group name.",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, args, q, reply }) => {
    try {
        if (!isGroup) return reply("*📛 This command can only be used in groups.*");
        if (!isAdmins) return reply("❌ Only group admins can use this command.");
        if (!isBotAdmins) return reply("*📛 I need to be an admin to update the group name.*");
        if (!q) return reply("*⁉️ Please provide a new group name.*");

        await conn.groupUpdateSubject(from, q);
        reply(`✅ Group name has been updated to: *${q}*`);
    } catch (e) {
        console.error("Error updating group name:", e);
        reply("❌ Failed to update the group name. Please try again.");
    }
});

//delete//

cmd({
    pattern: "delete",
    react: "⛔",
    alias: [","],
    desc: "delete message",
    category: "group",
    use: '.del',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const key = {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.quoted.id,
                    participant: m.quoted.sender
                }
                await conn.sendMessage(m.chat, { delete: key })
} catch (e) {
reply('*Error !!*')
l(e)
}
})



cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group",
    react: "🎉",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {

        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }
        

        const botOwner = conn.user.id.split(":")[0]; 
        if (senderNumber !== botOwner) {
            return reply("*📛 Only the bot owner can use this command.*");
        }

        reply("*Leaving group...*");
        await sleep(1500);
        await conn.groupLeave(from);
        reply("*Goodbye! 👋*");
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

cmd({
    pattern: "lockgc",
    alias: ["lock"],
    react: "🔒",
    desc: "Lock the group (Prevents new members from joining).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins) return reply("*📛 Only group admins can use this command.*");
        if (!isBotAdmins) return reply("*📛 I need to be an admin to lock the group.*");

        await conn.groupSettingUpdate(from, "locked");
        reply("*✅ Group has been locked. New members cannot join.*");
    } catch (e) {
        console.error("Error locking group:", e);
        reply("❌ Failed to lock the group. Please try again.");
    }
});

cmd({
    pattern: "mute",
    alias: ["groupmute"],
    react: "🔇",
    desc: "Mute the group (Only admins can send messages).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins) return reply("*📛 Only group admins can use this command.*");
        if (!isBotAdmins) return reply("*📛 I need to be an admin to mute the group.*");

        await conn.groupSettingUpdate(from, "announcement");
        reply("*_✅ Group has been muted. Only admins can send messages._*");
    } catch (e) {
        console.error("Error muting group:", e);
        reply("❌ Failed to mute the group. Please try again.");
    }
});

cmd({
    pattern: "unmute",
    alias: ["groupunmute"],
    react: "🔊",
    desc: "Unmute the group (Everyone can send messages).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins) return reply("*📛 Only group admins can use this command.*");
        if (!isBotAdmins) return reply("❌ I need to be an admin to unmute the group.");

        await conn.groupSettingUpdate(from, "not_announcement");
        reply("*_✅ Group has been unmuted. Everyone can send messages._*");
    } catch (e) {
        console.error("Error unmuting group:", e);
        reply("❌ Failed to unmute the group. Please try again.");
    }
});

cmd({
    pattern: "unlockgc",
    alias: ["unlock"],
    react: "🔓",
    desc: "Unlock the group (Allows new members to join).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins) return reply("*📛 Only group admins can use this command.*");
        if (!isBotAdmins) return reply("*📛 I need to be an admin to unlock the group.*");

        await conn.groupSettingUpdate(from, "unlocked");
        reply("✅ Group has been unlocked. New members can now join.");
    } catch (e) {
        console.error("Error unlocking group:", e);
        reply("❌ Failed to unlock the group. Please try again.");
    }
});

cmd({
    pattern: "tag",
    react: "🔊",
    desc: "To tag all members with a message",
    category: "group",
    use: '.tag Hi',
    filename: __filename
}, async (conn, mek, m, { from, senderNumber, participants, q, reply }) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("*📛 Only the bot owner can use this command.*");
        }

        if (!q) return reply('*Please provide a message to send.* ℹ️');

        conn.sendMessage(from, { text: q, mentions: participants.map(a => a.id), linkPreview: true }, { quoted: mek });

    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        console.log(e);
        reply(`❌ *Error Occurred !!*\n\n${e}`);
    }
});
			       

cmd({
    pattern: "demoteall",
    desc: "Demote all group admins except the bot and the command user (Owner Only)",
    category: "group",
    isOwner: true, // Only the owner can use this command
    use: ".demoteall"
  }, async (conn, mek, m, { from, reply }) => {
    try {
      // Ensure the command is used in a group
      if (!m.isGroup) return reply("❌ This command can only be used in groups.");
  
      // Get the group metadata
      const groupData = await conn.groupMetadata(from);
  
      // Filter all admins and exclude both the bot and the command sender
      const admins = groupData.participants
        .filter(p => p.admin !== null) // Select only admins
        .map(p => p.id)
        .filter(id => id !== conn.user.jid && id !== m.sender); // Exclude the bot and the command user
  
      if (admins.length === 0) {
        return reply("✅ No admins to demote.");
      }
  
      // Demote all filtered admins
      await conn.groupParticipantsUpdate(from, admins, "demote");
  
      return reply("✅ All group admins have been demoted except the bot and you.");
    } catch (error) {
      console.error("Error in demoteall command:", error);
      return reply(`❌ An error occurred: ${error.message}`);
    }
  });
