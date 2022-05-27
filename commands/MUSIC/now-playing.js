const { MessageEmbed } = require("discord.js");
const  { progress }  = require('../../paras/bar.js');
module.exports = {
  name: "nowplaying",
  aliases: ["current", "np", "song", "now-playing"],
  category: "music",
  description: "Shows details of current playing track.",
  usage: "nowplaying",
  run: async (client, message, args) => {

const rang = 
    message.guild.me.displayHexColor === "#000000"
        ? process.env.EMBED_COLOR
        : message.guild.me.displayHexColor;




const player = message.client.manager.players.get(message.guild.id);

if (!player) {
  let embdedhaha = new MessageEmbed()
    .setColor(rang)
    .setDescription(`Nothing playing in this server.`)
    return message.channel.send({embeds: [embdedhaha]});
};

if ( !player.queue.current) {

  let chalrehnede = new MessageEmbed()
    .setColor(rang)
    .setDescription(`You must have to play a song to use this command!`)

    return message.channel.send({embeds: [chalrehnede]});
};



  const { title, duration, uri, requester } = player.queue.current;

    const bar = "▬";
    const total = duration;
    const current = player.position;
    const size = 19;
    const slider = "🔵"
    
    const procgresssong =   progress(bar,current, total,slider,size)[0];


    time = function (s) {
      function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
      }
    
      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;
    
      var days = parseInt(Math.floor(hrs / 24));
      hrs = parseInt(hrs % 24);
    
      var semanas = parseInt(Math.floor(days / 7));
      days = parseInt(days % 7);
    
      var meses = parseInt(Math.floor(semanas / 7));
      semanas = parseInt(semanas % 7);
    
      return (
        (meses > 0 ? pad(meses) + 'm ' : "") +
        (semanas > 0 ? pad(semanas) + 's ' : '') +
        (days > 0 ? pad(days) + 'd ' : "") +
        (hrs > 0 ? pad(hrs) + 'h ' : "") +
        (mins > 0 ? pad(mins) + 'm  ' : "") +
        (pad(secs) + 's')
      )
    }

  let embed = new MessageEmbed()
    .setColor(rang)
    .setTitle("Now Playing")
    .setDescription(`[${title}](${uri}) [${requester}]`)
    .setFooter(player.queue.current.isStream ? `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬🔵 ${time(player.position)} / ∞` : `
    ${procgresssong} ${time(player.position)} / ${time(duration)}` )
  return message.channel.send({embeds: [embed]})







  }
};