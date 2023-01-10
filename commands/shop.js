const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { CurrencyShop } = require('../database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('View items available in the shop 🛒'),
	async execute(interaction) {
        let getShop = await CurrencyShop.findAll();

		let embed = new EmbedBuilder()
		.setColor('93C98F')
		.setTitle(`Welcome to the store!`)
		.setDescription('`/buy` to buy something')
		.addFields(
			{ name: '\u200B', value: getShop.map(i => `${i.name} ㆍ ${i.cost} coins`).join('\n') }
		);

		await interaction.reply({ embeds: [embed] });
	},
};
