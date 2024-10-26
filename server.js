const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    const data = { nombre, correo, mensaje, fecha: new Date().toISOString() };
    
    // Generar un nombre único para el archivo con el formato "nombrecorreo_fecha.json"
    const fileName = `${nombre}_${correo}_${Date.now()}.json`;
    const filePath = path.join(__dirname, 'form', fileName);

    // Guardar el archivo en la carpeta /form
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Error al guardar el archivo:", err);
            res.status(500).send('Error al guardar el archivo.');
        } else {
            console.log(`Respuesta guardada en: ${filePath}`);
            res.status(200).send('Formulario enviado correctamente.');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
