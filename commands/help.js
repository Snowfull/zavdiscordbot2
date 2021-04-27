const Discord = require('discord.js');
const bot = new Discord.Client()
const config = require("./config.json")

module.exports = {
    name: 'help',
    description: 'Shows Avatar',
    execute(message, args) {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#e9e9e9')
        .setTitle(`Shay's commands`)
        .setDescription(`**Prefix:** ${config.prefix}`)
        .addField(`\`ping\``, `Check your bot's ping`)
        .addField(`\`kick\``, `Kicks members from the server\n*${config.prefix}kick [@User][Reason]*`)
        .addField(`\`ban\``, `Bans members from the server\n*${config.prefix}ban [@User][Reason]*`)
        .addField(`\`add\``, `Adds a role to a user \nUsage: *${config.prefix}add [@User] [Role]**`)
        .addField(`\`remove\``, `Removes a role from a user \nUsage: *${config.prefix}remove [@User] [Role]*`)
        .addField(`\`purge\``, `Clears a number of messages between 2 or 100 \nUsage: *${config.prefix}purge [number]*`)
        .addField(`\`rps\``, `Play rock paper scissors`)
        .addField(`\`say\``, `Have the bot say something`)
        .addField(`\`membercount\``, `Specifies amount of members in server`)
        .addField(`\`slowmode\``, `Puts slowmode amount \nUsage: *${config.prefix}slowmode [amount in seconds]*`)
        .setFooter(`Shay Bot`)
        .setTimestamp()
    message.channel.send(helpEmbed)
    },
};