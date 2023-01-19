const { User, UserItems, CurrencyShop, petCooldown, adventureUser } = require('../database')

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		await User.sync();
		await UserItems.sync();
		await CurrencyShop.sync();
		await petCooldown.sync();
		await adventureUser.sync();
		console.log('database synced')
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}, 
};