const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Op } = require('sequelize');
const { User, UserItems, CurrencyShop } = require('../database');
const { discordRole } = require('../config.json')

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

        let roleAssigned = false;

        if (item.name === 'Frog trinket') {
            let guild = interaction.channel.guild;
            let role = guild.roles.cache.find(r => r.name === discordRole);
            let member = guild.members.cache.get(interaction.user.id);
            if (member.roles.cache.has(role.id)) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor('93C98F')
                        .setTitle('You already have that role!')
                        .setDescription(`The ${item.name} have already given you the cool role, you can't have it twice. Ribbit.`)
                    ]
                });
            } else {
                roleAssigned = true;
                member.roles.add(role)
                .then(() => {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor('93C98F')
                            .setTitle('Thank you for your purchase!')
                            .setDescription(`You've bought the shiny ${item.name}, which gives you a new sparkly discord role! Ribbit!`)
                        ]
                    });
                })
                .catch(console.error);
            }
        }

        if (roleAssigned) {
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

		    await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor('93C98F')
                    .setTitle('Thank you for your purchase!')
                    .setDescription(`You've bought ${item.name}, the item has been added to your inventory.`)
                ]
            });
        }
	},
};