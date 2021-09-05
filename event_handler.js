const { DiscordAPIError } = require("discord.js");

class EventHandler {
    constructor(client) {
        this.client = client;

        this.client.on('ready', () => this.onReady());
        this.client.on('guildMemberAdd', member => this.onMemberJoin(member));
        this.client.on('guildMemberRemove', member => this.onMemberRemove(member));
        this.client.on('messageCreate', message => this.onMessage(message));
    }

    onReady() {
        console.log(this.client.user.tag);
        console.log(this.client.user.id);
        console.log("-------------------");
    }

    onMemberJoin(member) {
        member.guild.channels.cache.find(ch => ch.name == 'welcome').send(member.user.tag + " joined the server :D");
    }

    onMemberRemove(member) {
        member.guild.channels.cache.find(ch => ch.name == 'welcome').send(member.user.tag + " left the server D;");
    }

    onMessage(message) {
        if (message.author.bot || message.author.id == this.client.user.id) return;
        if (!message.content.startsWith(this.client.prefix)) return;
    
        var messageArgs = message.content.trim().substring(1).split(' ');
        const commandName = messageArgs.shift().toLowerCase();
    
        const command = this.client.commands.get(commandName) || 
            this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        if (command.permissions) {
            for (const flag of command.permissions) {
                if (!message.member.permissions.has(flag)) {
                    return message.channel.send("You do not have the permission to execute this command.");
                }
            }
        }

        try {
            command.execute(this.client, message, messageArgs);
        } catch (err) {
            console.log(err);
            console.error(err);
        }
    }
}


module.exports = EventHandler;
