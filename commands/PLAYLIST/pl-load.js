const playlists = require("../../models/Playlist");
const { MessageEmbed } = require('discord.js');
const discord = require("discord.js")
const embed = require("../../paras/embed")

function _checkURL(string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}
function clamp(num, min, max) {	
  return num <= min ? min : num >= max ? max : num;
}


module.exports ={
  name:"pl-load",
   vcOnly: true,
 
  run: async (client,message,args)=>{
    let player=message.client.manager.players.get(message.guild.id)

let play = message.client.manager.players.get(message.guild.id)
let channel = message.member.voice.channel
 if (!play) {
     player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    })

    if (!channel.joinable) {
      let embed = new MessageEmbed()
        .setColor("#ff0000")
        
        .setDescription("<:Apple_Error:927076530146914334> I can't able to join your voice channel")
   return message.channel.send({embeds:[embed]})
    }

    player.connect()
  }
const playlistName = args.join(' ').replace(/_/g, ' ');


playlists.findOne({
			name: playlistName,
			creator: message.author.id,
		}, async (err, p) => {
			if (!p) {
		        return message.channel.send(`I can't find that playlist`);
      }
      
let tracks = p.songs 
 embed(`Queued ${p.songs.length} tracks from ${playlistName}`,message.channel); 
    
for(let i =0; i<= tracks.length ; i++){
if(tracks[i]){
let search = await client.manager.search(tracks[i],"youtubemusic")
          //if (!search || !search.tracks.length)
           					const track = search.tracks.shift()
if(!track) continue;

	track.requster = message.author;

				 await player.queue.add(track)
      if (!player.playing && !player.paused && !player.queue.length) player.play()
     		
		}   


}
			
       


	});
  

    
  }
}