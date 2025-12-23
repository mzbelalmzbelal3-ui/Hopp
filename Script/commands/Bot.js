const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "x",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["bot না বেবি বলে ডাকো ✡️" ,];
  var rand = tl[Math.floor(Math.random() * tl.length)]

  var rand = tl[Math.floor(Math.random() * tl.length)]

    if ((event.body.toLowerCase() == "i miss you ") || (event.body.toLowerCase() == "i miss you 😞")) {
     return api.sendMessage("<আমি তোমাকে রাইতে মিস খাই🥹🤖👅/👅-✘  🎀 🍒:))", threadID);
   };

    if ((event.body.toLowerCase() == "😘") || (event.body.toLowerCase() == "😽")) {
     return api.sendMessage("আমাকে চুমু না দিয়ে আমার বস চাঁদের পাহাড় কে দে 🤬", threadID);
   };
   
    if ((event.body.toLowerCase() == "help") || (event.body.toLowerCase() == "help")) {
     return api.sendMessage("type /help", threadID);
   };
  
   if ((event.body.toLowerCase() == "কে আপনি") || (event.body.toLowerCase() == "তুমি কে")) {
     return api.sendMessage("simsimi কমান্ড এড় নাই টাইপ করুন baby", threadID);
   };
  
   if ((event.body.toLowerCase() == "ওই কিরে") || (event.body.toLowerCase() == "ওই কি রে") ||(event.body.toLowerCase() == "...") || (event.body.toLowerCase() == "...")) {
     return api.sendMessage("মধু মধু রসমালাই 🍆⛏️🐸🤣", threadID);
   };

   if ((event.body.toLowerCase() == "@Mst Sadiya") || (event.body.toLowerCase() == "সাদিয়া")) {
     return api.sendMessage("@Mst Sadiya এটা শুধুই আমার বস চাঁদের পাহাড় এর 🥰", threadID);
   };

   if ((event.body.toLowerCase() == "🥵") || (event.body.toLowerCase() == "💋")) {
     return api.sendMessage("কিরে হালা লুচ্চা, এগুলো কি ইমুজি দেস ।", threadID);
   };

   if ((event.body.toLowerCase() == "good morning everyone") || (event.body.toLowerCase() == "এই মাত্র ঘুম থেকে উঠলাম")) {
     return api.sendMessage("GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚", threadID);
   };

   if ((event.body.toLowerCase() == "Bal") || (event.body.toLowerCase() == "বাল")) {
     return api.sendMessage("~ আমার মালিক চাঁদের পাহাড় বলেছে 🤧🔪 যে বাল বাল করবে তার বাল যেন গরু ছেড়ে দেই 🤭 বাকিটা গুরু খেয়ে ফেলবে ?? 🤖", threadID);
   };

  if ((event.body.toLowerCase() == "Belal Bot X666") || (event.body.toLowerCase() == "baby তোমার পরিচয় দাও") || (event.body.toLowerCase() == "baby info") || (event.body.toLowerCase() == "X666")) {
     return api.sendMessage("Me AI chatbot ✡️ my name baby 🐥 my boss Belal YT 🪬🙂 আমাকে তৈরি করা হয়েছে গ্রুপে বিনোদন দেওয়ার জন্য 🙂 আমার নাম দেয়া হয়েছে বেবি আমাকে এই নামে ডাকলেই আমি সাড়া দেব 🤗🤗 আমাকে এডিট করেছেন চাঁদের পাহাড় ✡️ আমার ফাইল শুধু গ্রুপে কাজ করে ইনবক্সে না 😊 আমাকে যে কোন গ্রুপে এড করলেই আমি সেখানেই আপনাদেরকে বিনোদন দিতে পারি 🪬🫡 my boss Facebook ID https://www.facebook.com/mahi.gaming.165. my info /info 😘",threadID);

       
   };

   if ((event.body.toLowerCase() == "তোমার বস কে") || (event.body.toLowerCase() == "Tomar Boss k")) {
     return api.sendMessage("‎[𝐎𝐖𝐍𝐄𝐑:☞ Belal YT ッ ☜\n𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 Belal.\n𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝 :-https://www.facebook.com/share/1AUpnxThG3/ \nতার সাতে যোগা যোগ করবেন WhatsApp :- +01312893012", threadID);
   };

   if ((event.body.toLowerCase() == "Tor boss k") || (event.body.toLowerCase() == "তুমি কে")) {
     return api.sendMessage("My Creator:Belal YT ❤️ হাই আমি মেছেন্জার ROBOT  আামার বস চাঁদের পাহাড় আমাকে বানিয়েছেন আপনাদের কে হাসানোর জন্য আমি চাই আপনারা সব সময় হাসি খুশি থাকেন", threadID);
   };

  if ((event.body.toLowerCase() == "admin") || (event.body.toLowerCase() == "এডমিন")) {
     return api.sendMessage("He is Belal YT ッ❤️ তাকে সবাই চাঁদের পাহাড় নামে  চিনে My Boss🤙", threadID);
   };

   if ((event.body.toLowerCase() == "ai") || (event.body.toLowerCase() == "Ai")) {
     return api.sendMessage("If you want to use the AI command, type /ai ", threadID);
   };

  
   if ((event.body.toLowerCase() == "chup") || (event.body.toLowerCase() == "চুপ") || (event.body.toLowerCase() == "চুপ কর") || (event.body.toLowerCase() == "chup kor")) {
     return api.sendMessage("তুই চুপ কর পাগল ছাগল 🐐", threadID);
   };

  if ((event.body.toLowerCase() == "আসসালামু আলাইকুম") || (event.body.toLowerCase() == "Assalamualaikum") || (event.body.toLowerCase() == "Assalamu alaikum") || (event.body.toLowerCase() == "Salam ")) {
     return api.sendMessage("️- ওয়ালাইকুমুস-সালাম-!!🖤", threadID);
   };

   if ((event.body.toLowerCase() == "আমি চাঁদের পাহাড়") || (event.body.toLowerCase() == "বেশি হয়ে যাচ্ছে কিন্তু") || (event.body.toLowerCase() == "cup sala ami ullash") || (event.body.toLowerCase() == "madari")) {
     return api.sendMessage("সরি বস চাঁদের পাহাড় আমাকে মাফ করে দেন আর এমন ভুল হবে না🥺🙏", threadID);
   };

   if ((event.body.toLowerCase() == "@Mst Sadiya") || (event.body.toLowerCase() == "@Kolpona Akter")) {
     return api.sendMessage("খবরদার কেউ এই আইড়ি মেনশন দিবানা এটা আমার বস বিল্লাল এর বউ এর আইড়ি😠🥰⛏️", threadID);
   };

  if ((event.body.toLowerCase() == "@Mst Popy Rani") || (event.body.toLowerCase() == "@Alima Akter")) {
     return api.sendMessage("খবরদার কেউ এই নাম দরে ডাক দিবানা এটা আমার বস বিল্লাল এর বউ এর নাম..!😠🥰⛏️", threadID);
   };
  
  if ((event.body.toLowerCase() == "Nadiya") || (event.body.toLowerCase() == "@Kolpona Akter ")) {
     return api.sendMessage("খবরদার কেউ এই নাম দরে ডাক দিবানা এটা আমার মালিক চাঁদের পাহাড় এর বউ এর নাম..!😠🥰⛏️", threadID);
   };

  if ((event.body.toLowerCase() == "Mim") || (event.body.toLowerCase() == "মিম")) {
     return api.sendMessage("খবরদার কেউ এই নাম দরে ডাক দিবানা এটা আমার বস চাঁদের পাহাড় এর বউ এর নাম..!😠🥰⛏️", threadID);
   };

  if ((event.body.toLowerCase() == "@রাফি ইসলাম চৌধুরী") || (event.body.toLowerCase() == "রিপন")) {
     return api.sendMessage("🥰-রিপন-🌺 আমার বস বিল্লাল'র লুচ্চা বন্ধু বেটা এক নাম্বারের শয়তান 😠🥰⛏️", threadID);
   };

   if ((event.body.toLowerCase() == "KISS ME") || (event.body.toLowerCase() == "kiss me")) {
     return api.sendMessage("️ তুমি পঁচা তোমাকে কিস দিবো না 🤭", threadID);
   };

   if ((event.body.toLowerCase() == "tnx") || (event.body.toLowerCase() == "ধন্যবাদ") || (event.body.toLowerCase() == "thank you") || (event.body.toLowerCase() == "thanks")) {
     return api.sendMessage("️এতো ধন্যবাদ না দিয়ে পারলে তোর গার্লফ্রেন্ডকে আমার মালিক চাঁদের পাহাড় কে দিয়ে দে..!🌚⛏️🌶️", threadID);
   };

   if ((event.body.toLowerCase() == "🙄🙄") || (event.body.toLowerCase() == "😒😒😒") || (event.body.toLowerCase() == "😠") || (event.body.toLowerCase() == "🤬") || (event.body.toLowerCase() == "😾")) {
     return api.sendMessage("️রাগ করে না সোনা পাখি এতো রাগ শরীরের জন্য ভালো না 🥰", threadID);
   };

   if ((event.body.toLowerCase() == "জানি না") || (event.body.toLowerCase() == "Jani na")) {
     return api.sendMessage("️ জানি না জানি না করা এটা মেয়েদের অভ্যাস🤬⛏️😷", threadID);
   };

   if ((event.body.toLowerCase() == "🪬") || (event.body.toLowerCase() == "✡️") || (event.body.toLowerCase() == "Tor nam ki")) {
     return api.sendMessage("️MY NAME IS°_>✦──⃝‌‌𝔹𝔼𝕃𝔸𝕃 𝔹𝕆𝕋 ✡️─✦", threadID);
   };

   if ((event.body.toLowerCase() == "বাচ্চা") || (event.body.toLowerCase() == "বটের বাচ্চা")) {
     return api.sendMessage("️আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️🌶️ ", threadID);
   };

   if ((event.body.toLowerCase() == "তোমাকে ভালোবাসি") || (event.body.toLowerCase() == "i love you")) {
     return api.sendMessage("️ আমার বস চাঁদের পাহাড়ের ভালোবাসা নেবেন 😒", threadID);
   };

   if ((event.body.toLowerCase() == "moriom") || (event.body.toLowerCase() == "ex")) {
     return api.sendMessage("️Kiss Randi Ka Name Le Ke Mood Khrab Kr Diya.🙄 Dubara Naam Mat Lena Iska", threadID);
   };

   if ((event.body.toLowerCase() == "বোকাচোদা") || (event.body.toLowerCase() == "tor nanire xudi")) {
     return api.sendMessage("️এত চোদা চুদি করস কেনো দেখা যাবে বাসর-রাতে-তুই-কতো পারিস..!🥱🌝🌚⛏️🌶️ ", threadID);
   };

   if ((event.body.toLowerCase() == "😓") || (event.body.toLowerCase() == "😔")) {
     return api.sendMessage("️কি গো কলিজা তোমার কি মন খারাপ🥺", threadID);
   };
  
   if ((event.body.toLowerCase() == "🤨") || (event.body.toLowerCase() == "🧐")) {
     return api.sendMessage("️ এইদিকে ওইদিকে কি দেখো জানু আমি তোমার সামনে দেখো😘", threadID);
   };

   if ((event.body.toLowerCase() == "ধুর বাল 😒") || (event.body.toLowerCase() == "বাল কও 😒") || (event.body.toLowerCase() == "Aj kew nai bole")) {
     return api.sendMessage("️ কি হয়েছে বস চাঁদের পাহাড় এত বিরক্ত হচ্ছেন কেন 🫶/n i love you boss", threadID);
   };

   if ((event.body.toLowerCase() == "gf") || (event.body.toLowerCase() == "গার্লফ্রেন্ড")) {
     return api.sendMessage("খালি কি তোরাই পেম করবি আমার বস চাঁদের পাহাড় কেও এটা দে<🥺", threadID);
   };
   
   if ((event.body.toLowerCase() == "😵‍💫") || (event.body.toLowerCase() == "😵‍💫") || (event.body.toLowerCase() == "😆") || (event.body.toLowerCase() == "🤣") || (event.body.toLowerCase() == "😸") || (event.body.toLowerCase() == "😹")) {
     return api.sendMessage("🤣", threadID);
   };

   if ((event.body.toLowerCase() == "💓") || (event.body.toLowerCase() == "🫶") || (event.body.toLowerCase() == "😻") || (event.body.toLowerCase() == "❤️")) {
     return api.sendMessage("ভালোবাসা নামক আবলামী করতে চাইলে আমার মালিক চাঁদের পাহাড় এর ইনবক্সে চলে যা পাগল ছাগল🌚🐸🌶️🍆", threadID);
   };

   if ((event.body.toLowerCase() == "আপনি কেমন আছেন") || (event.body.toLowerCase() == "কেমন আছেন") || (event.body.toLowerCase() == "Kmon acho") || (event.body.toLowerCase() == "how are you") || (event.body.toLowerCase() == "how are you?")) {
     return api.sendMessage("আমি তখনই ভালো থাকি যখন আপনাকে হাসতে দেখি🤎☺️", threadID);
   };

   if ((event.body.toLowerCase() == "তুই লুচ্চা") || (event.body.toLowerCase() == "tmr ki mon kharap")) {
     return api.sendMessage("আমার সাদা মনে কোনো কাদা নাই কিন্তু আমার বসের মনে আছে ...!🌝", threadID);
   };

   if ((event.body.toLowerCase() == "i love you") || (event.body.toLowerCase() == "Love you") || (event.body.toLowerCase() == "I Love You") || (event.body.toLowerCase() == "ভালোবাসি") || (event.body.toLowerCase() == "i love you")) {
     return api.sendMessage("সব মুতার জায়গায় গুঁতা দেওয়ার ধান্দা 😪🥱", threadID);
   };

     if ((event.body.toLowerCase() == "by") || (event.body.toLowerCase() == "আল্লাহ হাফেজ") || (event.body.toLowerCase() == "জাইগা") || (event.body.toLowerCase() == "বাই") || (event.body.toLowerCase() == "pore kotha hbe") || (event.body.toLowerCase() == "যাই গা")) {
     return api.sendMessage("কিরে তুই কই যাস চিপা বাজ 🙂 আমার বস চাঁদের পাহাড় কে নিয়ে যা বেচারা সারাদিন গ্রুপে একা একা থাকে..!🌚🌶️🍆⛏️", threadID);
   };

   if ((event.body.toLowerCase() == "খাওয়া দাওয়া হয়েছে") || (event.body.toLowerCase() == "খাবার খাইছো")) {
     return api.sendMessage("না ঝাং 🥹 তুমি রান্না করে রাখো আমি এসে খাবো <😘", threadID);
   };

   if ((event.body.toLowerCase() == "@Mst Sadiya") || (event.body.toLowerCase() == "@Mst Popy Rani")) {
     return api.sendMessage("কেউ নজর দিবি না এগুলো আমার মালিক চাঁদের পাহাড় এর গার্লফ্রেন্ড ", threadID);
   };

   if ((event.body.toLowerCase() == "🪬") || (event.body.toLowerCase() == "✡️")) {
     return api.sendMessage("হ্যা বস চাঁদের পাহাড় কেমন আছেন সব কিছু ঠিক আছে তো আমি বেয়াদব করে থাকলে মাফ করে দিবে ..?☺️", threadID);
   };
  mess = "{name}"
  
  if (event.body.indexOf("x") == 0 || (event.body.indexOf("x") == 0)) {
    var msg = {
      body: `${name}, ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
            
