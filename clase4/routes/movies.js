import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

/*
// Importar y leer un json en ESModules

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const movies = require('./movies.json')
*/

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.post('/', MovieController.create)
moviesRouter.get('/:id', MovieController.getById)
moviesRouter.delete('/:id', MovieController.delete)
moviesRouter.patch('/:id', MovieController.update)
