const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.config = config;

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log(`Nasyo-V is now listening for ${eventName} `)
    });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (file.includes("command-base.js")) return;
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(props.config.name, props);
        // props.config.aliases.forEach(alias => {
        //     client.aliases.set(alias, props.config.name)
        // });
        props.config.aliases.forEach(alias => {
            client.aliases.set(alias, commandName);
        });
    });
});

client.on("message", message => {
    
})

client.login(config.key);