const db = require("./db");

// Función para añadir un nuevo koder
function add(name) {
    if (!name) {
        throw new Error("name is required");
    }

    const koders = db.getDB();
    koders.push(name);
    db.updateDB(koders);
    return koders;
}

// Función para eliminar un koder por nombre
function removeByName(name) {
    if (!name) {
        throw new Error("name is required");
        
    }

    const koders = db.getDB(); // Corrección: invocación de getDB

    // Encuentra el koder con el nombre proporcionado
    const koderFound = koders.find((koder) => koder.toLowerCase() === name.toLowerCase());

    if (!koderFound) {
        throw new Error("koder not found");
    }

    // Filtra los koders para eliminar el koder especificado
    const newKoders = koders.filter((koder) => koder.toLowerCase() !== name.toLowerCase());

    db.updateDB(newKoders);
    return newKoders;
};

// Función para eliminar todos los koders
function removeAll() {
    db.updateDB([]);
};

// Función para obtener todos los koders
function getAll() {
    return db.getDB();
};

module.exports = {
    add,
    removeAll,
    removeByName,
    getAll,
};
