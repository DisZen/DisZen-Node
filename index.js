const Discord = require('discord.js');
const fs = require('fs');
const {TOKEN, PREFIX} = require('./config.json');

const Intents = new Discord.Intents();
Intents.add(Discord.Intents.FLAGS.GUILD_MESSAGES);
Intents.add(Discord.Intents.FLAGS.GUILDS);

const Client = new Discord.Client({intents: Intents});
Client.Modules = new Discord.Collection();
Client.Commands = new Discord.Collection();


for (const mod of fs.readdirSync('./modules').filter(file => file.endsWith('.js'))) {
    module_ = require('./modules/' + mod);
    Client.Modules.set(module_.name, module_);
    Client.Modules.forEach(mod => mod.commands.forEach(cmd => Client.Commands.set(cmd.name, cmd)));
}


Client.on('ready', () => {
    console.log("Hello");
});


Client.on('messageCreate', message => {
    if (message.author.bot || message.author.id == Client.user.id) return;
    if (!message.content.startsWith(PREFIX)) return;

    var messageArgs = message.content.trim().substring(1).split(' ');
    const commandName = messageArgs.shift().toLowerCase();

    const command = Client.Commands.get(commandName) || Client.Commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    try {
        command.execute(message, messageArgs);
    } catch (err) {
        console.error(err);
    }
});

Client.login(TOKEN);
