const Discord = require('discord.js')
const baseCommand= require('./baseCommand');
const dmActions= require('./dm/dmActions');

require('dotenv').config();

const client = new Discord.Client();


client.on('ready', () => {

    console.clear();
    baseCommand.baseCommand(client);
    dmActions.once(client);

});


client.login(process.env.TOKEN);