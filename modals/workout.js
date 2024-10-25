import { ActionRowBuilder, Component, ModalBuilder, REST, Routes, TextInputBuilder, TextInputStyle  } from 'discord.js';
import { env } from 'process';
import 'dotenv/config'
const RAPORT_ID =  JSON.parse(process.env.RAPORT_ID)

export default (modal, id) => {

	let soldiers;
	let description;

	let FirstRow;
	let SecondRow;
	let ThirdRow;

	switch (id) {
		case RAPORT_ID.workout:
		
			modal.setTitle("Рапорт о проведении тренировки")
			modal.setCustomId('Raport Builder:'+id)
		
			let workoutName = new TextInputBuilder()
				.setCustomId("workoutName")
				.setLabel("Название проводимой тренировки")
				.setStyle(TextInputStyle.Short)
				.setRequired(true)
		
			soldiers = new TextInputBuilder()
				.setCustomId("soldiers")
				.setLabel("Группа. (позывные через запятую)")
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(true)
		
			description = new TextInputBuilder()
				.setCustomId("desc")
				.setLabel("Дополнительная информация")
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(false)
		
				FirstRow = new ActionRowBuilder().addComponents(workoutName);
			SecondRow = new ActionRowBuilder().addComponents(soldiers);
			ThirdRow = new ActionRowBuilder().addComponents(description);
		
			modal.addComponents(FirstRow, SecondRow, ThirdRow)

			break;
		case RAPORT_ID.simulation:
			modal.setTitle("Рапорт о проведении симуляции")
			modal.setCustomId('Raport Builder:'+id)
		
			let Dificult = new TextInputBuilder()
				.setCustomId("Dificult")
				.setLabel("Выбранная сложность")
				.setStyle(TextInputStyle.Short)
				.setRequired(true)
		
			soldiers = new TextInputBuilder()
				.setCustomId("soldiers")
				.setLabel("Группа. (позывные через запятую)")
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(true)

			let result = new TextInputBuilder()
				.setCustomId("result")
				.setLabel("Результат симуляции")
				.setStyle(TextInputStyle.Short)
				.setRequired(true)
		
			description = new TextInputBuilder()
				.setCustomId("desc")
				.setLabel("Дополнительная информация")
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(false)
		
			let FirstRow = new ActionRowBuilder().addComponents(Dificult);
			let SecondRow = new ActionRowBuilder().addComponents(soldiers);
			let ThirdRow = new ActionRowBuilder().addComponents(description);
			let FourRow = new ActionRowBuilder().addComponents(result);
		
			modal.addComponents(FirstRow, SecondRow, ThirdRow, FourRow)
			break;
		default:

		break;
	}

    
}