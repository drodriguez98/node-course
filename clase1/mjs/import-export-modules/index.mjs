// Importar módulos en ES Modules

/*
    .js => utiliza CommonJS por defecto
    .cjs => también utiliza CommonJS
    .mjs => utiliza ES Modules
*/

import { sum, sub } from './calc.mjs'; 

console.log ( sum(1, 2) ); 
console.log ( sub(5, 3) ); 