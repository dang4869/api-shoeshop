const express = require('express')
const app = express()
const db = require('./config/database')
const route = require('./routes')
const errorHandler = require('./app/middleware/error')
const port = 3000
 
app.use(express.json())
db.connect()
app.use('/api/v1/', route)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})