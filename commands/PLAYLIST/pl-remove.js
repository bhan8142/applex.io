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
  name:"pl-r",
   vcOnly: true,
 
  run: async (client,message,args)=>{
const playlistName = args.join(' ').replace(/_/g, ' ');

		if(!args[0]){

      return embed(`Provide me a playlist name to remove`,message.channel)
    }


		playlists.findOneAndDelete({
			name: playlistName,
			creator: message.author.id,
		})
			.then(deletedDocument => {
				if (deletedDocument) {
					return embed(`Successfully Removed ${playlistName} playlist`,message.channel);
				}
				else {
					return embed(`I can't find any playlist named ${playlistName} in database!`,message.channel)
				}
			})
			.catch(err => { embed(err.message,message.channel)} )





  }}