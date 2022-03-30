let fs= require('fs')
const log = async function log(interaction) {
    if (interaction.isCommand()) {
        arguments = ""
        for (let i = 0; i < interaction.options.data.length; i++){
            arguments+=`${interaction.options.data[i].name}: ${interaction.options.data[i].value} `
        }
        console.log(`${interaction.user.username}: /${interaction.commandName} ${arguments}`)
    } else {
        if (interaction.isButton()) {
        console.log(`${interaction.user.username}: button ${interaction.customId}`)
    }}
}
module.exports.log=log