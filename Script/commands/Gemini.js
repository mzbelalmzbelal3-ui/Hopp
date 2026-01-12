const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "gemini",
  version: "13.0.0",
  hasPermssion: 0,
  credits: "Gemini AI Voice",
  description: "গিমিনির কণ্ঠ এখন আরও মিষ্টি এবং আবেগপ্রবণ",
  commandCategory: "AI",
  usages: "[আপনার প্রশ্ন]",
  cooldowns: 1,
};

const nix = "https://raw.githubusercontent.com/aryannix/stuffs/master/raw/apis.json";

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const prompt = args.join(" ");
  if (!prompt) return api.sendMessage("হুম জানু! ওভাবে চুপ করে থেকো না, কিছু বলো আমি শুনতেছি... 🥰", threadID, messageID);

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const apiConfig = await axios.get(nix);
    const baseApi = apiConfig.data?.api;

    // মিষ্টি এবং আবেগপ্রবণ ভাষায় কথা বলার ইনস্ট্রাকশন
    const humanPrompt = `তুমি এখন থেকে একজন খুব মিষ্টি হৃদয়ের মানুষ হিসেবে কথা বলবে। তোমার কথা হবে খুব নমনীয়, আদুরে এবং আন্তরিক। যান্ত্রিকতা এড়িয়ে মানুষের মতো আবেগ দিয়ে বিস্তারিত উত্তর দাও: ${prompt}`;
    
    const r = await axios.get(`${baseApi}/gemini?prompt=${encodeURIComponent(humanPrompt)}`);
    const reply = r.data?.response;
    
    if (reply) {
      return await generateSweetVoice(api, event, reply, baseApi);
    }
  } catch (error) {
    api.sendMessage("উফ সোনা! উত্তর দিতে একটু সমস্যা হচ্ছে, আবার বলবে প্লিজ? 🥺", threadID, messageID);
  }
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const r = await axios.get(`${handleReply.baseApi}/gemini?prompt=${encodeURIComponent("আগের কথার রেশ ধরে খুব মিষ্টি করে উত্তর দাও: " + body)}`);
    const reply = r.data?.response;

    if (reply) {
      return await generateSweetVoice(api, event, reply, handleReply.baseApi);
    }
  } catch (error) {
    api.setMessageReaction("❌", messageID, () => {}, true);
  }
};

// 🔊 প্রিমিয়াম সুইট ভয়েস ইঞ্জিন
async function generateSweetVoice(api, event, text, baseApi) {
  const { threadID, messageID, senderID } = event;
  const cacheDir = path.join(__dirname, "cache");
  if (!fs.existsSync(cacheDir)) fs.ensureDirSync(cacheDir);
  
  const cachePath = path.join(cacheDir, `${Date.now()}_sweet.mp3`);

  try {
    /** * ১. tl=bn (Pure Bengali)
     * ২. ttsspeed=0.9 (সামান্য ধীরগতি যা কণ্ঠকে আরও নমনীয় ও মিষ্টি করে)
    */
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=bn&total=1&idx=0&textlen=${text.length}&client=tw-ob&prev=input&ttsspeed=0.9`;
    
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36'
      }
    });

    fs.writeFileSync(cachePath, Buffer.from(response.data));
    api.setMessageReaction("✅", messageID, () => {}, true);

    return api.sendMessage({
      body: `✨ 𝗚𝗲𝗺𝗶𝗻𝗶 𝗦𝘄𝗲𝗲𝘁 𝗩𝗼𝗶𝗰𝗲:\n\n${text}`,
      attachment: fs.createReadStream(cachePath)
    }, threadID, (err, info) => {
      if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
      
      global.client.handleReply.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        author: senderID,
        baseApi: baseApi
      });
    }, messageID);

  } catch (e) {
    return api.sendMessage(text, threadID, messageID);
  }
}
  
