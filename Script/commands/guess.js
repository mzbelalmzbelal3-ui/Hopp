const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "guess",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "mahu (Mirai Version)",
  description: "অ্যানিমে ক্যারেক্টার গেস করার গেম।",
  commandCategory: "game",
  usages: "",
  cooldowns: 5,
};

const cacheDir = path.join(__dirname, 'cache');

module.exports.run = async function ({ event, api, Currencies }) {
  const { threadID, messageID, senderID } = event;

  try {
    // এপিআই থেকে ডেটা ফেচ করা
    const response = await axios.get('https://global-prime-mahis-apis.vercel.app');
    const characters = response.data.data;
    
    const charactersArray = Array.isArray(characters) ? characters : [characters];
    
    // র‍্যান্ডম ক্যারেক্টার সিলেক্ট করা
    const randomIndex = Math.floor(Math.random() * charactersArray.length);
    const { image, traits, tags, fullName, firstName } = charactersArray[randomIndex];

    if (!fs.existsSync(cacheDir)) await fs.ensureDir(cacheDir);
    const imagePath = path.join(cacheDir, `guess_${senderID}.jpg`);

    const imageRes = await axios.get(image, { responseType: 'arraybuffer' });
    await fs.writeFile(imagePath, imageRes.data);

    const gameMsg = `Guess this handsome character:\n\nTraits: ${traits}\nTags: ${tags}\n\n(উত্তর দিতে এই মেসেজে রিপ্লাই দিন)`;
    
    return api.sendMessage({ 
      body: gameMsg, 
      attachment: fs.createReadStream(imagePath) 
    }, threadID, (err, info) => {
      // রিপ্লাই সেভ করা
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        correctAnswer: [fullName, firstName],
        senderID: senderID
      });

      // ১৫ সেকেন্ড পর অটোমেটিক ডিলিট
      setTimeout(() => {
        api.unsendMessage(info.messageID);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }, 15000);
    }, messageID);

  } catch (err) {
    console.error(err);
    api.sendMessage("গেমটি শুরু করার সময় একটি সমস্যা হয়েছে।", threadID, messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply, Currencies }) {
  const { senderID, body, messageID, threadID } = event;
  const { correctAnswer, senderID: originalSenderID, messageID: replyMsgID } = handleReply;

  // চেক করা যে আসল ব্যক্তি রিপ্লাই দিচ্ছে কি না
  if (senderID !== originalSenderID) return;

  try {
    const userAnswer = body.trim().toLowerCase();
    const correctAnswers = correctAnswer.map(ans => ans.toLowerCase());

    if (correctAnswers.includes(userAnswer)) {
      const reward = 1000;
      // মিরাই বটের টাকা যোগ করার সিস্টেম
      await Currencies.increaseMoney(senderID, reward);
      const userMoney = (await Currencies.getData(senderID)).money;

      api.sendMessage(
        `✅ Correct Answer!\n\n` +
        `💰 | 𝚈𝚘𝚞'𝚜 𝚆𝚊𝚕𝚕𝚎𝚝:\n` +
        `━━━━━━━━━━━━━━\n` +
        `💵 𝗕𝗮𝗹𝗮𝗻𝗰𝗲: ${userMoney}$\n` +
        `━━━━━━━━━━━━━━`,
        threadID,
        messageID
      );
    } else {
      api.sendMessage(`❌ Wrong! The correct answer was: ${correctAnswer.join(" or ")}`, threadID, messageID);
    }

    // গেম মেসেজ এবং ইউজারের উত্তর ডিলিট করা (ঐচ্ছিক)
    api.unsendMessage(replyMsgID);
    
  } catch (err) {
    console.error(err);
  }

  // রিপ্লাই লিস্ট থেকে সরিয়ে ফেলা
  const index = global.client.handleReply.indexOf(handleReply);
  if (index !== -1) global.client.handleReply.splice(index, 1);
};
