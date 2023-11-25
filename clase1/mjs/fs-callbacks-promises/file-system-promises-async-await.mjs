// Leer el contenido de varios archivos de forma asíncrona con promeses async-await.

// import fs from ('node:fs/promises')

import { readFile } from "node:fs/promises";

console.log('Leyendo el primer archivo...')
const text = await readFile('./file-1.txt', 'utf-8')
console.log('Primer texto:', text)
console.log('--> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
const secondText = await readFile('./file-2.txt', 'utf-8')
console.log('Segundo texto:', secondText)

/* 

async function init () {

    console.log('Leyendo el primer archivo...')
    const text = await readFile('./file-1.txt', 'utf-8')
    console.log('Primer texto:', text)
    console.log('--> Hacer cosas mientras lee el archivo...')

    console.log('Leyendo el segundo archivo...')
    const secondText = await readFile('./file-2.txt', 'utf-8')
    console.log('Segundo texto:', secondText)    

}
  
init()

*/