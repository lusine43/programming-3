class Hollow extends Creature {
    constructor(x, y) {
        super(x,y);
        this.energy = 15;
        hollowArr.push(this);
        matrix[y][x] = 4;
    }
    eat() {
        let cell = random(super.chooseCell(Math.round(Math.random() * 5)));
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