const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Op } = require('sequelize');
const { User, UserItems, CurrencyShop } = require('../database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Buy an item from the shop 🛒')
        .addStringOption((option) => option
			.setName("item")
			.setDescription("Which item do you want to purchase?")),
	    async execute(interaction) {
        let getUser = await User.findOne({ where: { id: interaction.user.id }});
        if (!getUser) { getUser = await User.create({ id: interaction.user.id, balance: 0 }) };

        const itemName = interaction.options.getString('item');
        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });
        
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
        
        if (item.cost > getUser.balance) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
		            .setColor('93C98F')
		            .setTitle(`You can't afford that item!`)
		            .setDescription(`You have ${getUser.balance} coins, but the ${item.name} costs ${item.cost} coins!`)
                ]
            })
        }

        User.update(
            { balance: getUser.balance - item.cost },
            { where: { id: interaction.user.id }}
        )

        let findItem = await UserItems.findOne({ where: { user_id: interaction.user.id, item: item.name} });
        if(!findItem) {
            await UserItems.create(
                { user_id: interaction.user.id, item: item.name, amount: 1 }
            )
        } else { 
            await UserItems.update(
                { amount: findItem.amount + 1 },
                { where: { user_id: interaction.user.id, item: item.name} }
            )
        }
        
        let embed = new EmbedBuilder()
            .setColor('93C98F')
            .setTitle('Thank you for your purchase!')
            .setDescription(`You've bought ${item.name}, the item has been added to your inventory.`)
		await interaction.reply({ embeds: [embed]});
	},
};