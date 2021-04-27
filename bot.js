const Discord = require("discord.js")
const fs = require('fs');
const bot = new Discord.Client()
const config = require("./config.json");
const { execute } = require("./events/message");
const attachment = new Discord.MessageAttachment('')

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


bot.on("ready", () => {
    console.log(`${bot.user.username} is a go!`)
    bot.user.setActivity(`to Zav go on and on`, { type: 'LISTENING' });
});

bot.on("message", message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#e9e9e9')
            .setThumbnail('https://cdn.discordapp.com/avatars/832243396319379457/46281d36827e3babe81a1d7c9084edd8.webp?size=1024')
            .setTitle(`${bot.user.username}'s commands <:TT_Yay:836657535455854662>  `)
            .setDescription(`**Prefix:** ${config.prefix}\n [Invite](https://discord.com/api/oauth2/authorize?client_id=832243396319379457&permissions=8&scope=bot)`)
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
    }


    if (command === "kick") {
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send("Insufficient permissions (Requires permission `Kick members`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.kickable)
            return message.channel.send("This user is unkickable").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} was kicked, no reason was provided`);
            })

            if (reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} was kicked for ${reason}`);
            })
        }
    }

    if (command === "ban") {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send("Insufficient permissions (Requires permission `Ban members`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.bannable)
            return message.channel.send("This user is unbannable").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.ban().then(member => {
                message.channel.send(`${member.user.tag} was banned, no reason was provided`);
            })

            if (reason) return member.ban(reason).then(member => {
                message.channel.send(`${member.user.tag} was banned for ${reason}`);
            })
        }
    }

    if (command === "addd") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Insufficient permissions (Requires permission `Manage roles`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const add = args.slice(1).join(" ")
        if (!add)
            return message.channel.send("You have not specified a role").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleAdd = message.guild.roles.cache.find(role => role.name === add)
        if (!roleAdd)
            return message.channel.send("This role does not exist").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (member.roles.cache.get(roleAdd.id))
            return message.channel.send(`This user already has the ${add} role`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.add(roleAdd.id).then((member) => {
            message.channel.send(`${add} added to ${member.displayName}`)
        })
    }

    if (command === "remove") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Insufficient permissions (Requires permission `Manage roles`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const remove = args.slice(1).join(" ")
        if (!remove)
            return message.channel.send("You have not specified a role").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleRemove = message.guild.roles.cache.find(role => role.name === remove)
        if (!roleRemove)
            return message.channel.send("This role does not exist").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.roles.cache.get(roleRemove.id))
            return message.channel.send(`This user does not have the ${remove} role`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.remove(roleRemove.id).then((member) => {
            message.channel.send(`${remove} removed from ${member.displayName}`)
        })
    }

    if (command === "say") {
    const text = args.join(" ")
    if(!text) return message.channel.send("You have not specified something to say").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    message.channel.send(text)
    
    }
   
    if (command === "purge") {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Insufficient permissions (requires permission `Manage messages`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    const number = args.join(" ")
    if(!number) return message.channel.send("You haven't specified a number to purge").then(msg => {
        msg.delete({ timeout: 30000 })
    })
   message.channel.bulkDelete(number).catch(console.error)
   
   }
    
   if (command === "rps") {
        const options = [
            "rock :shell: ",
            "paper :newspaper2:",
            "scissors :scissors: "
        ]
        const option = options[Math.floor(Math.random() * options.length)]
        message.channel.send(`You got ${option}`)
    }
    if (command === "membercount") {

     const MembercountEmbed = new Discord.MessageEmbed()
        .setColor('#e9e9e9')
        .setTitle('Membercount')
        .setDescription(`This server has ${message.guild.memberCount} members!`)
        .setFooter(`Executed by ${message.author.username}`)
        .setTimestamp()

        message.channel.send(MembercountEmbed) }

        if (command === 'slowmode') {     
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Insufficient permissions (requires permission `Manage messages`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    const number = args.join(" ")
    if(!number) return message.channel.send("You haven't specified a number to use as slowmode!").then(msg => {
        msg.delete({ timeout: 30000 })
    })
             message.channel.setRateLimitPerUser(args[0])
             message.channel.send(`Slowmode has been put to ${args[0]} seconds!`)

             
        }
        if (!client.commands.has(command)) return;

try {
    client.commands.get(command).execute(message, args);
} catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
}
    
        


});

bot.login(process.env.token);