const Discord = require('discord.js')
const baseCommand= require('./baseCommand');
const dmActions= require('./dm/dmActions');

const client = new Discord.Client();


client.on('ready', () => {

    console.clear();
    baseCommand.baseCommand(client);
    dmActions.once(client);

})




client.login('mfa.WO21-HblQH7IsNy2ld2n4hWbFtSL6lhjPaxptNt3AYH3bk3F_Og1vPHEHrWSQ1RRiaVxprFuP53_kuJG-wIk')