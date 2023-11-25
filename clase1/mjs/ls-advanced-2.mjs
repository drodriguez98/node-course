import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const folder = process.argv[2] ?? '.'

async function ls(folder) {

    let files

    try {

        files = await readdir(folder);

    } catch (error) {

        console.error(`No se pudo leer el directorio ${folder}`)
        process.exit(1)

    }

    const filePromises = files.map(async (file) => {

        const filePath = path.join(folder, file)

        let stats;

        try {

            stats = await stat(filePath);

        } catch (error) {

            console.error(`No se pudo leer el archivo ${filePath}`)
            process.exit(1)

        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f'
        const fileSize = stats.size.toString()
        const fileModified = stats.mtime.toLocaleString()

        return `${fileType.padEnd(8)} ${file.padEnd(30)} ${fileSize.padEnd(10)} ${fileModified}`

    })

    const filesInfo = await Promise.all(filePromises)

    filesInfo.forEach((fileInfo) => console.log(fileInfo))

}

ls (folder)

// node .\mjs\ls-advanced.mjs ./cjs 
// node .\mjs\ls-advanced.mjs ./cjl --> error