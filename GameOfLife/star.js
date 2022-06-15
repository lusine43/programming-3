let Creature = require("./Creature")
modlue.exports = class Star extends Creature{
    constructor(x,y){
        super(x,y);
        starArr.push(this);
        matrix[y][x] = 1;
    }
    
    mul() {
        this.multiply++;
        const cell = Math.floor(Math.random() * super.chooseCell(0).length);
        if (this.multiply >= 5 && cell) {
            new Star(cell[0], cell[1]);
            this.multiply = 0;
        }
    }
}