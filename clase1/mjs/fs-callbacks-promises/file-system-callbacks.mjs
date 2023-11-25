// Leer el contenido de varios archivos de forma asíncrona con callbacks.

// import fs from ('node:fs')

import { readFile } from "node:fs";

console.log('Leyendo el primer archivo...');

readFile('./file-1.txt', 'utf-8', (err, firstText) => { 
    
    console.log('Primer texto: ', firstText) 

});

console.log('--> Haciendo cosas mientras lee el primer archivo');

console.log('Leyendo el segundo archivo...');

readFile('./file-2.txt', 'utf-8', (err, secondText) => {

    console.log('Segundo texto: ', secondText) 

});

// La principal diferencia radica en que el uso de métodos asíncronos como readFile permite que la ejecución continúe sin bloquear el hilo principal. Para esto se utilizan callbacks, permitiendo ejecutar el código que queremos ejecutar cuando la tarea termine.