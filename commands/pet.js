const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { User } = require('../database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pet')
		.setDescription('Pet the frog 🐸'),
	async execute(interaction) {
        let getUser = await User.findOne({ where: { id: interaction.user.id }});
        if (!getUser) { getUser = await User.create({ id: interaction.user.id, balance: 0 }) };

        let coinsEarned = Math.floor(Math.random() * 51);

        await User.update(
            { balance: getUser.balance + coinsEarned },
            { where: { id: interaction.user.id }}
        )

        let embed = new EmbedBuilder()
            .setColor('93C98F')
            .setTitle('Thank you for the pets!')
            .setDescription(`Forg gives you ${coinsEarned} coins in return 🐸`);

		await interaction.reply({ embeds: [embed]});
	},
};
