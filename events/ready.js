const { User } = require('../database')

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		await User.sync();
		console.log('database synced')
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}, 
};