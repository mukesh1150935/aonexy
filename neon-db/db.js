const { Pool } = require("pg");

require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// const pool = new Pool({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,

//   ssl: {
//     require: true,
//   },
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
    sslmode: 'require'
}
});


async function getPgVersion() {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT version()");

    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}

getPgVersion();

module.exports = pool;