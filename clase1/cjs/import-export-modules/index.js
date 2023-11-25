// Importar módulos en CommonJS

/*
    .js => utiliza CommonJS por defecto
    .cjs => también utiliza CommonJS
    .mjs => utiliza ES Modules
*/

const calc = require('./calc')
console.log(calc.sum(1, 2))
console.log(calc.sub(5, 3))

const greet = require('./greet')
console.log(greet('Diego'))
