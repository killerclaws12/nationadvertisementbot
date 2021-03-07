const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return;
    if(!args[0]) return msg.reply('You need to specify a number of messages to delete.')
    if(isNaN(args[0])) return msg.reply('You need to speicify a valid number of messages.')

    if(args[0] > 100) return msg.reply('You need to speicfy a number less than 100!');
    if(args[0] < 1) return msg.reply('You need to specify a number that is greater than 0!');

    msg.delete()
    await msg.channel.messages.fetch({limit: args[0]}).then (messages => {
        msg.channel.bulkDelete(messages)

        var verify = msg.guild.emojis.cache.find(emoji => emoji.name === 'verify')

    var embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${verify} I have successfully deleted ${args[0]} messages!`);
    msg.channel.send(embed)
    })
}