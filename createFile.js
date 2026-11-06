// Este modulo propio va a ser capaz de crear un archivo JSON
const fs = require("fs");

function createFileIdol() {
    const newIdol = {
        last: "Fukuhara",
        name: "Tamon",
        age: 18
    }

    const jsonIdol = JSON.stringify(newIdol, null, 2);
    
    fs.writeFileSync("dataIdol.json", jsonIdol);
}

module.exports = { createFileIdol };