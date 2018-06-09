class Circle {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw(p : p5) {
        p.fill("#ffffff");
        p.ellipse(this.x, this.y, 50, 50);
    }
}