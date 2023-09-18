const express = require('express')
const app = express()
var morgan = require('morgan')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./app/lib/swagger.json');
const db = require('./config/database')
const cors = require('cors');
const route = require('./routes')
const errorHandler = require('./app/middleware/error')
const port = 3000
 
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use('/api/v1/', route)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler)
db.connect()


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})