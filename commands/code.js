const fs = require("fs");
exports.run = async(client, msg, args) => {
    let code;
    try {
      code = fs.readFileSync(`commands/${args[0]}.js`).toString();
    } catch (error) {
      return msg.channel.send(
        `I couldn't find a command called \`${args[0]}\``
      );
    }

    try {
      if (args[0]) {
        const options = {
          method: "POST",
          body: code,
          headers: {
            "Content-Type": "application/json",
          },
        };
        msg.channel.send(
          `Here is the code for the ${
            args[0]
          } command:\n\`\`\`js\n${code.substr(0, 1900)}\`\`\``
        );
      }
    } catch (e) {
      return msg.channel.send(
        "There was an error displaying the command's code."
      )
      }
    }
