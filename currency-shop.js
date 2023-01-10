const { CurrencyShop } = require('./database')
const force = process.argv.includes('--force') || process.argv.includes('-f');

CurrencyShop.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Cafe au lait', cost: 2 }),
		CurrencyShop.upsert({ name: 'Cake', cost: 5 }),
        CurrencyShop.upsert({ name: 'Fries', cost: 10 }),
	];

	await Promise.all(shop);
	console.log('Shop synced');
}).catch(console.error);