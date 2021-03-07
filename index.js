const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require('ms')

client.on('ready', async () => {
    console.log('I am online and working with no errors!')

    client.user.setPresence({
        activity: {
          name: '>help | V 0.0.1',
        },
        setStatus: 'dnd'
      })
})

client.on('message', async (msg) => {
    if(msg.author.bot) return;
    if(!msg.guild) return;
    if(msg.content.length >= 300) {
        msg.delete();
        msg.channel.send(`${msg.author} you are not allowed to send bulk messages in this server.`)
    }



    var prefix = config.prefix;
    if(!msg.content.toLowerCase().startsWith(prefix)) return;

    var args = msg.content.split(' ')
    var cmd = args.shift().slice(prefix.length).toLowerCase();

    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, msg, args);
    }catch(err) {
        console.warn(err);
    }
})
client.login(config.token);