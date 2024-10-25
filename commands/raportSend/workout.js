import { log } from 'console';
import { ActionRowBuilder, Client, Colors, Embed, EmbedBuilder, ModalBuilder, REST, Routes, TextInputBuilder, TextInputStyle  } from 'discord.js';
import { readFile } from 'fs/promises';
export default async (interaction, client) => {

    let users = JSON.parse( await readFile("./data/users.json"))
    
    // console.log(interaction.fields.fields.get("soldiers").value);

    let soldiers = interaction.fields.fields.get("soldiers").value.split(",")
    let activies = ""
    soldiers.forEach( (unit, key) => {
        unit = unit.replace(/\s+/g, '');
        users.users.forEach((member, key) =>{
            if (member.name.toLowerCase() == unit.toLowerCase()) {
                activies+="- "+member.guild+" "+member.rank+" "+member.id+" "+member.name+'\u200B'
            }
        })
    });

    console.log(activies);
    

    let replyEmbed = new EmbedBuilder()
        .setColor("#E55A36")
        .setTitle("*Рапорт о проведении тренировки*")
        .setAuthor({name: interaction.member.nickname, iconURL: "https://cdn.discordapp.com/avatars/"+interaction.user.id+"/"+interaction.user.avatar })
        .addFields(
            {name: interaction.fields.fields.get("workoutName").value, value: interaction.fields.fields.get("desc").value },
            { name: '\u200B', value: '\u200B' },
            { name:"Участники", value:activies, inline: true  } 
        )
        .setTimestamp();

    interaction.reply({embeds: [replyEmbed] })
}


// **Рапорт о проведении тренировки**
// ```
// Проводил -> 212th CTP 0037 Pieta
// Дата -> 21.10.2024
// Тренировка -> Работа с техникой
// Группа ->
// * 212th PV2 2107 Prophet
// ```

// // at the top of your file
// const { EmbedBuilder } = require('discord.js');

// // inside a command, event listener, etc.
// const exampleEmbed = new EmbedBuilder()
// 	.setColor(0x0099FF)
// 	.setTitle('Some title')
// 	.setURL('https://discord.js.org/')
// 	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
// 	.setDescription('Some description here')
// 	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
// 	.addFields(
// 		{ name: 'Regular field title', value: 'Some value here' },
// 		{ name: '\u200B', value: '\u200B' },
// 		{ name: 'Inline field title', value: 'Some value here', inline: true },
// 		{ name: 'Inline field title', value: 'Some value here', inline: true },
// 	)
// 	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
// 	.setImage('https://i.imgur.com/AfFp7pu.png')
// 	.setTimestamp()
// 	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

// channel.send({ embeds: [exampleEmbed] });

// https://cdn.discordapp.com/avatars/+