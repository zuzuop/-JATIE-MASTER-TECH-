const config = require('../config'); const axios = require('axios'); const { cmd, commands } = require('../command'); const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions'); const fs = require('fs');

var imgmsg = "Give me an anime name!"; var descgs = "It gives details of the given anime name."; var cants = "I can't find this anime.";

//==================================================================================== //
cmd({ 
pattern: "garl", 
alias: ["imgloli"], 
react: '😎',
 desc: "Download anime loli images.", 
 category: "anime",
  use: '.loli', filename: __filename }, async (conn, mek, m, { from, quoted, reply }) => { try { let res = await axios.get('https://api.lolicon.app/setu/v2?num=1&r18=0&tag=lolicon'); let wm = Random Garl image\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ; await conn.sendMessage(from, { image: { url: res.data.data[0].urls.original }, caption: wm }, { quoted: mek }); } catch (e) { reply(cants); console.log(e); } });

//=====================================================================//
 cmd({
  pattern: "waifu", 
  alias: ["imgwaifu"],
   react: '💫', 
   desc: "Download anime waifu images.", category: "anime", 
   use: '.waifu', filename: __filename }, async (conn, mek, m, { from, quoted, reply }) => { try { let res = await axios.get('https://api.waifu.pics/sfw/waifu'); let wm = Random Waifu image\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ; await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm }, { quoted: mek }); } catch (e) { reply(cants); console.log(e); } });

//===================================================================== //
cmd({
 pattern: "neko",
  alias: ["imgneko"],
   react: '💫', 
   desc: "Download anime neko images.", category: "anime", 
   use: '.neko', filename: __filename }, async (conn, mek, m, { from, quoted, reply }) => { try { let res = await axios.get('https://api.waifu.pics/sfw/neko'); let wm = Random Neko image\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ; await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm }, { quoted: mek }); } catch (e) { reply(cants); console.log(e); } });

//=====================================================================//
 cmd({ 
 pattern: "megumin", 
 alias: ["imgmegumin"],
  react: '💕',
   desc: "Download anime megumin images.", category: "anime", 
   use: '.megumin', 
   filename: __filename }, async (conn, mek, m, { from, quoted, reply }) => { try { let res = await axios.get('https://api.waifu.pics/sfw/megumin');
    let wm = Random Megumin image\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ; await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm }, { quoted: mek }); } catch (e) { reply(cants); console.log(e); } });

//=====================================================================//
 cmd({ 
 pattern: "maid", 
 alias: ["imgmaid"], 
 react: '💫', 
 desc: "Download anime maid images.", category: "anime", 
 use: '.maid', filename: __filename }, async (conn, mek, m, { from, quoted, reply }) => { try { let res = await axios.get('https://api.waifu.im/search/?included_tags=maid'); let wm = Random Maid image\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ; await conn.sendMessage(from, { image: { url: res.data.images[0].url }, caption: wm }, { quoted: mek }); } catch (e) { reply(cants); console.log(e); } });

