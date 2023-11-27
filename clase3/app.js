const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

// Filtrar origenes CORS

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://movies.com',
  'http://localhost:8080'
]

// Obtener todas las películas. Si se le pasa un género como parámetro, sólo muestra las películas de ese género.

app.get('/movies', (req, res) => {
  // Cors
  const origin = req.header('origin')

  // res.header('Access-Control-Allow-Origin', '*')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.includes(genre))
    return res.json(filteredMovies)
  }

  res.json(movies)
})

// Obtener una película por su id con req.params

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

// Crear una película utilizando validaciones zod. Si algún atributo no cumple con los requisitos establecidos en el schema (movies.js), la api no los aceptará.

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  // Esto no sería rest porque estamos guardando el estado de la aplicación en memoria.
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

// Actualizar una película utilizando validaciones zod. Se puede modificar uno o varios atributos excepto el id ya que éste no lo incluímos en el schema.

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)

  if (!result.success) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) { return res.status(404).json({ message: 'Movie not found' }) }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params

  // Cors
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) { return res.status(404).json({ message: 'Movie not found' }) }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

// Cors para métodos complejos

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }
  res.send(200)
})

// Levantar el servidor http en el primer puerto disponible a partir del 1234.

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => { console.log(`Server listening on port http://localhost:${PORT}`) })
