const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  name: "node",
  category: "Info",
  description: "Lund Lelo",
  run: async (client, message, args, guildData, player, prefix) => {

    const all = client.manager.nodes.map(node => 
      `
State     ::  Connected
Players   ::  ${node.stats.playingPlayers}/${node.stats.players}
Uptime    ::  ${new Date(node.stats.uptime).toISOString().slice(11, 19)}
Memory    ::  ${Math.round(node.stats.memory.free / 1024 / 1024)}/${Math.round(node.stats.memory.used / 1024 / 1024)}mb
Cores     ::  ${node.stats.cpu.cores}
`
        ).join('\n\n- - - - - - - - - - - - - -\n');

        const embed = new MessageEmbed()
            .setColor("ff0000")
            .setAuthor(`${message.author.tag} - Nodes`,  message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`\`\`\`asciidoc\n${all}\n\`\`\``)
           
        message.channel.send({embeds: [embed]})

  }
}
   
