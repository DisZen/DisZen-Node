const Discord = require('discord.js');
const { permFlags } = require('../constants.js');
const { Module, Command } = require('../command_handler');


const mod = new Module('Moderation');

mod.addCommand(new Command('purge', (ctx) => {
    const limit = parseInt(ctx.args[0]);
    if (!isNaN(limit)) ctx.message.channel.bulkDelete(limit < 100 ? limit + 1 : limit);
    else ctx.message.channel.send(`\`${args[0]}\` is not a number`);
})
.addAlias('clean')
.setUsage('<amount>')
.addPermission(permFlags.MANAGE_MESSAGES));


mod.addCommand(new Command('ban', (ctx) => {
    const member = ctx.message.mentions.members.first();
    if (!member) return ctx.message.channel.send("No member mentioned");

    if (!member.toString().replace('!', '') === ctx.args[0].replace('!', ''))
        return ctx.message.channel.send("First argument has to be a <member>");

    const reason = ctx.args.slice(1).join(' ').toString();
    ctx.message.guild.members.ban(member.id.toString(), {reason: reason.length > 0 ? reason : null});
})
.setUsage('<member> [reason]')
.addPermission(permFlags.BAN_MEMBERS));


mod.addCommand(new Command('kick', (ctx) => {
    const member = ctx.message.mentions.members.first();
    if (!member) return ctx.message.channel.send("No member mentioned");

    if (!member.toString().replace('!', '') === ctx.args[0].replace('!', ''))
        return ctx.message.channel.send("First argument has to be a <member>");

    const reason = ctx.args.slice(1).join(' ').toString();
    ctx.message.guild.members.kick(member.id.toString(), {reason: reason.length > 0 ? reason : null});
})
.setUsage('<member> [reason]')
.addPermission(permFlags.KICK_MEMBERS));


module.exports = mod;
