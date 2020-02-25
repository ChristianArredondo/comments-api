import express from 'express'
import { AddressInfo } from 'net'
import * as bodyparser from 'body-parser'

const app = express()

// middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// healthcheck
app.use('/ping', (_, res) => res.send({ yo: 'server is alive' }))

// init
const server = app.listen(process.env.PORT || 8080, () => {
  const address = server.address() as AddressInfo
  console.log(`Server listening on port ${address.port}`)
}) 