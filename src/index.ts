//Module dependencies.

import http from 'http'
import * as dotenv from "dotenv"
dotenv.config();
import app from './app'

//Get port from environment and store in Express.

app.set('port', process.env.port)

//Create HTTP server.

const server = http.createServer(app)

//Listen on provided port, on all network interfaces.

server.listen(process.env.PORT)
server.on('listening', () => {
    console.log('Express server listening on ' + process.env.PORT)
})

// routes
import './routes'

export default server;