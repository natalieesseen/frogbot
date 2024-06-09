# frogbot 2023 🐸🤖

My thesis project at Changemaker Educations was to create a Discord-bot for my community "Froggies & Friends". The bot is built with [Discord.js](https://discord.js.org/), which is a node.js module that allows you to interact with the Discord API. To interact with the SQLite-database, the bot is using [Sequelize](https://sequelize.org/), which is a node.js ORM.


⚠️ I see this repo getting forked and starred every now and then, and while I believe it can be helpful to get some insights on how a Discord-bot with an economy-system is built, **I do not** recommend you use this repo to build your own Discord-bot. Most importantly, I am not maintaining this bot since it's not being used anymore, and there are *many* security issues (most could probably be fixed with updating depencencies but alas). Secondly, I have learned a lot since I graduated, and I cringe when I look back at this code; but I still want to keep the repo public in case someone can learn a thing or two.

## Commands
``/purse`` check how many coins you have in your coin-purse.

``/inventory`` check your inventory, bought items will appear here.

``/pet`` give the frog some pets, and he will reward you with coins. *1h cooldown*

``/feed`` feed the frog any items from your inventory, you may be rewarded or punished depending what mood the frog is in..

``/shop`` browse the shop; items to feed the frog, and a very special token..

``/buy`` buy items from the shop.

``/adventure`` go on an adventure with the frog! multiple endings, both rewarding and punishing..
