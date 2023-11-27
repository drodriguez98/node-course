import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  // Obtener todas las películas. Si se le pasa un género como parámetro, sólo muestra las películas de ese género.

  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  // Obtener una película por su id con req.params

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  // Crear una película utilizando validaciones zod. Si algún atributo no cumple con los requisitos establecidos en el schema (movies.js), la api no los aceptará.

  static async create (req, res) {
    const result = validateMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  // Actualizar una película utilizando validaciones zod. Se puede modificar uno o varios atributos excepto el id ya que éste no lo incluímos en el schema.

  static async update (req, res) {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })
    return res.json(updatedMovie)
  }

  // Borrar una película

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    return res.json({ message: 'Movie deleted' })
  }
}
