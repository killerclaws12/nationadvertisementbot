exports.run = async(client, msg, args) => {
    msg.channel.send(`Your current ping is at **${client.ws.ping}** ping.`);
}