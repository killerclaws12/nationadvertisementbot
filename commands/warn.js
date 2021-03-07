const Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return;
    var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!user) return msg.reply('You did not mention a user for me to warn!')

    var member;
    try{
        member = await msg.guild.members.fetch(user)
    } catch(err){
        member = null;
    }
    if(!member) return msg.reply('The user that you mentioned is not in the server currently.');

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('You forgot to add a reason.')
    if(msg.author.id === user.id) return msg.reply('You cannot warn yourself!')

    var warnEmbed = new Discord.MessageEmbed()
    .setColor('0x0000FF')
    .setDescription(`${user} has been warned by ${msg.author}!`)
    .setFooter('This message will delete in 5 seconds.')
    var sendEmbed = await msg.channel.send(warnEmbed);
    msg.delete()
    
    setTimeout(() => {
        sendEmbed.delete()
    }, 5000)

    var embed = new Discord.MessageEmbed()
    .setColor('0x0000FF')
    .setTitle('You were warned by **Nation Advertisements Utils**!')
    .setDescription('Server: **Nation Advertisements**')
    .addField('Reason', reason)

    try{
        user.send(embed);
    } catch(err) {
        console.warn(err)
    }
}