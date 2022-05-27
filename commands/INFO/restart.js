const discord = require("discord.js")
module.exports = {
	name: 'restart',
	category: 'owner',
	run : async (client, message, args) => {
		if (message.author.id !== '906588285336424449') {
			return message.channel.send('You cannot use this command!');
		}
		await message.channel.send('Restarting bot...');
		return process.exit();
	},
};
