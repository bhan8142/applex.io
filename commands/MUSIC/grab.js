const {
  MessageEmbed
} = require(`discord.js`);
module.exports = {
  name: `grab`,
run: async (client, message, args) => {
    const player = message.client.manager.players.get(message.guild.id)
  let prefix =  client.config.default_prefix
  let song = player.queue.current;
    const emem  = new MessageEmbed()
    .setAuthor(`| Saved Song:`, message.author.displayAvatarURL({
      dynamic: true
    }))
    .setColor("ff0000")
    .addField(`Song By: `, `\`${player.queue.current.author}\``, true)
    .setDescription(`[${song.title}](${song.uri})`)
    .addField(`Queue length: `, `\`${player.queue.length} Songs\``, true)
    .addField(`Play it:`, `\`${prefix}play ${player.queue.current.uri}\``)
    .addField(`Saved in:`, `<#${message.channel.id}>`)
    .setFooter(`Requested in Server ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
      dynamic: true
    }))
  await message.react("👌")
    message.author.send({embeds: [emem]}).catch(e=>{
      const ememe = new MessageEmbed()
      .setColor("ff0000")
      .setDescription(`<:Error:939761035164921906>| Your Dm's are disabled`)

      return message.channel.send({embeds: [ememe]})
      .catch(e=>console.log("Could not react"))
    })
  }
};

