import fs from 'fs';
import csv from 'csv-parser';
import pool from '../config/db.js'; // tu conexión MySQL

async function importarCSV(rutaArchivo) {
    const resultados = [];

    fs.createReadStream(rutaArchivo)
        .pipe(csv({ separator: ';' , mapHeaders: ({header}) => header.trim()})) // porque tu CSV usa ;
        .on('data', (data) => resultados.push(data))
        .on('end', async () => {
            for (const fila of resultados) {
                const { group_id, NIE, name, lastname } = fila;
                await pool.query(
                    'INSERT INTO students (group_id, NIE, name, lastname) VALUES (?, ?, ?, ?)',
                    [group_id.trim(), NIE.trim(), name.trim(), lastname.trim()]
                );
            }
            console.log('Importación completada');
        });
}

importarCSV('C:\\Users\\DELL\\behavior-tracking-system\\students.csv');
