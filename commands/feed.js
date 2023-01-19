const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Op } = require('sequelize');
const { User, UserItems } = require('../database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('feed')
		.setDescription('Give something from your inventory for forg to eat 🍽️')
        .addStringOption((option) => option
			.setName("item")
			.setDescription("Which item do you want to give forg?")),
	    async execute(interaction) {
        let getUser = await User.findOne({ where: { id: interaction.user.id }});
        if (!getUser) { getUser = await User.create({ id: interaction.user.id, balance: 0 }) };

        const itemName = interaction.options.getString('item');
        const findItem = await UserItems.findOne({ where: { user_id: interaction.user.id, item: { [Op.like]: itemName }} });
        
        if(!findItem) {
            if (!item) {
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor('93C98F')
                        .setTitle('That item does not exist!')
                        .setDescription('Make sure you spelled it correctly ~ Ribbit.')
                    ]
                })
            } 
        }

        await UserItems.update(
            { amount: findItem.amount - 1 },
            { where: { user_id: interaction.user.id, item: findItem.item } }
        )

        await UserItems.destroy({
            where: { amount: 0 }
        })

        let coins = Math.floor(Math.random() * 51);
        let shouldAdd = Math.random() >= 0.5;
        let response = '';

        if (shouldAdd) {
            getUser.update(
                { balance: getUser.balance + coins },
                { where: { id: interaction.user.id }}
            )

            response = `Frog liked it! And gives you ${coins} coins as a thank you! Ribbit!`
        } else {
            getUser.update(
                { balance: getUser.balance - coins },
                { where: { id: interaction.user.id }}
            )
            response = `Frog did not like it... And demands you give him ${coins} coins in compensation!`
        }

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor('93C98F')
                .setTitle(`You feed frog ${findItem.item}`)
                .setDescription(response)
            ]
        })
	},
};