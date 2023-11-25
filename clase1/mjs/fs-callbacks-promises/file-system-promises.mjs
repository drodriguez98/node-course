// Leer el contenido de varios archivos de forma asíncrona con promesas.

// import fs from ('node:fs/promises')

import { readFile } from "node:fs/promises";

console.log('Leyendo el primer archivo...');

readFile('./file-1.txt', 'utf-8')

    .then (firstText => { console.log('Contenido del primer archivo:', firstText) })
    .catch(error => { console.error('Error al leer el primer archivo:', error) })

console.log('--> Haciendo cosas mientras lee el primer archivo');

console.log('Leyendo el segundo archivo...');

readFile('./file-2.txt', 'utf-8')

    .then (secondText => { console.log('Contenido del segundo archivo:',secondText) })
    .catch(error => { console.error('Error al leer el segundo archivo:', error) })

// Si añadimos /promises al import automáticamente añadirá promesas a cada readFile. Cada llamada a readFile devuelve una promesa, y se encadenan métodos .then() para manejar el resultado exitoso y .catch() para manejar cualquier error que pueda ocurrir durante la lectura del archivo.

// Si algún método no se puede utilizar con /promise podemos importar el módulo promisify.