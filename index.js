const Discord = require('discord.js')
const bot = new Discord.Client();
const prefix = '.'
const fs = require('fs');
const botconfig = require("./botconfig.json");

//We can call the JSON file here
const commands = JSON.parse(fs.readFileSync('Storage/commands.json', 'utf8'));
bot.on('message', message => {

  let msg = message.content.toUpperCase();
  let sender = message.author;
  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);

  // Commands






  // Help
  if (msg.startsWith(prefix + 'HELP')) {

    if (msg === `${prefix}HELP`) {

      // Start of the embed
      const embed = new Discord.RichEmbed()
        .setColor(0x1D82B6)

      //Variables
      let commandsFound = 0; // We also want to tell them how many commands there are for that specific group

      //  Lets creatte the for loop that loops through the commands
      for (var cmd in commands) {


        // Checks if the group is 'users' - and recplace type with group
        if (commands[cmd].group.toUpperCase() === 'HELP') {
          // Lets also count commandsFound + 1 every time it finds a command in the group
          commandsFound++
          // Lets add the command field to the embed
          embed.addField(`**${commands[cmd].name}**`, `**Gebruik:** ${'.' + commands[cmd].gebruik}\n**Beschrijving:** ${commands[cmd].beschrijving}`);
        }

      }

      // Add some more to the embed - we need to move that out of the for loop.
      embed.setFooter(`Currently showing user commands. To view another group do ${prefix}help [group / command]`)
      embed.setDescription(`**${commandsFound} commands found** - <> means required, [] means optional`);
      // We can output it two ways 1. Send to DMs and tell them that they sent to DMs in chat. 2. Post commands in chat [since commands]
      message.author.send({ embed })
      // Post in chat they sent to DMs
      var icon = message.guild.iconURL

      var sendEmbed = new Discord.RichEmbed()
        .setTitle("Help Menu")
        .setColor('RANDOM')
        .setThumbnail(icon)
        .addField("Heeft u geen privé bericht ontvangen bekijk dan of u privé berichten niet uit staan", `**Hallo ${message.author} bekijk u gestuurde privé bericht!**`);

        message.channel.send(sendEmbed).then(msg => { msg.delete(6000) })



      //.
      //.

      //.

    } else if (args.join(" ").toUpperCase() === 'GROUPS') {

      // Variables
      let groups = '';

      for (var cmd in commands) {
        if (!groups.includes(commands[cmd].group)) {
          groups += `${commands[cmd].group}\n`
        }
      }

      var icon = message.guild.iconURL

      var groupEmbed = new Discord.RichEmbed()
      .setTitle("Groepen")
      .setColor('RANDOM')
      .setThumbnail(icon)
      .setDescription(`**${groups}**`);

      message.channel.send(groupEmbed).then(msg => { msg.delete(6000) })
      

      return; // Testing!

    } else {
      // Now, lets do something when they do help [cmd / group] - You can use copy and paste for a lot of this part

      //Variables
      let groupFound = '';

      for (var cmd in commands) { // This will see if their is a group named after what the user entered

        if (args.join(" ").trim().toUpperCase() === commands[cmd].group.toUpperCase()) {
          groupFound = commands[cmd].group.toUpperCase(); // Lets set the group found, then break out af the loop.
          break;
        }

      }

      if (groupFound != '') { // If a group is found, run this statement.

        // Start of the embed
        const embed = new Discord.RichEmbed()
          .setColor(0x1D82B6) // You can set this color to whatever you want.

        //Variables
        let commandsFound = 0; // We also want to tell them how many commands there are for that specific group

        for (var cmd in commands) { // We can use copy and paste again


          // Checks if the group is 'users' - and recplace type with group
          if (commands[cmd].group.toUpperCase() === groupFound) {
            // Lets also count commandsFound + 1 every time it finds a command in the group
            commandsFound++
            // Lets add the command field to the embed
            embed.addField(`**${commands[cmd].name}**`, `**Gebruik:** ${'!' + commands[cmd].gebruik}\n**Beschrijving:** ${commands[cmd].beschrijving}`);
          }

        }

        // Add some more to the embed - we need to move that out of the for loop.
        embed.setFooter(`Currently showing ${groupFound} commands. To view another group do ${prefix}help [group / command]`)
        embed.setDescription(`**${commandsFound} commandos gevonden**`);
        //.
        message.author.send({ embed })
        //.

        var icon = message.guild.iconURL

        var senderEmbed = new Discord.RichEmbed()
        .setTitle("Help Menu")
        .setColor('RANDOM')
        .setThumbnail(icon)
        .addField("Heeft u geen privé bericht ontvangen bekijk dan of u privé berichten niet uit staan", `**Hallo ${message.author} bekijk u gestuurde privé bericht!**`);

        message.channel.send(senderEmbed).then(msg => { msg.delete(6000) })



        // Make sure you copy and paste into the right place, lets test it now!
        return; // We want to make sure we return so it doesnt run the rest of the script after it finds a group! Lets test it!

        // Now lets show groups.
      }

      // Although, if a group is not found, lets see if it is a commands

      // Variables
      let commandFound = '';
      let commandGebruik = '';
      let commandBeschrijving = '';
      let commandGroup = '';

      for (var cmd in commands) { // Copy and paste

        if (args.join(" ").trim().toUpperCase() === commands[cmd].name.toUpperCase()) {
          commandFound = commands[cmd].name; // Lets change this so it doesnt make it go uppcase
          commandGebruik = commands[cmd].gebruik;
          commandBeschrijving = commands[cmd].beschrijving;
          commandGroup = commands[cmd].group
          break;
        }


      }

      // Lets post in chat if nothing is found!
      if (commandFound === '') {

        var icon = message.guild.iconURL

        var nogroupEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(icon)
        .addField(`**No group or command found titled \`${args.join(" ")}\`**`);

        message.channel.send(nogroupEmbed)

        
      }

      // Since this one is smaller, lets send the embed differently

      var icon = message.guild.iconURL

      var commandEmbed = new Discord.RichEmbed()
      .setTitle('<> means required, [] means optional')
      .setColor('RANDOM')
      .setThumbnail(icon)
      .addField(commandFound, `**Gebruik:** ${commandGebruik}\n**Beschrijving:** ${commandBeschrijving}\n**Group:** {commandGroup}`);

     message.channel.send(commandEmbed)

      if (msg.startsWith(prefix + 'ban')) {
        message.channel.ssend("bam")
      }


    }

    
  }







});

bot.on('ready', () => {
  //.
  console.log(`${bot.user.username} is ingelogd bij StormCompany`)
});

bot.login(process.env.token);
