import fs from 'fs';
import csv from 'csv-parser';
import pool from '../config/db.js'; // tu conexión MySQL

async function importarCSV(rutaArchivo) {
    const resultados = [];

    fs.createReadStream(rutaArchivo, { encoding: 'utf8' })
        .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim() }))// porque tu CSV usa ;
        .on('data', (data) => resultados.push(data))
        .on('end', async () => {
            for (const fila of resultados) {
                const { level, modality, section} = fila;
                await pool.query(
                    'INSERT INTO `groups`(level, modality, section) VALUES (?, ?, ?)',
                    [level.trim(), modality.trim(), section.trim()]
                );
            }
            console.log('Importación completada');
        });
}

importarCSV('C:\\Users\\DELL\\behavior-tracking-system\\groups.csv');
