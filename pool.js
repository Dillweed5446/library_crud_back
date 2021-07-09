const mariadb = require('mariadb')
require('dotenv').config()

const pool = mariadb.createPool({
  socketPath: '/run/mysqld/mysqld.sock',
  host: process.env.JAWSDB_MARIA_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'books_library',
  timezone: 'Pacific/Honolulu',
  multipleStatements: true,
  supportBigInt: true
})

module.exports = pool
