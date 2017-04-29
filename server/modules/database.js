console.log('database.js loaded');
var pg = require('pg');
var pool;
var config = {
  user: 'danzera', // env var: PGUSER
  database: 'team-mate', // env var: PGDATABASE
  password: '', // env var: PGPASSWORD
  port: 5432, // env var: PGPORT
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 15000, // 15s // how long a client is allowed to remain idle before being closed
};

if(!pool) { // is there a connection pool? if not, initialize one
  console.log('creating new pool in database.js');
  pool = new pg.Pool(config);
}

//---ALTERNATE WAY TO DO THE ABOVE---
// function getPool() {
//   console.log('inside getPool function of database.js');
//   if (!pool) { // create a pool if one hasn't already been created
//     console.log('creating pool in database.js');
//     pool = new pg.Pool(config);
//   }
//   console.log('returning pool from database.js');
//   return pool;
// }
// module.exports = getPool;
// import module to others
// then declare a pool variable
// var pool = getPool();
//--------END ALTERNATE WAY--------

module.exports = pool;
