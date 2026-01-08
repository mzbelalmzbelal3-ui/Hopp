const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "bonk",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Meheraz | Muzan (Mirai Version)",
  description: "কাউকে বোনক (Bonk) করুন।",
  commandCategory: "fun",
  usages: "[Mention/Reply/UID]",
  cooldowns: 5,
};

// ইমেজ সার্কেল ক্রপ করার ফাংশন
async function circleCrop(buffer, size) {
  const img = await loadImage(buffer);
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(img, 0, 0, size, size);
  return canvas;
}

// মূল ইমেজ তৈরি করার ফাংশন
async function makeImage(one, two) {
  const bgURL = "https://i.postimg.cc/KYJ0VnK0/image0.png";
  const bg = await loadImage(bgURL);

  const width = 640;
  const height = 480;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(bg, 0, 0, width, height);

  const fetchPfp = async (id) => {
    const url = `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    return (await axios.get(url, { responseType: "arraybuffer" })).data;
  };

  const avtOne = await fetchPfp(one);
  const avtTwo = await fetchPfp(two);

  const circle1 = await circleCrop(avtOne, 110);
  const circle2 = await circleCrop(avtTwo, 90);

  ctx.drawImage(circle1, 60, 150); 
  ctx.drawImage(circle2, 500, 220); 

  const cacheDir = path.join(__dirname, 'cache');
  if (!fs.existsSync(cacheDir)) fs.mkdirpSync(cacheDir);
  
  const outPath = path.join(cacheDir, `bonk_${one}_${two}.png`);
  fs.writeFileSync(outPath, canvas.toBuffer("image/png"));
  return outPath;
}

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, senderID, mentions, messageReply } = event;

  try {
    let targetID;
    if (messageReply?.senderID) {
      targetID = messageReply.senderID;
    } else if (Object.keys(mentions).length > 0) {
      targetID = Object.keys(mentions)[0];
    } else if (args[0] && /^\d+$/.test(args[0])) {
      targetID = args[0];
    } else {
      return api.sendMessage("⚠ কাউকে মেনশন দিন, রিপ্লাই করুন অথবা UID ব্যবহার করুন।", threadID, messageID);
    }

    // টার্গেট ইউজারের নাম বের করা
    let targetName = "User";
    try {
        targetName = await Users.getNameUser(targetID);
    } catch (e) {
        targetName = "User";
    }

    api.setMessageReaction("⏳", messageID, () => {}, true);

    const file = await makeImage(senderID, targetID);

    api.sendMessage(
      {
        body: `${targetName} bonk nigga 🪓`,
        attachment: fs.createReadStream(file),
      },
      threadID,
      () => {
        if (fs.existsSync(file)) fs.unlinkSync(file);
      },
      messageID
    );
  } catch (err) {
    console.error(err);
    api.sendMessage("❌ এরর: " + err.message, threadID, messageID);
  }
};
