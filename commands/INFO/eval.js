 const Discord = require("discord.js");
module.exports = {
    name: 'eval',
    usage: "",
    description: 'evaluates any string as javascript code and executes it.',
    category: "Utility",
    cooldown: 1,
    run: async (client, message, args) => {
      if(!client.config.owner.includes(message.author.id)) return
      const content = message.content
        .split(" ")
        .slice(1)
        .join(" ");
      const result = new Promise(resolve => resolve(eval(content)));

      return result
        .then(output => {
          if (typeof output !== "string") {
            output = require("util").inspect(output, { depth: 0 });
          }
          if (output.includes(client.token)) {
            output = output.replace(
              this.client.token,
              "LOL BRO"
            );
          }
          message.channel.send(`\`\`\`${output}\`\`\``, {
            code: "js"
          });
        })
        .catch(err => {
          err = err.toString();
          if (err.includes(client.token)) {
            err = err.replace(client.token, "AHHA ATNA ");
          }
          message.channel.send(err, {
            code: "js"
          });
        });
    
}};