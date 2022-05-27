const playlists = require("../../models/Playlist");
const { MessageEmbed } = require('discord.js');
const discord = require("discord.js")
const embed = require("../../paras/embed");
const humanizeDuration = require("humanize-duration");

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
  name:"pl-list",
  run: async (client,message,args)=>{

 playlists.find({
            creator: message.author.id,
        }).sort({ timeCreated: 1 }).then(async (p) => {
            let pagesNum = Math.ceil(p.length / 10);
            if (pagesNum === 0) pagesNum = 1;

            const pages = [];
            for (let i = 0; i < pagesNum; i++) {
                const str = `${p.slice(i * 10, i * 10 + 10).map(playlist => `**=> ${playlist.name}** | ${playlist.songs.length} song(s) | ${humanizeDuration(Number(Date.now() - playlist.timeCreated), { round: true })} ago`).join('\n')}`;

                const embed = new discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setDescription(`**__Your Playlists__**\n\n${str}`)
                    .setColor(client.config.color)
                   // .setTimestamp()
                    .setFooter(`Page ${i + 1}/${pagesNum} | ${p.length} playlists`);
                pages.push(embed);

                if (i == pagesNum - 1) {
                    const emojiList = ['◀️', '▶️'];
                    let page = 0;
                    const curPage = await message.channel.send({ embeds: [pages[page].setFooter(`Page ${page + 1}/${pages.length} | ${p.length} playlist(s)`)] });
                    if (pages.length <= 1) return;
                    const permissions = message.channel.permissionsFor(client.user);
                    if (!permissions.has(Permissions.FLAGS.ADD_REACTIONS)) return;
                    for (const emoji of emojiList) await curPage.react(emoji);
                    const reactionCollector = curPage.createReactionCollector(
                        (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
                        { time: 120000 },
                    );
                    reactionCollector.on('collect', (reaction, user) => {
                        if (!user.bot && permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) reaction.users.remove(user.id);
                        switch (reaction.emoji.name) {
                            case emojiList[0]:
                                page = page > 0 ? --page : pages.length - 1;
                                break;
                            case emojiList[1]:
                                page = page + 1 < pages.length ? ++page : 0;
                                break;
                            default:
                                break;
                        }
                        curPage.edit({ embeds: [pages[page].setFooter(`Page ${page + 1}/${pages.length} | ${p.length} playlist(s)`)] });
                    });
                    reactionCollector.on('end', () => curPage.reactions.removeAll());
                    return curPage;
                }
            }
        }).catch(err => {
          console.log(err)
            return embed(`You don't have any playlist`,message.channel);
        });




             
 
    }
};
