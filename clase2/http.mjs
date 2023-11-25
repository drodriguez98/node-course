import http from 'node:http' // Protocolo HTTP

console.log(process.env)

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end('<h1>Bienvenido</h1>')
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404 // Not found
    res.end('<h1>Error 404 (Not Found) </h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
