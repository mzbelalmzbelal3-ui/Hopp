module.exports.config = {
	name: "god",
	eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
	version: "1.0.0",
	credits: "BELAL BOTX666",
	description: "Record bot activity notifications!",
	envConfig: {
		enable: true
	}
};

module.exports.run = async function({ api, event, Threads }) {
	const logger = require("../../utils/log");
	if (!global.configModule[this.config.name].enable) return;
	
	let formReport = "===✡️⃝🅰🅳🅼🅸🅽 ◎⃝😘─͢͢চৃাঁদেৃঁরৃঁ পাৃঁহা্ঁড়ৃঁ✡️⎞🪽 Notification ===" +
					"\n\n» Thread ID: " + event.threadID +
					"\n» Action: {task}" +
					"\n» Action created by userID: " + event.author +
					"\n» " + Date.now() + " «";
	
	let task = "";
	
	switch (event.logMessageType) {
		case "log:thread-name": {
			const oldName = (await Threads.getData(event.threadID)).name || "Name does not exist";
			const newName = event.logMessageData.name || "Name does not exist";
			task = "User changed group name from: '" + oldName + "' to '" + newName + "'";
			await Threads.setData(event.threadID, { name: newName });
			break;
		}
		case "log:subscribe": {
			if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
				task = "The user added the bot to a new group!";
			}
			break;
		}
		case "log:unsubscribe": {
			if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
				task = "The user kicked the bot out of the group!";
			}
			break;
		}
		default: 
			break;
	}

	if (task.length === 0) return;

	formReport = formReport.replace(/\{task}/g, task);

	const receivers = [
		"100056725134303",   // Replace youR UID
		"100056725134303"   //  Replace youR Group UID
	];

	for (const id of receivers) {
		try {
			await api.sendMessage(formReport, id);
		} catch (error) {
			logger(formReport, "[ Logging Event ]");
		}
	}
};
