class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(p) {
        p.fill("#ffffff");
        p.ellipse(this.x, this.y, 50, 50);
    }
}
