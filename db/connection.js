// const { Pool } = require("pg");

// const dbParams = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// };

// const db = new Pool(dbParams);

// db.connect();

// module.exports = db;

const pg = require("pg");

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

db.connect().catch((e) =>
  console.log(`Error connecting to Postgres server:\n${e}`)
);

module.exports = db;
