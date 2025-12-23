/** Don't change credits bro i will fix¯\_(ツ)_/¯ **/
module.exports.config = {
 name: "bl",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "BELAL BOTX666",
 description: "SAD VEDIO",
 commandCategory: "video",
 usages: "sad vedio",
 cooldowns: 5,
 dependencies: {
 "request":"",
 "fs-extra":"",
 "axios":""
 }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
 var hi = ["BL] \n┄┉❈✡️⋆⃝চাঁদেড়~পাহাড়✿⃝🪬❈┉┄"];
 var know = hi[Math.floor(Math.random() * hi.length)];
 var link = [ 
  "https://i.imgur.com/2MOezkV.mp4",
  "https://i.imgur.com/t9qQYXY.mp4",
  "https://i.imgur.com/sfrCllI.mp4",
  "https://i.imgur.com/wuWm4Zf.mp4",
  "https://i.imgur.com/8Cze5eR.mp4",
  "https://i.imgur.com/WbVxFiZ.mp4",
  "https://i.imgur.com/5pZ7avd.mp4",
  "https://i.imgur.com/rwJzo4j.mp4",
  "https://i.imgur.com/IIuGEnP.mp4",
  "https://i.imgur.com/PTcw69V.mp4",
  "https://i.imgur.com/X1UyvYg.mp4",
  "https://i.imgur.com/BXuOPCu.mp4",
  "https://i.imgur.com/iYCVlFm.mp4",
  "https://i.imgur.com/ToEnOF4.mp4",
  "https://i.imgur.com/CHe8W0x.mp4",
  "https://i.imgur.com/1MjqIFD.mp4",
  "https://i.imgur.com/OYsv5kE.mp4",
  "https://i.imgur.com/OuzACnd.mp4",
  "https://i.imgur.com/vBc1xu0.mp4",
  "https://i.imgur.com/ptGiFh3.mp4",
  "https://i.imgur.com/kEd15eO.mp4",
  "https://i.imgur.com/sUug0bN.mp4",
  "https://i.imgur.com/kkVEHsh.mp4",
  "https://i.imgur.com/AiAvenh.mp4",
  "https://i.imgur.com/8iKZtJH.mp4",
  "https://i.imgur.com/ISa89fg.mp4",
  "https://i.imgur.com/lzWbYuo.mp4",
];
 var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/15.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/15.mp4")); 
 return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/15.mp4")).on("close",() => callback());
 };
