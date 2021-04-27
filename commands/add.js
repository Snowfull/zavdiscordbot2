const Discord = require('discord.js');

module.exports = {
    name: 'steal',
    description: 'Steals emoji',
    execute(message, args) {
        if (!args.length) return message.reply("Please specify an emoji!");

        for (const rawEmoji of args) {
            const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);
            
            if (parsedEmoji.id) {

                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id}`;
                message.guild.emojis.create(url, parsedEmoji.name)
                    .then((emoji) => message.channel.send(`Emoji has been added!`)) 
                 }
        }
    }

};