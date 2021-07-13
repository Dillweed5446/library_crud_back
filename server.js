const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbGetCall = require('./read')
const dbPostCall = require('./create')
const deleteEntry = require('./delete')
const updateEntry = require('./update')
const app = express()
const router = express.Router()
const PORT = process.env.PORT || 4000

const whitelist = ['https://dillweed5446.github.io/library_crud_front/', 'https://dillweed5446.github.io']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))

app.route('/api')
  .get((req, res) => {
    dbGetCall(req.query.table)
      .then(tableData => res.send(tableData))
      .catch(err => console.log(err))
  })
  .post((req, res) => {
    dbPostCall(req.body, req.query.table)
    res.send('Entry accepted!')
  })
  .put((req, res) => {
    updateEntry(req.body)
    res.send('Entry changed.')
  })
  .delete((req, res) => {
    deleteEntry(req.body, req.query.table)
    res.send('Entry deleted.')
  })

module.exports = router

app.listen(PORT, () => `Connection successful on port ${PORT}.`)
