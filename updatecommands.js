const updatecommands=function updatecommands(token, CLIENT_ID, GUILD_ID){
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');

    const commands = [{
        name: 'ping',
        description: 'Replies with Pong!'
    },
    {
        name: "User Data",
        type:2
    },
    {
        name:"buildembed",
        description: "Embed builder",
        options: [
            {
                "name": "title",
                "description": "The title of the embed",
                "type": 3,
                "required": true
            },
            {
                "name": "description",
                "description": "The description of the embed",
                "type": 3,
                "required":true
            },
            {
                "name": "color",
                "description": "Color of the embed",
                "type": 3,
                "required":false
            }
        ]
    }]; 

    const rest = new REST({ version: '9' }).setToken(token);

    (async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
    })();
}
module.exports.updatecommands=updatecommands;