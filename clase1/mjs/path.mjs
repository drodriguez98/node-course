import path from 'node:path'

// console.log(path.sep) es diferente en Windows que en Linux

// Concatenar rutas con join automaticamente independientemente del SO

const  filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// Obtener el nombre de un directorio

const dir = path.dirname('tmp/midu-secret-files/password.txt')
console.log(dir)

// Obtener el nombre de un archivo

const base = path.basename('tmp/midu-secret-files/password.txt')
console.log(base)

// Obtener el nombre de un archivo sin la extensión

const filename = path.basename('tmp/midu-secret-files/password.txt', '.txt')
console.log(filename)

// Obtener la extensión de un archivo

const extension = path.extname('image.jpg')
console.log(extension)