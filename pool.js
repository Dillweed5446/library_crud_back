const mariadb = require('mariadb')
require('dotenv').config()
const SocksConnection = require('socksjs')
const fixieUrl = process.env.FIXIE_SOCKS_HOST
// eslint-disable-next-line prefer-regex-literals
const fixieValues = fixieUrl.split(new RegExp('[/(:\\/@)/]+'))
const PORT = process.env.PORT || 4000

const server = {
  host: process.env.DB_HOST,
  port: PORT
}

const fixieConnection = new SocksConnection(server, {
  user: fixieValues[0],
  pass: fixieValues[1],
  host: fixieValues[2],
  port: fixieValues[3]
})

const pool = mariadb.createPool({
  socketPath: '/run/mysqld/mysqld.sock',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'books_library',
  stream: fixieConnection,
  timezone: 'Pacific/Honolulu',
  multipleStatements: true,
  supportBigInt: true
})

module.exports = pool
