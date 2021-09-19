const Discord = require('discord.js');
const { Module, Command } = require('../command_handler');


const mod = new Module('Information');


mod.addCommand(new Command('help', (ctx) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(ctx.client.user.tag, ctx.client.user.displayAvatarURL({dynamic: true, size: 4096}));

    if (!ctx.args.length) {
        embed.setDescription("Modules - " + ctx.client.modules.size);
        ctx.client.modules.forEach(mod => embed.addField(mod.name, `\`${ctx.client.prefix}help ${mod.name}\``, true));
    } else {
        const arg = ctx.args.join(" ");

        const mod = ctx.client.modules.get(arg) ||
            ctx.client.modules.find(mod => mod.name.toLowerCase() === arg.toLowerCase());
        if (mod) {
            embed.setDescription("Commands - " + mod.commands.length);
            mod.commands.forEach(cmd => embed.addField(cmd.name, cmd.name));
            return ctx.message.channel.send({embeds: [embed]});
        }

        const command = ctx.client.commands.get(arg.toLowerCase()) || 
            ctx.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(arg.toLowerCase()));
        if (command) {
            embed.setDescription("Name - " + command.name);
            if (command.usage) embed.addField("Usage", `\`${ctx.client.prefix}${command.name} ${command.usage}\``, false);
            if (command.aliases.length) embed.addField("Aliases", command.aliases.join(', '));
            embed.addField("Description", command.description ? command.description : "No description", false);
        } else embed.setDescription(`No modules or commands called \`${arg}\``);
    }
    ctx.message.channel.send({embeds: [embed]});
}));


module.exports = mod;
