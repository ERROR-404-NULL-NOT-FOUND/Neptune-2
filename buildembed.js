const { MessageCollector, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
currentuser=""
const buildembed = async function buildembed(interaction) {
    if (interaction.isCommand()) {
        //checking command name
        if (interaction.commandName === 'buildembed') {
            let color
            if (interaction.options.getString('color')) {
                //regex: find hex color string
                if (interaction.options.getString('color').search(/#(?:[0-9a-fA-F]{3}){1,2}/) > -1) {
                    color = interaction.options.getString('color')
                } else {
                    interaction.reply(`In what world is \`${interaction.options.getString('color')}\` a valid hex color?`)
                }
            } else {
                color = "#FFFFFF"
            }

            //initial embed
            embed = new MessageEmbed()
                .setTitle(interaction.options.getString('title'))
                .setDescription(interaction.options.getString('description'))
                .setColor(color);
                
            //buttons
            const row = new MessageActionRow()
                .addComponents(

                    new MessageButton()
                        .setCustomId('finalize')
                        .setLabel('Finalize')
                        .setStyle('PRIMARY'),
                        
                    new MessageButton()
                        .setCustomId('thumbnail')
                        .setLabel('Set thumbnail')
                        .setStyle('PRIMARY'),
                        
                    new MessageButton()
                        .setCustomId('image')
                        .setLabel('Add image')
                        .setStyle('PRIMARY')
                );
            //send embed
            currentembed = interaction.reply({ embeds: [embed], components: [row] })
            currentuser = interaction.user.id;
            currentchannel = interaction.channel;
        }
    } else {
        if (interaction.user.id === currentuser) {
            if (interaction.isButton()) {
                switch (interaction.customId) {
                    case 'finalize':
                        await interaction.editReply({ components: [] });
                        break;
                    case 'thumbnail':
                        interaction.reply({ content: "Please send the thumbnail that you want for the image", ephemeral: true });
                        new MessageCollector(interaction.channel.id).on('collect', message => {
                            console.log(message)
                            embed = new MessageEmbed()
                                .setTitle(interaction.options.getString('title'))
                                .setDescription(interaction.options.getString('description'))
                                .setColor(color)
                                .setThumbnail(message.attachments[0]);
                            currentEmbed.update({ embeds: [embed] })
                            console.log("done")
                        });
                        break;
                }
            }
        }
    }
}
module.exports.buildembed = buildembed;