import { error, log } from 'console';
import { env } from 'process';
import { ActionRowBuilder, ModalBuilder, REST, Routes, TextInputBuilder, TextInputStyle  } from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { readFile } from 'fs/promises';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import 'dotenv/config'

const RAPORT_ID =  JSON.parse(process.env.RAPORT_ID)
const creds = process.env.GOOGLE_CRED
const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
import { exec } from 'child_process';
import ModalMake from './modals/workout.js';
import workoutSend from './commands/raportSend/workout.js';
import SimulationSend from './commands/raportSend/simulation.js';

client.on('ready', () => {
  console.log(`Вход выполнен как ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
//   if (interaction.isChatInputCommand()) return;
  let message;

  switch (interaction.commandName) {
    case 'connect':
      let DocID;
      try {
        interaction.options._hoistedOptions.forEach(element => {
          if (element.name == 'sheet-id') {
            console.log(`Founded value: ${element.value}`);
            DocID = element.value;
          }
        });
        const jwt = new JWT({
          email: creds.client_email,
          key: creds.private_key,
          scopes: SCOPES,
        });
        const doc = new GoogleSpreadsheet(DocID, jwt);
  
        await doc.loadInfo();
        console.log(doc.title);
        message = `${doc.title} sheet loaded!`;
        interaction.reply({content:message, fetchReply:true})
        .then((message) => console.log(`Send "${message}" to ${interaction.member.displayName} on Guild:[${interaction.guildId}] Channel:[${interaction.channelId}]`))
        .catch(console.error);
      } catch (error) {
        interaction.reply("Something went wrong.");
        console.log(error);
      }
      break;

    case 'reload':
      try {
        console.log('Обновление слеш комманд..');

        let commands = JSON.parse(await readFile("commands.json")).commands;
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log('Слеш команды обновлены!');
      } catch (error) {
        console.error(error);
        console.log(commands);
      }

      await interaction.reply("Slash reloaded!")
    break;
	case 'raport':
		let type;
		let maker;

		interaction.options._hoistedOptions.forEach(element => {
			if (element.name == 'type') {
			  type = element
			}
			// else if (element.name == 'maker') {
			// 	maker = element
			// }
		});
		// console.log(maker);

		let modal = new ModalBuilder()
			.setCustomId('Raport Builder')
			.setTitle("Создать рапорт");
      
      ModalMake(modal, type.value);

		await interaction.showModal(modal)
  }

	switch (interaction.customId) {
		case "Raport Builder:"+RAPORT_ID.workout:
      workoutSend(interaction)
		break;
    case "Raport Builder:"+RAPORT_ID.simulation:
      SimulationSend(interaction)
    break;
	}
});

const rest = new REST({ version: '10' }).setToken(TOKEN);


try {
  console.log('Обновление слеш комманд..');

  let commands = JSON.parse(await readFile("commands.json")).commands;

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Слеш команды обновлены!');
} catch (error) {
  console.error(error);
  console.log(commands);
  stop;
}

client.login(TOKEN);