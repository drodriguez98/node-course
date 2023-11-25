// Módulo OS

// import os from 'node:os'

import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os'

// Es muy útil para obtener información del equipo cliente y escalar procesos

console.log('Información del sistema operativo')

console.log('SO:', platform())
console.log('Versión:', release())
console.log('Arquitectura:', arch())
console.log('CPUs:', cpus())
console.log('Memoria libre:', freemem() / 1024 / 1024)
console.log('Memoria total:', totalmem() / 1024 / 1024)
console.log('Tiempo encendido:', uptime() / 60 / 60 / 24, 'días')