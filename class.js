class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        starArr.push(this);
        matrix[y][x] = 1;
    }

    chooseCell(character) {
        const found = [];
        for (let i in this.directions) {
            const x = this.directions[i][0];
            const y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        const cell = random(this.chooseCell(0));

        if (this.multiply >= 5 && cell) {
            new Star(cell[0], cell[1]);
            this.multiply = 0;
        }
    }
}
//////////////////////////////////////////////////////////
class Galaxy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [];
        galaxyArr.push(this);
        matrix[y][x] = 2;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        const found = [];
        for (let i in this.directions) {
            const x = this.directions[i][0];
            const y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat() {
        let cell = random(this.chooseCell(1));
        if (cell) {
            const x = cell[0];
            const y = cell[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy++;
            for (let i in starArr) {
                if (x == starArr[i].x && y == starArr[i].y) {
                    starArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy > 10) {
                this.generate();
            }
        }
        else {
            this.move();
        }
    }

    generate() {
        let cell = random(this.chooseCell(0));
        if (cell) {
            new Planet(this.x, this.y);
            new Planet(cell[0], cell[1]);
            this.die();
        }
        else {
            this.eat();
        }

    }

    move() {
        let cell = random(this.chooseCell(0));
        if (cell) {
            const x = cell[0];
            const y = cell[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 2;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in galaxyArr) {
            if (galaxyArr[i].x == this.x && galaxyArr[i].y == this.y) {
                galaxyArr.splice(i, 1);
                break;
            }
        }
    }
}
///////////////////////////////////////////////////////////////
class Planet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        planetArr.push(this);
        matrix[y][x] = 3;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        const found = [];
        for (let i in this.directions) {
            const x = this.directions[i][0];
            const y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        let cell = random(this.chooseCell(0));
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
//////////////////////////////////////////////////////////
class Hollow {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        hollowArr.push(this);
        matrix[y][x] = 4;
    }

    chooseCell(character) {
        const found = [];
        for (let i in this.directions) {
            const x = this.directions[i][0];
            const y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat() {
        let cell = random(this.chooseCell(Math.round(Math.random() * 5)));
        if (cell) {
            let x = cell[0];
            let y = cell[1];
            this.energy--;
            if (matrix[y][x] == 1) {
                this.it_dies(starArr);
            }
            else if (matrix[y][x] == 2) {
                this.it_dies(galaxyArr);
            }
            else if (matrix[y][x] == 3) {
                this.it_dies(planetArr);
            }
            else if (matrix[y][x] == 5) {
                this.it_dies(meteoriteArr);
            }
            matrix[y][x] = 0;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    it_dies(array) {
        for (let i in array) {
            if (this.x == array[i].x && this.y == array[i].y) {
                array.splice(i, 1);
                break;
            }
        }
    }

    die() {
        for (let i in hollowArr) {
            if (this.x == hollowArr[i].x && this.y == hollowArr[i].y) {
                hollowArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}
////////////////////////////////////////////////////////////////
class Meteorite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        meteoriteArr.push(this);
        matrix[y][x] = 5;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        const found = [];
        for (let i in this.directions) {
            const x = this.directions[i][0];
            const y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        let cell = random(this.chooseCell(0));
        let cell1 = random(this.chooseCell(3));
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
        let cell = random(this.chooseCell(3));
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