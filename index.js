const updatecommands = require("./updatecommands")
const buildembed = require("./buildembed")
const logger = require("./logger")
const user = require("./user")
token = "OTU2NzE1MjIwMDcwNDUzMzE4.Yj0Qew.f1VKCR0vMqkIrUBh0pEuCNuZT-8"
clientid = "956715220070453318"
guildid = "885884308529741824"
updatecommands.updatecommands(token, clientid, guildid)
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES] });
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
currentEmbed=""
client.on('interactionCreate', async interaction => {
    if (!(interaction.isCommand()||interaction.isSelectMenu()||interaction.isButton()||interaction.isUserContextMenu())) return;
    logger.log(interaction);
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    } else {
        buildembed.buildembed(interaction);
        user.user(interaction)
    }
});

client.login(token);