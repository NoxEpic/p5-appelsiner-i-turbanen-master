/*
 * Dette script definerer klassen Kurv
 */

class Kurv {
    constructor(x, y, bredde, dybde, speed) {
        /* Den første del af funktionen er en "konstruktør".
         * Den tager parametrene og konstruerer et nyt objekt 
         * ud fra dem. Værdierne huskes som hørende til netop 
         * dette objekt ved hjælp af nøgleordet this
         */
        //Det her der beskevlsen af hvad kurven er 
        this.x = x;
        this.y = y;
        this.bred = bredde;
        this.dyb = dybde;
        this.speed = speed;
        this.col = [250, 230, 150];
    }

    tegn() {
        if (keyIsDown(87)) { // W
            this.y = Math.max(this.y - this.speed, 0);
        }
        if (keyIsDown(83)) { // S
            this.y = Math.min(this.y + this.speed, height - this.dyb);
        }
        if (keyIsDown(65)) { // A
            this.x = Math.max(this.x - this.speed, 0);
        }
        if (keyIsDown(68)) { // D
            this.x = Math.min(this.x + this.speed, width - this.bred);
        }
        fill(this.col);
        rect(this.x, this.y, this.bred, this.dyb);
    }

    // den her function holder øje med når appelsien rammer ned i kurven
    grebet = function (xa, ya, ra) {
        if ((ya < this.y + 5 && ya > this.y - 5) && xa > this.x + ra && xa < this.x + this.bred - ra) {
            return true;
        } else {
            return false;
        }
    }
    // det her er mit forså på at få en function til at holde øje med når appelsien ikke rammer
    misst = function (xa, ya, ra) {
        if ((ya < this.y - 5 && ya > this.y + 5) && xa > this.x + ra && xa < this.x + this.bred - ra) {
            return false;;
        } else {
            return true;
        }
    }
}