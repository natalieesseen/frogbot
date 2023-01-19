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
        
        let coins = Math.floor(Math.random() * 51);
        let shouldAdd = Math.random() >= 0.5;

        let embed = new EmbedBuilder()
        .setColor('93C98F');

        if (shouldAdd) {
            getUser.update(
                { balance: getUser.balance + coins },
                { where: { id: interaction.user.id }}
            )
            embed
            .setTitle('Frog liked it!')
            .setDescription(`Frog liked it! And gives you ${coins} coins as a thank you! Ribbit!`)
        } else {
            getUser.update(
                { balance: getUser.balance - coins },
                { where: { id: interaction.user.id }}
            )
            embed
            .setTitle('Frog did not like it...')
            .setDescription(`And demands you give him ${coins} coins in compensation!`)
        }
        
    
        if(!findItem) {
            if (!item) {
                embed
                .setTitle('That item does not exist!')
                .setDescription('Make sure you spelled it correctly ~ Ribbit.')
            } 
        }

        if(findItem.item === 'Frog trinket') {
            embed
            .setTitle(`That's not food!`)
            .setDescription(`Are you really going to feed Frog the token of your cool and sparkly discord role? You can't do that.`)
        }

        await UserItems.update(
            { amount: findItem.amount - 1 },
            { where: { user_id: interaction.user.id, item: findItem.item } }
        )

        await UserItems.destroy({
            where: { amount: 0 }
        })

        await interaction.reply({ embeds: [embed]})
	},
};