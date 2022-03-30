const { MessageEmbed, Client, PresenceManager} = require('discord.js');
const userinfo = async function userinfo(interaction) {
    if (interaction.isUserContextMenu()) {
        user = interaction.options._hoistedOptions[0].user;
        member = interaction.options._hoistedOptions[0].member;
        if (member.nickname) {
            nickname=member.nickname
        } else {
            nickname=user.username
        }
        let roles
        if (member._roles) {
            if (member._roles.length > 2) {
                roles = `**[${member._roles.length}]** <@&${member._roles[0]}> **[...]** <@&${member._roles[member._roles.length-1]}>`
            } else {
                roles = `**[${member._roles.length}]** `
                for (let i = 0; i < member._roles.length; i++) {
                    roles += `<@&${member._roles[i]}>`
                }
            }
        }
        badges = {
            "HOUSE_BRAVERY": "https://discord.com/assets/efcc751513ec434ea4275ecda4f61136.svg"
        }
        let lebadge=""
        for (let i = 0; i < user.flags.toArray().length;i++){
            lebadge+=badges[user.flags.toArray()[i]]
        }
        customstatus="None"
        if (member.presence) {
            online = member.presence.status
            if (member.presence.activities[0]) {

                for (let i = 0; i < member.presence.activities.length; i++){
                    if(i===0){customstatus=""}
                    if (member.presence.activities[i].type === "LISTENING") {
                        customstatus += `\n\n**Type:** ${member.presence.activities[i].type}
                        **Name:** ${member.presence.activities[i].name}
                        **Song:** ${member.presence.activities[i].details}
                        **Author:** ${member.presence.activities[i].state}`
                    } else {
                        if (member.presence.activities[i].type === "PLAYING") {
                            customstatus += `\n\n> **Type:** ${member.presence.activities[i].type}
> **Game:** ${member.presence.activities[i].name}
> **State:** ${member.presence.activities[i].details}
> **Playing:** ${member.presence.activities[i].state}`
                        } else {
                            customstatus += `\n\n> **Type:** ${member.presence.activities[i].type}
> **Name:** ${member.presence.activities[i].name}
> **Text:** ${member.presence.activities[i].state}`
                        }
                    }
                }
            }
        } else {
            online=null
        }
        generalinfo = `> **Created**: <t:${~~(user.createdTimestamp / 1000)}:f> (<t:${~~(user.createdTimestamp / 1000)}:R>)
> **Status**: ${online}
`
serverinfo=`
> **Joined server:** <t:${~~(member.joinedTimestamp / 1000)}:f>(<t:${~~(member.joinedTimestamp / 1000)}:R>)
> **Roles:** ${roles}`
        embed = new MessageEmbed()
            .setTitle("User Information")
            .addField("General info", generalinfo, true)
            .addField("Activity",customstatus,true)
            .addField("Server info",serverinfo,false)
            .setAuthor({ name: user.username, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}` })
            .setColor(member.displayColor)
            //.addField(user.bio)
        .setFooter(`${ user.username }#${ user.discriminator }`)
        interaction.reply({embeds:[embed]})
    }
}
module.exports.user=userinfo