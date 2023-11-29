import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'nodeCourse',
  port: 3306,
  password: '',
  database: 'moviesdb'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // Buscar el ID del género proporcionado
      const [genres] = await connection.query('SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre])

      // Si no se encuentra el género, retornar un array vacío
      if (genres.length === 0) return []

      // Obtener el ID del primer resultado de género
      const [{ id }] = genres

      try {
        // Obtener todas las películas asociadas al género desde la tabla movie_genres
        const [moviesData] = await connection.query(
          `SELECT BIN_TO_UUID(m.id) id, m.title, m.year, m.director, m.duration, m.poster, m.rate, GROUP_CONCAT(g.name) AS genres
            FROM movie m
            INNER JOIN movie_genres mg ON m.id = mg.movie_id
            INNER JOIN genre g ON mg.genre_id = g.id
            WHERE mg.genre_id = ?
            GROUP BY m.id;`,
          [id]
        )

        const movies = moviesData.map(movie => ({
          title: movie.title,
          year: movie.year,
          director: movie.director,
          duration: movie.duration,
          poster: movie.poster,
          genre: movie.genres ? movie.genres.split(',') : [], // Verificación para asegurar que movie.genres no sea null
          rate: movie.rate
        }))

        return movies
      } catch (error) { throw new Error('Error fetching movies by genre') }
    }

    // Si no se proporciona ningún género, recuperar todas las películas

    const [moviesData] = await connection.query(
      `SELECT BIN_TO_UUID(m.id) id, m.title, m.year, m.director, m.duration, m.poster, m.rate, GROUP_CONCAT(g.name) AS genres
        FROM movie m
        LEFT JOIN movie_genres mg ON m.id = mg.movie_id
        LEFT JOIN genre g ON mg.genre_id = g.id
        GROUP BY m.id;`
    )

    const movies = moviesData.map(movie => ({
      // id: movie.id,
      title: movie.title,
      year: movie.year,
      director: movie.director,
      duration: movie.duration,
      poster: movie.poster,
      genre: movie.genres ? movie.genres.split(',') : [], // Verificación para asegurar que movie.genres no sea null
      rate: movie.rate
    }))

    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movies.length === 0) return null

    const movieData = movies[0]

    // Obtener los géneros asociados a la película
    const [genresData] = await connection.query(
      `SELECT g.name
        FROM genre g
        INNER JOIN movie_genres mg ON g.id = mg.genre_id
        WHERE mg.movie_id = UUID_TO_BIN(?);`,
      [id]
    )

    const genres = genresData.map(genre => genre.name)

    // Formatear la película con los géneros obtenidos
    const formattedMovie = {
      // id: movieData.id,
      title: movieData.title,
      year: movieData.year,
      director: movieData.director,
      duration: movieData.duration,
      poster: movieData.poster,
      rate: movieData.rate,
      genre: genres
    }

    return formattedMovie
  }

  static async create ({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    let movieId

    try {
      // Insertar la película en la tabla movie
      const [uuidResult] = await connection.query('SELECT UUID() uuid;')
      const [{ uuid }] = uuidResult

      const [insertMovie] = await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )

      movieId = insertMovie.insertId // Obtener el ID de la película insertada

      // Insertar los géneros asociados a la película en la tabla movie_genres
      for (const genre of genreInput) {
        const [genreIdResult] = await connection.query(
          'SELECT id FROM genre WHERE name = ?;',
          [genre]
        )

        if (genreIdResult.length > 0) {
          const [{ id: genreId }] = genreIdResult // Obtener directamente el ID del resultado

          // Insertar en movie_genres con los IDs correctos de película y género
          await connection.query(
            `INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN("${uuid}"), ?);`,
            [genreId]
          )
        }
      }
    } catch (e) {
      console.error('Error creating movie:', e) // Registrar el error detallado
      throw new Error('Error creating movie')
    }
  }

  static async delete ({ id }) {
    // ejercio fácil: crear el delete
  }

  static async update ({ id, input }) {
    // ejercicio fácil: crear el update
  }
}
