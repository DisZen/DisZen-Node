const Discord = require('discord.js');

const commands = [
    // Ping
    {
        name: "ping",
        aliases: ['p'],
        execute: function (message, args) {
            message.channel.send("pong");
        }
    },

    // Purge
    {
        name: "purge",
        aliases: ['clean'],
        execute: function (message, args) {
            const limit = parseInt(args[0]);
            if (!isNaN(limit)) message.channel.bulkDelete(limit + 1);
            else message.channel.send(`\`${args[0]}\` is not a number`);
        }
    }
];


module.exports = {name: "Moderation", commands: commands};
