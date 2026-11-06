const http = require("http");
const fs = require("fs").promises;
const cf = require("./createFile");

const server = http.createServer( async(req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.statusCode = 200;

    try{
        if(req.url === "/imagen" && req.method === "GET"){
          const img = await fs.readFile("Tamooo.png");
          res.setHeader("Content-Type", "image/png");
          res.end(img);
          
        } else if (req.url === "/data" && req.method === "GET") {
            const data = await fs.readFile("dataIdol.json", "utf8");
            res.end(data);
          
        } else if (req.url === "/data" && req.method === "POST"){
            cf.createFileIdol();
            res.statusCode = 201;
            res.end("El archivo JSON fue creado con exito!");

        } else if (req.url === "/mensaje" && req.method === "GET") {
            const data = await fs.readFile("info.txt", "utf8");
            res.end(data);

        } else if (req.url === "/update" && req.method === "POST"){
            const infoContenido = "Archivo actualizado correctamente";
            await fs.writeFile("info.txt", infoContenido, "utf8");
            res.statusCode = 201;
            res.end("El txt fue actualizado con exito!");

        } else if (req.url === "/message" && req.method === "GET") {
            const data = await fs.readFile("message.txt", "utf8");
            res.end(data);
        
        } else if(req.url === "/mensaje" && req.method === "DELETE"){
            await fs.unlink("message.txt");
            res.end("El txt fue eliminado con exito!");

        } else {
            res.statusCode = 404;
            res.end("Ruta no encontrada");
        }
    }

    catch(err){
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("Archivo no encontrado");
        } else {
      res.statusCode = 500;
      res.end("Error interno del servidor");
    }
    }

});

server.listen(0, function () {
  console.log(`Escuchando en el puerto ${server.address().port}`);
});