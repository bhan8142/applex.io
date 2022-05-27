const { Manager } = require("erela.js");
const Spotify  = require("erela.js-spotify");
const { MessageEmbed } = require("discord.js")
const Deezer = require("erela.js-deezer")
const delay = require("delay")
const message = require("discord.js")
const prettyMilliseconds = require('pretty-ms');

function millisToDuration(ms) {
        return prettyMilliseconds(ms, { colonNotation: true, secondsDecimalDigits: 0 });
    }

module.exports = {
  name: "ready",
  async execute(client) {
    console.log(`[API] ${client.user.username} is ready with ${client.guilds.cache.size} server`);



let nodes = client.config.nodes

  let clientID = client.config.spotifyID
  let clientSecret = client.config.spotifySecret
    
     
  
  client.manager = new Manager({
    nodes,
    plugins: [ new Spotify({ clientID, clientSecret}),
    new Deezer()],
    
    autoPlay: true,
    secure: false,
    send: (id, payload) => {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
  });
  
  
//initialize the manager
  client.manager.init(client.user.id);

  client.on("raw", d => client.manager.updateVoiceState(d));

  
  client.manager.on("nodeConnect",async node => {
      console.log(`[NODE] "${node.options.identifier}" connected.`);
 
  })
  

  client.manager.on("nodeError", (node, error) => {
      console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`);
  
   
    
  });
  
 
   //Track start
  client.manager.on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    let min = Math.floor((track.duration/1000/60) << 0), sec = Math.floor((track.duration/1000) % 60);
    let sec2;
      if(sec < 10) {
          sec2 = `0${sec}`
      }
      else {
          sec2 = sec
      }

     let np = new MessageEmbed()
    .setColor("#ff0000")
   .setAuthor(`NOW PLAYING`,`${client.user.displayAvatarURL()}`)
    .setDescription(` 
     ${track.title}  [${millisToDuration(track.duration)}]
Requested by - ${track.requester}
`);

channel.send({embeds:[np]})
},5000)
    
   client.manager.on("queueEnd",(player)=>{
       const channel = client.channels.cache.get(player.textChannel);
  
     let e = new MessageEmbed()
     .setColor(`#303133`)
     .setDescription(`No more tracks have been added in queue
`)
 
   return channel.send({embeds:[e]})
   })
    
client.manager.on("socketClosed", (player, payload) => {
		if(payload.byRemote === true) player.destroy();
	});
	
  client.manager.on("playerMove", (player, currentChannel, newChannel) => {
	player.voiceChannel = client.channels.cache.get(newChannel);


setTimeout(() => {
 player.pause(false) 
})
	},2000);
      
   
  
  
  
  
  },
};
