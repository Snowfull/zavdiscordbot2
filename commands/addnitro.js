const Discord = require('discord.js');

module.exports = {
    name: 'stealnitro',
    description: 'Steals emoji',
    execute(message, args) {
        if (!args.length) return message.reply("Please specify an emoji!");

        for (const rawEmoji of args) {
            const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);
            
            if (parsedEmoji.id) {
                const extention = parsedEmoji.animated ? ".gif" : "png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extention}`;
                message.guild.emojis.create(url, parsedEmoji.name)
                    .then((emoji) => message.channel.send(`Nitro emoji has been added!`)) 
                 }
        }
    }

};