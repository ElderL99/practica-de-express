const fs = require("fs");
const dbname = "koders.json";  // Cambié la extensión a .json para reflejar que es un archivo de datos

// Función para escribir datos en el archivo JSON
function write(newdata) {
    fs.writeFileSync(dbname, JSON.stringify(newdata), "utf8");
}

function init() {
    const exist = fs.existsSync(dbname);
    if (!exist) {
        write([]);  // Pasamos un array vacío como newdata
    }
}

function getDB() {
    const content = fs.readFileSync(dbname, "utf8");
    return JSON.parse(content);
}

function updateDB(newdata) {
    write(newdata);  // Llamamos a la función write con newdata
}

module.exports = {
    init,
    getDB,
    updateDB
};
