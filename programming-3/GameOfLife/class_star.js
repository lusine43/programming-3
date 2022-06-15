class Star extends Creature{
    constructor(x,y){
        super(x,y);
        starArr.push(this);
        matrix[y][x] = 1;
    }
    
    mul() {
        this.multiply++;
        const cell = random(super.chooseCell(0));
        if (this.multiply >= 5 && cell) {
            new Star(cell[0], cell[1]);
            this.multiply = 0;
        }
    }
}