import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
// import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(json())

// Filtrar origenes CORS

// app.use(corsMiddleware)

// Redireccióna a moviesRouter

app.use('/movies', moviesRouter)

// Levantar el servidor http en el primer puerto disponible a partir del 1234.

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => { console.log(`Server listening on port http://localhost:${PORT}`) })
