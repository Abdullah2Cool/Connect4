var p = new p5(null);

let c: Circle;

function setup() {
    p.createCanvas(800, 700);
    c = new Circle(p.width / 2, p.height / 2);
}

function draw() {
    p.background(0);
    c.draw(p);
}