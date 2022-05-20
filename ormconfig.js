module.exports = {
	"type": "mysql",
	"host": process.env.DB_HOST,
	"port": 3306,
	"username": process.env.DB_USER,
	"password": process.env.DB_PASS,
	"database": process.env.DB_NAME,
	"entities": [
		"./**/*.entity.js"
	],
	"migrations": [
		"./migrations/**/*.js"
	],
	"cli": {
		"migrationsDir": "./migrations",
		"subscribersDir": "./subscribers"
	},
	"synchronize": false
}