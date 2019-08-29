const gravity = 0.1;
const rad = 20;
const col = [200, 100, 0];


class Appelsin {
    constructor(y, dx, dy) {
        this.x = rad;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.tid = 100 + int(Math.random() * 100);
    }

    move() {
        if (this.tid < 0) {
            this.x += this.dx;
            this.y += this.dy;
            this.dy += gravity;
        } else {
            this.tid -= 1;
        }
    }

    display() {
        fill(col);
        ellipse(this.x, this.y, rad * 2, rad * 2);
    }

    isOutOfBounds() {
        return this.x > windowWidth || this.y > windowHeight;
    }
}