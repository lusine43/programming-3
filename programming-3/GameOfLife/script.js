/*let sound = new Audio('sound/SpaceShuttle.mp3');
sound.play();*/

let matrix = [];

let side = 50;
let starArr = [];
let galaxyArr = [];
let planetArr = [];
let hollowArr = [];
let meteoriteArr = [];

function matrix_generator(matrixSize, star, galaxy, hollow, meteorite) {
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

let img, img1, img2, img3, img4, img5;

function preload() {
    img1 = loadImage('https://i.imgur.com/w4O5U4J.png');
    img2 = loadImage('https://i.imgur.com/6Q2pC4h.png');
    img3 = loadImage('https://i.imgur.com/VOpuoyA.png');
    img4 = loadImage('https://i.imgur.com/XzhiYhg.png');
    img5 = loadImage('https://i.imgur.com/o8qbxAj.png');
}
function setup() {
    frameRate(5);
    matrix_generator(20, 10, 7, 5, 2);
    createCanvas(matrix[0].length * side, matrix.length * side)
    background("blue");
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("blue");
                rect(y * side, x * side, side, side);
            }
            if (matrix[y][x] == 1) {
                image(img1, y * side, x * side, side / 2, side / 2);
            }
            else if (matrix[y][x] == 2) {
                image(img2, y * side, x * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                image(img3, y * side, x * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                image(img4, y * side, x * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                image(img5, y * side, x * side, side / 1.5, side / 1.5);
            }
            //rect(y * side, x * side, side, side); -» ընդամենը էս տողը պետք ա չգրեի
            noStroke();
        }
    }
    for (let i in starArr) {
        starArr[i].mul();
    }
    for (let i in galaxyArr) {
        galaxyArr[i].eat();
    }
    for (let i in planetArr) {
        planetArr[i].move();
    }
    for (let i in hollowArr) {
        hollowArr[i].eat();
    }
    for (let i in meteoriteArr) {
        meteoriteArr[i].move();
    }
}


