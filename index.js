const Discord = require('discord.js');
const {TOKEN, PREFIX} = require('./config.json');

const Client = require("./client.js");
const client = new Client(PREFIX);

client.login(TOKEN);
