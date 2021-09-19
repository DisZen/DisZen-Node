const {Collection} = require('discord.js');


class Context {
    constructor(client, message, args, mod, command) {
        this.client = client;
        this.message = message;
        this.args = args;
        this.module = mod;
        this.command = command;
    }
}


class Module {    
    constructor(name) {
        this.name = name;
        this.commands = new Collection();
        this.description;
    }

    setDescription(description) {
        this.description(description);
        return this;
    }

    addCommand(command) {
        this.commands.set(command.name, command);
        command.module = this;
    }
}


class Command {
    constructor(name, executable) {
        this.name = name.toLowerCase();
        this.usage;
        this.aliases = [];
        this.description;
        this.permissions = [];
        this.executable = executable;
        this.module;
    }

    execute(ctx) { return this.executable(ctx); }

    setAliases(aliases) {
        this.aliases = aliases;
        return this;
    }

    addAlias(alias) {
        this.aliases.push(alias.toLowerCase());
        return this;
    }

    setUsage(usage) {
        this.usage = usage;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    addPermission(perm) {
        this.permissions.push(perm);
        return this;
    }
}


module.exports = {'Module': Module, 'Command': Command, 'Context': Context};
