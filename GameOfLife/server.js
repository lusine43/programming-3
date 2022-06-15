var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

var object = {
    matrix: [],
    matrix_generator: function matrix_generator(matrixSize, star, galaxy, hollow, meteorite) {
    for (let y = 0; y < matrixSize; y++) {
        matrix.push([]);
        for (let x = 0; x < matrixSize; x++) {
            matrix[y].push(0);
        }
    }
    for (let i = 0; i < star; i++) {
        let x1 = Math.round(Math.random() * (matrix.length - 1));
        let y1 = Math.round(Math.random() * (matrix.length - 1));
        new Star(x1, y1);
    }
    for (let i = 0; i < galaxy; i++) {
        let x1 = Math.round(Math.random() * (matrix.length - 1));
        let y1 = Math.round(Math.random() * (matrix.length - 1));
        new Galaxy(x1, y1);
    }
    for (let i = 0; i < hollow; i++) {
        let x1 = Math.round(Math.random() * (matrix.length - 1));
        let y1 = Math.round(Math.random() * (matrix.length - 1));
        new Hollow(x1, y1);
    }
    for (let i = 0; i < meteorite; i++) {
        let x1 = Math.round(Math.random() * (matrix.length - 1));
        let y1 = Math.round(Math.random() * (matrix.length - 1));
        new Meteorite(x1, y1);
    }
  }
}

//socket.emit("object", object.matrix_generator(20, 10, 7, 5, 2)); script-um el socket.on(??)