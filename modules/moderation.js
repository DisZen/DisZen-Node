const Discord = require('discord.js');


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
        execute(client, message, args) {
            const limit = parseInt(args[0]);
            if (!isNaN(limit)) message.channel.bulkDelete(limit + 1);
            else message.channel.send(`\`${args[0]}\` is not a number`);
        }
    },

    // Ban
    {
        name: "ban",
        usage: "<member> [reason]",
        execute (client, message, args) {
            message.channel.send("Banning!!!!");
        }
    }
];


module.exports = {name: "Moderation", commands: commands};
