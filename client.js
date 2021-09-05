const Discord = require("discord.js");
const EventHandler = require("./event_handler.js");


class Client extends Discord.Client {
    constructor(commandPrefix) {
        const intents = new Discord.Intents();
        intents.add(Discord.Intents.FLAGS.GUILD_MESSAGES);
        intents.add(Discord.Intents.FLAGS.GUILDS);
        intents.add(Discord.Intents.FLAGS.GUILD_MEMBERS);

        const defaultOptions = {intents: intents};
        super(defaultOptions);

        this.prefix = commandPrefix;

        this.modules = new Discord.Collection();
        this.commands = new Discord.Collection();

        this.loadModulesFromDir('./modules');

        this.eventHandler = new EventHandler(this);
    }

    loadModulesFromDir(directory) {
        const fs = require('fs');
        for (const mod of fs.readdirSync(directory).filter(file => file.endsWith('.js'))) {
            let module_ = require(directory + '/' + mod);
            this.modules.set(module_.name, module_);
            this.modules.forEach(mod => mod.commands.forEach(cmd => this.commands.set(cmd.name, cmd)));
        }
    }
}


module.exports = Client;
