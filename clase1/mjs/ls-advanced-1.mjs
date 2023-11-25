import { readdir } from 'node:fs/promises'

const folder = process.argv[2] ?? '.'

readdir(folder)

  .then(files => {
    files.forEach(file => {
      console.log(file)
    })
  })

  .catch(err => {
    console.error('Error al leer el directorio:', err)
  })

// node .\mjs\ls-advanced.mjs ./cjs
// node .\mjs\ls-advanced.mjs ./cjl --> error
