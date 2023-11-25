import http from 'node:http' // Protocolo HTTP
import { findAvailablePort } from './free-port.mjs'

console.log(process.env)

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Request received')
  res.end('Hola')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})

// node http.mjs
// node --watch http.mjs
// curl http://localhost:1234
