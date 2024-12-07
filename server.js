const express = require("express"); // Importa el módulo de Express

const server = express(); // Crea una instancia del servidor de Express
const port = 8080; // Define el puerto en el que el servidor va a escuchar
const kodersUsesCases = require("./koders"); // Importa los casos de uso relacionados con "koders"
const db = require("./db"); // Importa el módulo de base de datos

db.init(); // Inicializa la base de datos

server.use(express.json()); // Middleware para parsear las solicitudes con cuerpos JSON

// Ruta GET para obtener todos los "koders"
server.get("/koders", (request, response) => {
    try {
        const koders = kodersUsesCases.getAll(); // Llama a la función getAll() para obtener todos los koders
        response.json({
            message: "all koders get", // Mensaje de respuesta
            data: { koders } // Datos de respuesta: lista de koders
        });
    } catch (error) {
        response.status(500).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta POST para añadir un nuevo "koder"
server.post("/koders", (request, response) => {
    const name = request.body.name; // Obtiene el nombre del cuerpo de la solicitud

    try {
        const koders = kodersUsesCases.add(name); // Llama a la función add() para añadir el nuevo koder
        response.json({
            message: "koder created", // Mensaje de respuesta
            data: { koders }, // Datos de respuesta: lista actualizada de koders
            success: true, // Indica que la operación fue exitosa
        });
    } catch (error) {
        response.status(400).json({
            message: error.message,
            success: false
        });
    }
});

// Ruta DELETE para eliminar un "koder" por nombre
server.delete("/koders/:name", (request, response) => {
    const name = request.params.name; // Obtiene el nombre de los parámetros de la ruta

    try {
        const koders = kodersUsesCases.removeByName(name); // Llama a la función removeByName() para eliminar el koder
        response.json({
            message: "koder deleted", // Mensaje de respuesta
            success: true, // Indica que la operación fue exitosa
            data: { koders }, // Datos de respuesta: lista actualizada de koders
        });
    } catch (error) {
        response.status(400).json({
            message: error.message, // Mensaje de error
            success: false // Indica que la operación no fue exitosa
        });
    }
});

// Ruta DELETE para eliminar todos los "koders"
server.delete("/koders", (request, response) => {
    try {
        kodersUsesCases.removeAll(); // Llama a la función removeAll() para eliminar todos los koders
        response.json({
            message: "all koders deleted", // Mensaje de respuesta
            success: true // Indica que la operación fue exitosa
        });
    } catch (error) {
        response.status(500).json({
            message: error.message, // Mensaje de error
            success: false // Indica que la operación no fue exitosa
        });
    }
});

// Inicia el servidor y escucha en el puerto definido
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`); // Mensaje de consola indicando que el servidor está funcionando
});
