import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { readJSON } from '../utils.js'

const movies = readJSON('./movies.json')

/*
// Importar y leer un json en ESModules

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const movies = require('./movies.json')
*/

export const moviesRouter = Router()

// Obtener todas las películas. Si se le pasa un género como parámetro, sólo muestra las películas de ese género.

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.includes(genre))
    return res.json(filteredMovies)
  }

  res.json(movies)
})

// Obtener una película por su id con req.params

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

// Crear una película utilizando validaciones zod. Si algún atributo no cumple con los requisitos establecidos en el schema (movies.js), la api no los aceptará.

moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) { return res.status(400).json({ error: JSON.parse(result.error.message) }) }

  const newMovie = {
    id: randomUUID(),
    ...result.data
  }

  // Esto no sería rest porque estamos guardando el estado de la aplicación en memoria.
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

// Actualizar una película utilizando validaciones zod. Se puede modificar uno o varios atributos excepto el id ya que éste no lo incluímos en el schema.

moviesRouter.patch('/:id', (req, res) => {
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

// Borrar una película

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params

  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) { return res.status(404).json({ message: 'Movie not found' }) }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})
