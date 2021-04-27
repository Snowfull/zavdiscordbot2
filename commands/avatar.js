const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Shows Avatar',
    execute(message, args) {

      if(!args.length) return message.reply('Hey! You didnt mention anyone!')
      let member = message.mentions.users.first() || message.author

      let avatar = member.displayAvatarURL({size: 1024})


      const embed = new Discord.MessageEmbed()
      .setTitle(`${member.username}'s avatar`)
      .setImage(avatar)
      .setColor("#e9e9e9")

      message.channel.send(embed);

    }

}