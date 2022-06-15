class Galaxy extends Creature{
    constructor(x, y) {
        super(x,y);
        this.energy = 10;
        galaxyArr.push(this);
        matrix[y][x] = 2;
    }
    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character);
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