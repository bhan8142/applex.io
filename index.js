const Disocrd = require("discord.js")
const discord = require("discord.js"); 
const client = new discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "GUILDS", "GUILD_VOICE_STATES", "GUILD_MESSAGES","GUILD_MEMBERS"],
});

const {Database} = require("quickmongo")

client.config = require("./config.json")
client.db = new Database(client.config.DB)
client.formatDuration  = require("./paras/formatDuration")
require("./paras/Player")
const { MessageEmbed } = require ("discord.js");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
//client.util = require("./util.js");
["commands", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

 client.on('ready', () => {
 client.user.setActivity(`@Apple Music`, { type: 'STREAMING' })
})

client.on("guildCreate",(guild) => {

if(guild.memberCount < 20)guild.leave()

})


client.db.on("ready",() => {
  
  console.log("[DB] QUICK CONNECTED")
})
const mongoose = require('mongoose');

		const dbOptions = {
			useNewUrlParser: true,
			autoIndex: false,
			poolSize: 5,
			connectTimeoutMS: 10000,
			family: 4,
			useUnifiedTopology: true,
		};
		mongoose.connect(client.config.DB, dbOptions);
		mongoose.set('useFindAndModify', false);
		mongoose.Promise = global.Promise;
		mongoose.connection.on('connected', () => {
		console.log('[DB] DATABASE CONNECTED');
		});
		mongoose.connection.on('err', (err) => {
			console.log(`Mongoose connection error: \n ${err.stack}`);
		});
		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose disconnected');
		});

client.login("OTQ2NDIzMjg4NzY5NDIxMzMz.GVEbkP.KL2gRUJLCk8Bw3ndDp9ozmQ9lOX45HIkfnGXl8")