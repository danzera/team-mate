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


function getPool() {
  console.log('inside getPool function of database.js');
  if (!pool) { // create a pool if one hasn't already been created
    console.log('creating pool');
    pool = new pg.Pool(config);
    console.log('pool created:', pool.pool);
  }
  return pool;
  // if (pool) { // if a pool already exists, return it
  //   console.log('pool already exists');
  //   return pool;
  // } else { // otherwise, create one
  //   pool = new pg.Pool(config);
  //   return pool;
  //   console.log('creating pool');
  // }
}

module.exports = getPool;
