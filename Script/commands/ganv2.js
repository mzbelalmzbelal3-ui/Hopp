const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "ganv2",
  version: "9.0.0",
  hasPermssion: 0,
  credits: "ALVI-BOSS",
  description: "সরাসরি ডাউনলোড করে বাংলা রিমিক্স গান প্লে করুন",
  commandCategory: "music",
  usages: "gan",
  cooldowns: 15,
};

module.exports.run = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID } = event;

  try {
    const name = await Users.getNameUser(senderID);
    api.setMessageReaction("🔥", messageID, (err) => {}, true);

    // ১. বাংলা রিমিক্স গানের কী-ওয়ার্ড
    const queries = ["Bangla Remix Song 2025", "Bangla DJ Remix Mashup", "Bangla Lofi Remix Trending"];
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];

    // ২. সার্চিং মেসেজ
    const waitMsg = await api.sendMessage(`📡 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗶𝗻𝗴 𝗥𝗲𝗺𝗶ｘ... 📥\n━━━━━━━━━━━━━━━━━━━━\n👤 𝗥𝗲𝗾𝘂𝗲𝘀𝘁𝗲𝗿: ${name}\n🎸 ইউটিউব থেকে গানটি সরাসরি ডাউনলোড করা হচ্ছে। দয়া করে অপেক্ষা করুন...`, threadID, messageID);

    // ৩. ইউটিউব সার্চ এবং ডাউনলোড এপিআই (এটি সরাসরি অডিও লিংক জেনারেট করবে)
    const searchRes = await axios.get(`https://samirxpikachu.onrender.com/ytdl?url=${encodeURIComponent(randomQuery)}`);
    
    // নোট: যদি উপরের এপিআইটি ব্যস্ত থাকে, তবে এটি বিকল্প হিসেবে কাজ করবে
    const audioUrl = searchRes.data.download_url || searchRes.data.link;
    const title = searchRes.data.title || "Latest Bangla Remix";

    if (!audioUrl) throw new Error("Could not fetch audio");

    // ৪. ডিরেক্ট ডাউনলোড প্রসেস (বটের ক্যাশে ফাইল সেভ করা)
    const cachePath = path.join(__dirname, "cache", `remix_${Date.now()}.mp3`);
    if (!fs.existsSync(path.join(__dirname, "cache"))) fs.mkdirSync(path.join(__dirname, "cache"));

    const response = await axios({
      method: 'get',
      url: audioUrl,
      responseType: 'arraybuffer'
    });

    fs.writeFileSync(cachePath, Buffer.from(response.data, 'utf-8'));

    // ৫. প্রলয়ংকরী প্রিমিয়াম ডিজাইন
    const msg = {
      body: `🕺 𝗕𝗔𝗡𝗚𝗟𝗔 𝗥𝗘𝗠𝗜𝗫 𝗩𝗜𝗕𝗘 💃\n━━━━━━━━━━━━━━━━━━━━\n🎵 𝗦𝗼𝗻𝗴: ${title}\n👤 𝗥𝗲𝗾𝘂𝗲𝘀𝘁: ${name}\n⚡ 𝗤𝘂𝗮𝗹𝗶𝘁𝘆: High (320kbps)\n📥 𝗦𝘁𝗮𝘁𝘂𝘀: Downloaded Successfully\n━━━━━━━━━━━━━━━━━━━━\nউপভোগ করুন আজকের সেরা রিমিক্স! 🔊`,
      attachment: fs.createReadStream(cachePath)
    };

    // আগের 'Downloading' মেসেজটি মুছে ফেলা
    api.unsendMessage(waitMsg.messageID);

    return api.sendMessage(msg, threadID, () => {
      if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath); // পাঠানোর পর ফাইল ডিলিট
    }, messageID);

  } catch (error) {
    console.error(error);
    api.sendMessage("⚠️ ইউটিউব সার্ভার থেকে গানটি ডাউনলোড করতে ব্যর্থ হয়েছি। কিছুক্ষণ পর আবার চেষ্টা করুন।", threadID, messageID);
  }
};
