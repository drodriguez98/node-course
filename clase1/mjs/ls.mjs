import fs from 'node:fs/promises'

fs.readdir('.')

  .then(files => {
    files.forEach(file => {
      console.log(file)
    })
  })

  .catch(err => {
    console.log('Error al leer el directorio: ', err)
  })

// node ls.mjs
