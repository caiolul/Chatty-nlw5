
module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": process.env.PASSWORD_DB,
  "database": "chatty",

  "migrations": ["./src/database/migrations/**.ts"],
  "entities": ["./src/models/**.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
