// Módulo OS

const os = require('node:os')

// Es muy útil para obtener información del equipo cliente y escalar procesos

console.log('Información del sistema operativo')

console.log('SO:', os.platform())
console.log('Versión:', os.release())
console.log('Arquitectura:', os.arch())
console.log('CPUs:', os.cpus())
console.log('Memoria libre:', os.freemem() / 1024 / 1024)
console.log('Memoria total:', os.totalmem() / 1024 / 1024)
console.log('Tiempo encendido:', os.uptime() / 60 / 60 / 24, 'días')