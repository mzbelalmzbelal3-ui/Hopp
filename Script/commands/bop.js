//========= bop.js ==========
const fs = require("fs");
const axios = require("axios");
const request = require("request");

module.exports.config = {
 name: "bop",
 version: "1.0.1",
 hasPermssion: 2,
 credits: "S H SAIM",
 description: "Bóp mông người bạn được tag (মজার ১৮+ কমান্ড)",
 commandCategory: "fun",
 usages: "bop @mentin",
 cooldowns: 5
};

module.exports.run = async ({ api event }) => {
 const link = [
 "https://i.postimg.cc/W43LzFn1/dkUlEBe.gif",
 "https://i.postimg.cc/mr5xHLN/squeeze-dat-ass-001.gif",
 "https://i.postimg.cc/V6rx9x2y/tumblr-0a7f78ae0514fd8654409bd7e2410068-a200b089-500.gif",
 "https://i.postimg.cc/rs573S8Q/tumblr-os64hm-Sc-AN1smwom8o10-1280.gif",
 "https://i.imgur.com/TjtVMOQ.gif",
 ];

 const mention = Object.keys(event.mentions);
 if (mention.length === 0)
 return api.sendMessage("⚠️ Please tag someone first!", event.threadID, event.messageID);

 const tag = event.mentions[mention[0]].replace("@", "");
 const gifUrl = link[Math.floor(Math.random() * link.length)];
 const filePath = __dirname + "/cache/bopmong.gif";

 const callback = () => {
 api.sendMessage(
 {
 body: `${tag}, yummy 🍑`,
 mentions: [{ tag, id: mention[0] }],
 attachment: fs.createReadStream(filePath),
 },
 event.threadID,
 () => fs.unlinkSync(filePath)
 );
 };

 request(encodeURI(gifUrl))
 .pipe(fs.createWriteStream(filePath))
 .on("close", callback);
};
