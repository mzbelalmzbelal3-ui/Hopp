/** Don't change credits bro i will fix¯\_(ツ)_/¯ **/
module.exports.config = {
 name: "body",
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
 var hi = ["body\n┄┉❈✡️⋆⃝চাঁদেড়~পাহাড়✿⃝🪬❈┉┄"];
 var know = hi[Math.floor(Math.random() * hi.length)];
 var link = [ 
"https://i.imgur.com/HtKWgma.mp4",
"https://i.imgur.com/T0YDigG.mp4",
"https://i.imgur.com/n0vIGPL.mp4",
"https://i.imgur.com/3DmuzVK.mp4",
"https://i.imgur.com/3T9MDRN.mp4",
"https://i.imgur.com/OKe4qU9.mp4",
"https://i.imgur.com/mu9406G.mp4",
"https://i.imgur.com/soOacql.mp4",
"https://i.imgur.com/CDdnb47.mp4",
"https://i.imgur.com/3ejxOV4.mp4",
"https://i.imgur.com/HsX02Pw.mp4",
];
 var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/15.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/15.mp4")); 
 return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/15.mp4")).on("close",() => callback());
 };
