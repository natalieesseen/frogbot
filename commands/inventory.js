const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { UserItems } = require('../database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('Check items in your inventory 🎒'),
	    async execute(interaction) {
        let items = await UserItems.findAll({ where: { user_id: interaction.user.id } })

        if (!items.length) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
		            .setColor('EC7280')
		            .setTitle(`${interaction.user.username}'s inventory`)
		            .setDescription('Your bag is empty. Ribbit. Buy some stuff first.')
                ]
            });
		} else {
            let embed = new EmbedBuilder()
            .setColor('EC7280')
            .setTitle(`${interaction.user.username}'s inventory`)
            .setDescription(items.map(i => `${i.amount} ㆍ ${i.item}`).join('\n'));
            await interaction.reply({ embeds: [embed]});
        }
	},
};