let Creature = require("./Creature")
module.exports = class Meteorite extends Creature {
    constructor(x, y) {
        super(x,y);
        meteoriteArr.push(this);
        matrix[y][x] = 5;
    }

    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        let cell = Math.floor(Math.random() * this.chooseCell(0).length);
        let cell1 = Math.floor(Math.random() * this.chooseCell(3).length);
        if (cell) {
            const x = cell[0];
            const y = cell[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 5;
            this.x = x;
            this.y = y;
        }
        else if (cell1) {
            this.blowUp();
        }
        else {
            this.die();
        }
    }
    blowUp() {
        let cell = Math.floor(Math.random() * this.chooseCell(3).length);
        if (cell) {
            this.die();
            for (let i in planetArr) {
                if (cell[0] == planetArr[i].x && cell[1] == planetArr[i].y) {
                    planetArr.splice(i, 1);
                    matrix[cell[1]][cell[0]] = 0;
                    break;
                }
            }
        }
    }
    die() {
        for (let i in meteoriteArr) {
            if (meteoriteArr[i].x == this.x && meteoriteArr[i].y == this.y) {
                meteoriteArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}