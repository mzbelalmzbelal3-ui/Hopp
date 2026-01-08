const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

module.exports.config = {
  name: "goru",
  version: "2.3.0",
  hasPermssion: 0,
  credits: "ARIJIT × Ere'rious (Mirai Version)",
  description: "কাউকে গরু (Goru) বানিয়ে দিন!",
  commandCategory: "fun",
  usages: "[Mention/Reply]",
  cooldowns: 5,
};

module.exports.run = async function ({ event, api, Users }) {
  const { threadID, messageID, senderID, mentions, messageReply } = event;

  // টার্গেট আইডি নির্ধারণ
  let targetID = Object.keys(mentions)[0];
  if (messageReply) {
    targetID = messageReply.senderID;
  }

  if (!targetID) {
    return api.sendMessage("❗ কাউকে মেনশন দিন বা রিপ্লাই করুন তাকে গরু বানাতে! 😂", threadID, messageID);
  }

  if (targetID === senderID) {
    return api.sendMessage("❗ ব্রো, নিজেকে কেন গরু বানাতে চান? 🐮", threadID, messageID);
  }

  try {
    api.sendMessage("⌛️ একটু অপেক্ষা করুন...", threadID, (err, info) => {
        setTimeout(() => api.unsendMessage(info.messageID), 3000);
    }, messageID);

    // প্রোফাইল পিকচার ফেচ করার ফাংশন
    const fetchAvatar = async (uid) => {
      try {
        const avatarUrl = `https://graph.facebook.com/${uid}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
        const finalUrl = `${avatarUrl}&t=${Date.now()}`;

        const response = await axios.get(finalUrl, {
          responseType: "arraybuffer",
          timeout: 15000,
          headers: { "User-Agent": "Mozilla/5.0" },
        });

        return Buffer.from(response.data);
      } catch (error) {
        throw new Error("Could not fetch profile picture");
      }
    };

    const cacheDir = path.join(__dirname, "cache", "goru_cache");
    await fs.ensureDir(cacheDir);
    const bgPath = path.join(cacheDir, "cow_bg.jpg");

    let bgImage;
    if (fs.existsSync(bgPath)) {
      bgImage = await loadImage(await fs.readFile(bgPath));
    } else {
      const cowImgUrl = "https://files.catbox.moe/ecebko.jpg";
      const bgResponse = await axios.get(cowImgUrl, { responseType: "arraybuffer" });
      await fs.writeFile(bgPath, Buffer.from(bgResponse.data));
      bgImage = await loadImage(Buffer.from(bgResponse.data));
    }

    const avatarBuffer = await fetchAvatar(targetID);
    const avatarImage = await loadImage(avatarBuffer);

    const canvas = createCanvas(bgImage.width, bgImage.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bgImage, 0, 0);

    const avatarSize = 135;
    const headCenterX = 80 + avatarSize / 2;
    const headCenterY = 60 + avatarSize / 2;

    const avatarX = headCenterX - avatarSize / 2;
    const avatarY = headCenterY - avatarSize / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(headCenterX, headCenterY, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    // টেক্সট ড্রয়িং
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "white";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 5;
    ctx.fillText("Kire chdna", 40, 50);

    const outputPath = path.join(cacheDir, `goru_${targetID}_${Date.now()}.png`);
    await fs.writeFile(outputPath, canvas.toBuffer("image/png"));

    const tagName = await Users.getNameUser(targetID);

    await api.sendMessage({
      body: `🤣😹\n${tagName} একদম আসল গরু হয়েছে বিদেশী গরু! 🐮✨`,
      attachment: fs.createReadStream(outputPath),
    }, threadID, () => {
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    }, messageID);

  } catch (err) {
    console.error(err);
    return api.sendMessage("⚠️ কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।", threadID, messageID);
  }
};
