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
module.exports = {
  name: "pl-create",
  aliases:["pl-add"],

    run: async (client, message, args) => {
  if (!args[0]) 
  return embed(`Please specify a search query or link.\nUsage: \`pl-create <playlist name> <search query/link>\``,message.channel);

        if (args[0].length > 32) return message.reply('Playlist name must be less than 32 characters!');
        if(!args[1]){
          return embed(`Provide search term or links`,message.channel);
        }
 const songsToAdd = [];
  let node = client.manager.nodes.first();
		let dataLength = 0;
		let playlistMessage = '';
		let noTracks = 0;
		const playlistName = args[0].replace(/_/g, ' ');

let searchQuery = args.slice(1).join(' ')

 if (_checkURL(searchQuery)) {

            const res = await client.manager.search(searchQuery);  
            if (!res || !res.tracks.length)
                              return embed("I can't find search query",message.channel)
            const { type, tracks, playlistName } = res;
        
const isPlaylist = type === 'PLAYLIST';
if(res.type !== "PLAYLIST"){
     songsToAdd.push(res.tracks[0].info.title); 
playlistMessage = `Added **${res.tracks[0].title}**  to **${args[0]}**`;
			addSongs(true)			
}else if (isPlaylist) {
              for (const track of tracks) 
                songsToAdd.push(track.info.title);  
    playlistMessage = `Added playlist **${res.playlistName}** (${res.tracks.length} tracks) to **${args[0]}**`;						
   return addSongs(true)
    }

   } else{

       let   query = searchQuery
          const searchData = await client.manager.search(query, 'youtube');

          if (!searchData || !searchData.tracks.length)
            return embed(`no matches found!`,message.channel);
          const track = searchData.tracks.shift();
          track.requester = message.author;
        songsToAdd.push(track.title);
playlistMessage = `Added **${track.title}** to **${playlistName}**`;						
  return addSongs(true)
   }

//NOW
async function addSongs(isPlaylist) {
		
			playlists.findOne({
				name: args[0],
				creator: message.author.id,
			}, async (err, p) => {
				if (err) console.log(err);
				if (!p) {
					const newPlaylist = new playlists({
						name: playlistName,
						songs: [],
						timeCreated: Date.now(),
						creator: message.author.id,
					});

					newPlaylist.songs = songsToAdd;
					newPlaylist.songs.length = clamp(newPlaylist.songs.length, 0, client.config.playlistSongLimit);
					await newPlaylist.save().catch(e => null);

					const embed = new MessageEmbed()
						.setDescription(`
 **Playlist Name**
${newPlaylist.name}
           
 **Songs**
${playlistMessage}

 **Total songs**
${newPlaylist.songs.length}
            
          `)
						.setColor(client.config.color)
					message.channel.send({embeds: [embed] });
				}
				else {
					if (p.songs.length >= client.config.playlistLimit) return embed('You have reached the maximum amount of songs in the playlist',message.channel);
				//	if (songsToAdd.length > 1) 		
      const currentPlaylist = p.songs;
					p.songs = currentPlaylist.concat(songsToAdd);
					p.songs.length = clamp(p.songs.length, 0, client.config.playlistSongLimit);
	await p.save().catch(e => console.log(e));
				
					const embed = new MessageEmbed()
						.setDescription(`
**Playlist Nmae**
${p.name}
             
**Songs**
${playlistMessage}

**Total songs**
${p.songs.length}
`)
						.setColor(client.config.color)
			
				return	message.channel.send({ content: ' ', embeds: [embed] });
				}
			});

}

  
 










  }}