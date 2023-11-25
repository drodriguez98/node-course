// Módulo FS

// import fs from 'node:fs'

import { statSync } from 'node:fs';

const stats = statSync('./file-1.txt')

console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size // tamaño en bytes
)