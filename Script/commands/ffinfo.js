const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "ffinfo",
  version: "12.0.0",
  hasPermssion: 0,
  credits: "ALVI-BOSS",
  description: "Get Premium Free Fire Profile with Avatar & Banner",
  commandCategory: "game",
  usages: "[UID]",
  cooldowns: 15,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const uid = args[0];

  if (!uid || isNaN(uid)) return api.sendMessage("⚠️ দয়া করে একটি সঠিক UID দিন! উদাহরণ: /ffinfo 12345678", threadID, messageID);

  try {
    api.setMessageReaction("🔍", messageID, (err) => {}, true);
    
    // ১. ডাটা ফেচিং (Updated API)
    const { data } = await axios.get(`https://free-fire-api-sh-6.onrender.com/freefire/info?uid=${uid}`);
    
    if (!data.nickname) return api.sendMessage("❌ প্লেয়ার খুঁজে পাওয়া যায়নি!", threadID, messageID);

    // ২. ইমেজ ইউআরএল (Avatar & Banner)
    const avatarUrl = data.avatar_url || "https://i.imgur.com/8Y5z3fK.png";
    const bannerUrl = data.banner_url || "https://i.imgur.com/8Y5z3fK.png";
    const rankIcon = data.rank_icon || "https://i.imgur.com/8Y5z3fK.png";

    // ৩. ক্যানভাস ডিজাইন শুরু
    const canvas = createCanvas(1200, 700);
    const ctx = canvas.getContext('2d');

    // ব্যাকগ্রাউন্ড হিসেবে গেম ব্যানার ব্যবহার (Blurred & Darkened)
    const bannerImg = await loadImage(bannerUrl);
    ctx.filter = 'blur(10px) brightness(40%)';
    ctx.drawImage(bannerImg, 0, 0, 1200, 700);
    ctx.filter = 'none';

    // মেইন গ্লাস কার্ড ইফেক্ট
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    roundRect(ctx, 50, 50, 1100, 600, 40, true, false);
    ctx.strokeStyle = '#00f2ff';
    ctx.lineWidth = 4;
    roundRect(ctx, 50, 50, 1100, 600, 40, false, true);

    // ৪. ব্যানার ইমেজ ড্রয়িং (কার্ডের ভেতর ছোট করে)
    ctx.save();
    roundRect(ctx, 100, 100, 400, 200, 20, false, false);
    ctx.clip();
    ctx.drawImage(bannerImg, 100, 100, 400, 200);
    ctx.restore();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    roundRect(ctx, 100, 100, 400, 200, 20, false, true);

    // ৫. অবতার (Profile Picture)
    const avatarImg = await loadImage(avatarUrl);
    ctx.save();
    ctx.beginPath();
    ctx.arc(300, 300, 80, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImg, 220, 220, 160, 160);
    ctx.restore();
    ctx.strokeStyle = '#00f2ff';
    ctx.stroke();

    // ৬. টেক্সট এবং ডাটা রেন্ডারিং
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 55px sans-serif";
    ctx.fillText(data.nickname.toUpperCase(), 550, 160);

    ctx.fillStyle = "#00f2ff";
    ctx.font = "30px sans-serif";
    ctx.fillText(`UID: ${uid}`, 550, 210);

    // ইনফরমেশন গ্রিড
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    roundRect(ctx, 550, 250, 500, 300, 20, true, false);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(`Level: ${data.level || "N/A"}`, 580, 310);
    ctx.fillText(`Region: ${data.region || "BD"}`, 580, 370);
    ctx.fillText(`Like: ${data.likes || "0"} ❤️`, 580, 430);
    ctx.fillText(`Rank: ${data.rank || "Unknown"}`, 580, 490);

    // র‍্যাঙ্ক আইকন
    const rankImg = await loadImage(rankIcon);
    ctx.drawImage(rankImg, 950, 430, 80, 80);

    // ৭. সেভ এবং আউটপুট
    const outPath = path.join(__dirname, 'cache', `ff_${uid}.png`);
    if (!fs.existsSync(path.join(__dirname, 'cache'))) fs.mkdirSync(path.join(__dirname, 'cache'));
    fs.writeFileSync(outPath, canvas.toBuffer());

    api.setMessageReaction("✅", messageID, (err) => {}, true);

    return api.sendMessage({
      body: `🎮 𝗙𝗥𝗘𝗘 𝗙𝗜𝗥𝗘 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗜𝗡𝗙𝗢 🎮\n━━━━━━━━━━━━━━━━━━━━\n👤 𝗡𝗮𝗺𝗲: ${data.nickname}\n🆔 𝗨𝗜𝗗: ${uid}\n🏆 𝗥𝗮𝗻𝗸: ${data.rank}\n━━━━━━━━━━━━━━━━━━━━\n✨ 𝗗𝗲𝘀𝗶𝗴𝗻𝗲𝗱 𝗯𝘆 𝗔𝗟𝗩𝗜-𝗕𝗢𝗦𝗦`,
      attachment: fs.createReadStream(outPath)
    }, threadID, () => fs.unlinkSync(outPath), messageID);

  } catch (e) {
    console.error(e);
    api.sendMessage("❌ সার্ভার এরর! প্লেয়ার আইডি সঠিক কিনা চেক করুন।", threadID, messageID);
  }
};

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}
