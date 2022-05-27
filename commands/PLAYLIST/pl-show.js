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
  name:"pl-show",
  run: async (client,message,args)=>{
const playlistName = args.join(' ').replace(/_/g, ' ');
if(!args[0])return embed(`Provide playlist name`,message.channel)

playlists.findOne({
			name: playlistName,
			creator: message.author.id,
		}, async (err, p) => {
			
			if (!p) {
				return embed(`i can't find that playlist!`,message.channel);
			}

			let pagesNum = Math.ceil(p.songs.length / 10);
			if (pagesNum === 0) pagesNum = 1;

			let totalQueueDuration = 0;
			for (let i = 0; i < p.songs.length; i++) {
				totalQueueDuration += p.songs[i].duration;
			}

			const pages = [];
			let n = 1;
			for (let i = 0; i < pagesNum; i++) {
				const str = `${p.songs.slice(i * 10, i * 10 + 10).map(song => `**${n++}.** ${song} `).join('\n')}`;
				const embed = new discord.MessageEmbed()
					.setThumbnail(message.author.displayAvatarURL())
					.setTitle(p.name)
					.setDescription(str)
					.setColor(client.config.color)
					.setFooter(`Page ${i + 1}/${pagesNum} | ${p.songs.length} songs`);
				pages.push(embed);
				if (i == pagesNum - 1 && pagesNum > 1) paginate(client, message, pages, ['◀️', '▶️'], 120000, p.songs.length, format(totalQueueDuration));
				else if (pagesNum == 1) message.channel.send({ embeds: [embed] });
			}
		});




  }}