const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { User, petCooldown } = require('../database');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pet')
		.setDescription('Pet the frog 🐸'),
	async execute(interaction) {
        let getUser = await User.findOne({ where: { id: interaction.user.id }});
        if (!getUser) { getUser = await User.create({ id: interaction.user.id, balance: 0 }) };

        let getCooldown = await petCooldown.findOne({ where: { user_id: interaction.user.id } })
        let cooldownTime = getCooldown?.expiry;

        if (getCooldown && cooldownTime > new Date().getTime()) {
            let cooldownEmbed = new EmbedBuilder()
            .setColor('93C98F')
            .setTitle('No more pets!')
            .setDescription(`Please wait ${ms(cooldownTime - new Date().getTime(), { long: true } )} before petting the forg again 🐸`);

            return await interaction
            .reply({ embeds: [cooldownEmbed]})
            .catch((err) => {})
        }

        petCooldown.create({
            user_id: interaction.user.id,
            expiry: new Date().getTime() + 3600000,
        })

        if (getCooldown) { petCooldown.destroy({ where: { user_id: interaction.user.id }}) }
        
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