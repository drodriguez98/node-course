// Leer el contenido de varios archivos de forma síncrona (secuencial)

// import fs from ('node:fs')

import { readFileSync } from "node:fs"

console.log('Leyendo el primer archivo...')
const firstText = readFileSync ('./file-1.txt', 'utf-8')
console.log(firstText)

console.log('Leyendo el segundo archivo...')
const secondText = readFileSync ('./file-2.txt', 'utf-8')
console.log(secondText)

// El principal problema de hacerlo de forma síncrona es que la lectura del código es secuencial y la ejecución no continúa hasta que se complete la lectura de cada archivo.