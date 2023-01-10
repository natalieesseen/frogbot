const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { User } = require('../database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purse')
		.setDescription('Check how many coins you have in your purse 👛'),
	async execute(interaction) {
        let getUser = await User.findOne({ where: { id: interaction.user.id }});
        if (!getUser) { getUser = await User.create({ id: interaction.user.id, balance: 0 }) };

		let embed = new EmbedBuilder()
		.setColor('EC7280')
		.setTitle(`${interaction.user.username}'s coin purse`)
		.setDescription(`You have ${getUser.balance} coins in your purse 👛`);

		await interaction.reply({ embeds: [embed] });
	},
};
