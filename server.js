const express = require('express')
const cors = require('cors')
const dbGetCall = require('./read')
const dbPostCall = require('./create')
const deleteEntry = require('./delete')
const updateEntry = require('./update')
const app = express()
const router = express.Router()
const PORT = process.env.PORT || 4000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: 'https://pd-library-crud-app.herokuapp.com/',
    credentials: true
  }))

app.route('/api')
  .get((req, res) => {
    dbGetCall(req.query.table)
      .then(tableData => res.send(tableData))
      .catch(err => console.log(err))
  })
  .post((req, res) => {
    console.log(Object.entries(JSON.parse(Object.keys(req.body)))) // Tracer code
    dbPostCall(req.body, req.query.table)
    res.send('Entry accepted!')
  })
  .put((req, res) => {
    updateEntry(req.body)
    res.send('Entry changed.')
  })
  .delete((req, res) => {
    console.log(Object.values(JSON.parse(Object.keys(req.body))))
    console.log(Object.keys(JSON.parse(Object.keys(req.body))))
    // const parseParam = Object.values(JSON.parse(Object.keys(params)))
    // const queryParam = Object.keys(JSON.parse(Object.keys(params)))
    deleteEntry(req.body, req.query.table)
    res.send('Entry deleted.')
  })

module.exports = router

app.listen(PORT, () => `Connection successful on port ${PORT}.`)
