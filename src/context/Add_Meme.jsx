import React from "react";
// Importa el módulo fs para manejar archivos
import fs from 'fs';

// Ruta al archivo de la base de datos
const dbPath = '../components/Factory/content/db_memes.js';

// Función para agregar un nuevo meme a la base de datos

const Add_Meme = (memeData) => {
    // Lee los datos actuales de la base de datos
    console.log("entrando a add meme")
    let memes = [];
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        memes = JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
    }

    // Agrega el nuevo meme a la lista
    memes.push(memeData);

    // Escribe los datos actualizados de vuelta al archivo
    try {
        fs.writeFileSync(dbPath, JSON.stringify(memes, null, 2));
        console.log('Meme added to database:', memeData);
    } catch (error) {
        console.error('Error writing to database:', error);
    }
};

// Exporta la función para que pueda ser utilizada en otros archivos
export {Add_Meme};
