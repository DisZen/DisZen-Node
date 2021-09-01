const Discord = require('discord.js');
const {PREFIX} = require('../config.json');


const commands = [
    {
        name: "help",
        execute: function (message, args) {
            const client = message.client;
            var embed = new Discord.MessageEmbed()
                .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic: true, size: 4096}));

            if (!args.length) {
                embed.setDescription("Modules - " + client.Modules.size);
                client.Modules.forEach(mod => embed.addField(mod.name, `\`${PREFIX}help ${mod.name}\``, true));
            } else {
                const arg = args.join(" ");

                const module = client.Modules.get(arg) || client.Modules.find(mod => mod.name.toLowerCase() == arg.toLowerCase());
                if (module) {
                    embed.setDescription("Commands - " + module.commands.length);
                    module.commands.forEach(cmd => embed.addField(cmd.name, cmd.name));
                    return message.channel.send({embeds: [embed]});
                }

                const command = client.Commands.get(arg.toLowerCase()) || client.Commands.find(cmd => cmd.aliases && cmd.name == arg.toLowerCase());
                if (command) {
                    embed.setDescription("Name - " + command.name);
                    if (command.usage) embed.addField("Usage", command.usage, false);
                    if (command.aliases) embed.addField("Aliases", command.aliases.join(', '));
                    if (command.description) embed.addField("Description", command.description, false);
                } else embed.setDescription(`No modules or commands called \`${arg}\``);
            }
            message.channel.send({embeds: [embed]});
        }
    }
];

module.exports = {name: "Information", commands: commands};
