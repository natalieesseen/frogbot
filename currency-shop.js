const { CurrencyShop } = require('./database')
const force = process.argv.includes('--force') || process.argv.includes('-f');

CurrencyShop.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Cafe au lait', cost: 20 }),
		CurrencyShop.upsert({ name: 'Cake', cost: 25 }),
		CurrencyShop.upsert({ name: 'Frog trinket', cost: 100 })
	];

	await Promise.all(shop);
	console.log('Shop synced');
}).catch(console.error);