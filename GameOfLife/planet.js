let Creature = require("./Creature")
module.exports = class Planet extends Creature{
    constructor(x, y) {
        super(x,y);
        planetArr.push(this);
        matrix[y][x] = 3;
    }
    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        let cell = Math.floor(Math.random() * this.chooseCell(0).length);
        if (cell) {
            matrix[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            matrix[this.y][this.x] = 3;
            this.x = cell[0];
            this.y = cell[1]
        }
        else {
            this.die();
        }
    }

    die() {
        for (let i in planetArr) {
            if (planetArr[i].x == this.x && planetArr[i].y == this.y) {
                planetArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}