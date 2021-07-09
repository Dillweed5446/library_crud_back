const pool = require('./pool')

const dbPostCall = (params, table) => {
  const parseParams = Object.values(JSON.parse(Object.keys(params)))
  const queryParams = Object.keys(JSON.parse(Object.keys(params))).map(a => `${a}`).join(', ')
  const valuesParams = '?' + ', ?'.repeat(Object.keys(JSON.parse(Object.keys(params))).length - 1)
  pool.getConnection()
  // Create field that can be passed from front end so this function can also work for books.
    .then(conn => conn.query(`INSERT INTO ${table}(${queryParams}) VALUES(${valuesParams});`, parseParams)
      .then(res => {
        console.log(res)
        conn.release()
      })
      .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

module.exports = dbPostCall
