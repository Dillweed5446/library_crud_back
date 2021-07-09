const pool = require('./pool')

const deleteEntry = (params, table) => {
  const parseParam = Object.values(JSON.parse(Object.keys(params)))
  const queryParam = Object.keys(JSON.parse(Object.keys(params)))
  pool.getConnection()
  // Create field that can be passed in place of author_id so this can be used for authors or books
    .then(conn => conn.query(`DELETE FROM ${table} WHERE ${queryParam} = ?;`, parseParam)
      .then(res => {
        console.log(res)
        conn.release()
      })
      .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

module.exports = deleteEntry
