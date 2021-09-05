const Discord = require('discord.js');


const commands = [
    {
        name: "help",
        usage: "[module | command]",
        description: "Sends a help message",
        execute(client, message, args) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic: true, size: 4096}));

            if (!args.length) {
                embed.setDescription("Modules - " + client.modules.size);
                client.modules.forEach(mod => embed.addField(mod.name, `\`${client.prefix}help ${mod.name}\``, true));
            } else {
                const arg = args.join(" ");

                const mod = client.modules.get(arg) ||
                    client.modules.find(mod => mod.name.toLowerCase() === arg.toLowerCase());
                if (mod) {
                    embed.setDescription("Commands - " + mod.commands.length);
                    mod.commands.forEach(cmd => embed.addField(cmd.name, cmd.name));
                    return message.channel.send({embeds: [embed]});
                }

                const command = client.commands.get(arg.toLowerCase()) ||
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(arg.toLowerCase()));
                if (command) {
                    embed.setDescription("Name - " + command.name);
                    if (command.usage) embed.addField("Usage", `\`${client.prefix}${command.name} ${command.usage}\``, false);
                    if (command.aliases) embed.addField("Aliases", command.aliases.join(', '));
                    embed.addField("Description", command.description ? command.description : "No description", false);
                } else embed.setDescription(`No modules or commands called \`${arg}\``);
            }
            message.channel.send({embeds: [embed]});
        }
    }
];
//bla bla
module.exports = {name: "Information", commands: commands};
