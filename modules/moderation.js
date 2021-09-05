const Discord = require('discord.js');
const { permFlags } = require('../constants.js');


const commands = [
    // Ping
    {
        name: "ping",
        aliases: ['p'],
        execute(client, message, args) {
            message.channel.send("Pong");
        }
    },

    // Purge
    {
        name: "purge",
        aliases: ['clean'],
        usage: "<amount>",
        permissions: [permFlags.MANAGE_MESSAGES],
        execute(client, message, args) {
            const limit = parseInt(args[0]);
            if (!isNaN(limit)) message.channel.bulkDelete(limit < 100 ? limit + 1: limit);
            else message.channel.send(`\`${args[0]}\` is not a number`);
        }
    },

    // Ban
    {
        name: "ban",
        usage: "<member> [reason]",
        permissions: [permFlags.BAN_MEMBERS],
        execute (client, message, args) {
            const member = message.mentions.members.first();
            if (!member) return message.channel.send("No member mentioned");

            if (!member.toString().replace('!', '') === args[0].replace('!', ''))
                return message.channel.send("First argument has to be a <member>");

            const reason = args.slice(1).join(' ').toString();
            message.guild.members.ban(member.id.toString(), {reason: reason.length > 0 ? reason : null});
        }
    },

    // Kick
    {
        name: "kick",
        usage: "<member> [reason]",
        execute(client, message, args) {
            const member = message.mentions.members.first();
            if (!member) return message.channel.send("No member mentioned");

            if (!member.toString().replace('!', '') === args[0].replace('!', ''))
                return message.channel.send("First argument has to be a <member>");

            const reason = args.slice(1).join(' ').toString();
            message.guild.members.kick(member.id.toString(), {reason: reason.length > 0 ? reason : null});
        }
    }
];


module.exports = {name: "Moderation", commands: commands};
