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
  name: "pl-savecurrent",

    run: async (client, message, args) => {

let player = client.manager.players.get(message.guild.id);
const songToAdd =[]
if(!player){
  return embed(`There is nothing playing \n first add songs to queue`,message.channel)
}

if(!args[0])return embed(`Provide me name of playlist`,message.channel);


songToAdd.push(player.queue.current.title)

playlists.findOne({
  name: playlistName,
  creator: message.author.id,
},
    async (err, p) => { 
     if (err) console.log(err); 
      if (!p) { 
        const newPlaylist = new playlists({
          name: playlistName, 
          songs: [], 
          timeCreated: Date.now(), 
          thumbnail: 'none', 
          creator: message.author.id, }); 
     
newPlaylist.songs = songToAdd; 

newPlaylist.songs.length = clamp(newPlaylist.songs.length, 0, client.config.playlistSongLimit); 

await newPlaylist.save().catch(e => console.log(e)); 
 
embed(`Successfully saved current song into ${newPlaylist.name}`,message.channel)



} else { 
if (p.songs.length >= client.config.playlistLimit) return embed('You have reached the **maximum** amount of songs in the playlist',message.channel); 
        
 const currentPlaylist = p.songs;
  p.songs = currentPlaylist.concat(songToAdd); 
        p.songs.length = clamp(p.songs.length, 0, client.config.playlistSongLimit); 
            await p.save().catch(e => console.log(e));
            embed(`**Playlist**
${p.name}
**Action**
Saved current song to playlist
`,message.channel)

     } });




    }}
