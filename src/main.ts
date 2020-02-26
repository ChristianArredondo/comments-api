import express from 'express'
import { MongoClient } from 'mongodb'
import { AddressInfo } from 'net'
import * as bodyparser from 'body-parser'
import { commentsController } from './controllers/comments'

const app = express()

// middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// healthcheck
app.use('/ping', (_, res) => res.send({ yo: 'server is alive' }))

// connect to db
console.log('Connecting to MongoDB...')
MongoClient.connect(
  process.env.MONGO_URI || 'mongodb://localhost:27017/',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(mongoClient => {
    console.log('Connected to MongoDB')

    // db ref
    const db = mongoClient.db(process.env.DB_NAME || 'comments-api')

    // init endpoints
    app.use('/comments', commentsController(db))

    // boot
    const server = app.listen(process.env.PORT || 8080, () => {
      const address = server.address() as AddressInfo
      console.log(`Server listening on port ${address.port}`)
    })
  })
  .catch(err => {
    console.log('Unable to connect to MongoDB', err)
    process.exit(1)
  })
