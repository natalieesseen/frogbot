const { User, UserItems, CurrencyShop } = require('../database')

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		await User.sync();
		await UserItems.sync();
		await CurrencyShop.sync();
		console.log('database synced')
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}, 
};