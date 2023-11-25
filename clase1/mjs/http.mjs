import { http } from 'node:http' 

const { findAvailablePort } = require('./free-port.mjs')

console.log(process.env)

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
    
  console.log('request received')
  res.end('Hola mundo')

})

findAvailablePort(desiredPort).then(port => {

  server.listen(port, () => {

    console.log(`server listening on port http://localhost:${port}`)

  })

})