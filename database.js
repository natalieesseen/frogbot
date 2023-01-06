
const Sequelize = require('sequelize');

const database = new Sequelize("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: false,
	storage: "database.sqlite",
});

module.exports.User = database.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
    },
    balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    }, { 
		timestamps: false,
	}
);