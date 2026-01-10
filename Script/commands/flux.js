const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "flux",
  version: "5.0.0",
  hasPermssion: 0,
  credits: "nexo_here",
  description: "Generate ultra-realistic AI images with advanced styles",
  commandCategory: "AI-IMAGE",
  usages: "<prompt> | [style]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  // ১. প্রম্পট চেক করা
  if (!args[0]) {
    return api.sendMessage(
      `❗ Please provide a prompt.\n\n📌 Example:\n• /flux a lion in jungle | realistic\n• /flux dragon on rooftop | fantasy`,
      threadID,
      messageID
    );
  }

  const input = args.join(" ").split("|");
  const rawPrompt = input[0].trim();
  let style = input[1]?.trim().toLowerCase() || "";

  // স্টাইল ম্যাপ
  const styleMap = {
    realistic: "photorealistic, ultra-detailed, 8K UHD, DSLR quality, natural lighting, depth of field",
    anime: "anime style, vibrant colors, sharp lines, cel shading, highly detailed character art",
    fantasy: "fantasy art, epic background, magical aura, dramatic lighting, mythical creatures",
    cyberpunk: "cyberpunk, neon lights, futuristic cityscape, dark atmosphere, high tech details",
    cartoon: "cartoon style, bold outlines, bright colors, 2D animation look, fun and playful",
    digital: "digital painting, smooth brush strokes, vivid colors, high detail",
    pixel: "pixel art style, retro gaming, 8-bit colors, sharp edges",
    portrait: "portrait photography, close-up, high detail, studio lighting"
  };

  let finalPrompt = rawPrompt;
  if (style) {
    if (styleMap[style]) {
      finalPrompt = `${rawPrompt}, ${styleMap[style]}`;
    } else {
      api.sendMessage("⚠️ Unknown style provided! Using your prompt as is.", threadID);
    }
  }

  api.sendMessage("🖼️ Generating your premium AI image...", threadID, messageID);

  try {
    // ২. API থেকে ইমেজ জেনারেট করা
    const apiUrl = `https://betadash-api-swordslush-production.up.railway.app/flux?prompt=${encodeURIComponent(finalPrompt)}`;
    const res = await axios.get(apiUrl);
    const imageUrl = res?.data?.data?.imageUrl;

    if (!imageUrl) throw new Error("API returned no image URL.");

    // ৩. ইমেজ সেভ এবং সেন্ড করা
    const cachePath = path.join(__dirname, 'cache', `flux_${senderID}_${Date.now()}.jpg`);
    
    // ক্যাশ ডিরেক্টরি নিশ্চিত করা
    if (!fs.existsSync(path.join(__dirname, 'cache'))) fs.mkdirSync(path.join(__dirname, 'cache'));

    const imgData = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(cachePath, Buffer.from(imgData.data));

    return api.sendMessage({
      body: `🧠 Prompt: ${rawPrompt}${style ? `\n🎨 Style: ${style}` : ""}`,
      attachment: fs.createReadStream(cachePath)
    }, threadID, () => fs.unlinkSync(cachePath), messageID);

  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ Failed to generate image. The API server might be down.", threadID, messageID);
  }
};
