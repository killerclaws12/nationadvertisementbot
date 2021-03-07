const Discord = require('discord.js')
const ms = require('ms')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return;
    if(!args[0]) return msg.reply('You need to speify a time.')
    if(isNaN(args[0])) return msg.reply('You need to speicy a valid number to set slowmode to.');
    var time = args[0]
    if(args[0] < 0) return msg.reply('You need to speicfy a number greater than 0 to set slowmode to.')
    if(args[0] > 21600) return msg.reply('You need to specify a time that is less than 6 hours!')
    msg.channel.setRateLimitPerUser(time)

    var verify = msg.guild.emojis.cache.find(emoji => emoji.name === 'verify')

    var embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${verify} I have successfully set slowmode to ${time} seconds.`);
    msg.channel.send(embed)
}