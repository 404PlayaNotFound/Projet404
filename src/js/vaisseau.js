
function valueInRange(value,min, max)
{ 
	return (value >= min) && (value <= max);
}

class GameObject {
	constructor(x, y, h, w) {
		this.x = x;
		this.y = y;

		this.h = h;
		this.w = w;
	}

	draw() {
		rect(this.x,this.y,this.w,this.h);
	}

	colideWith(other) {
		 var xOverlap = valueInRange(this.x, other.x, other.x + other.w) ||
                    	valueInRange(other.x, this.x, this.x + this.w);

    	var yOverlap = valueInRange(this.y, other.y, other.y + other.h) ||
                    	valueInRange(other.y, this.y, this.y + this.h);

    	return xOverlap && yOverlap;
	}

	updatePos() {
		// nothing to do here
		// override this to make the magic append
	}
}


class Vaisseau extends GameObject {
	constructor(x, y, h, w){
		super(x, y, h, w);
		this.img = loadImage("src/img/Vaisseau.png");
	}
	draw() {
		image(this.img, this.x, this.y, this.img.width, this.img.height);
	}

	left(){
		this.x = this.x-1.5;
	}
	right(){
		this.x = this.x+1.5;
	}
	shoot(){
		return new Missile(this.x + this.img.width/2 -2.5 , this.y + 2, 5, 5);
	}

} 

class Ennemie extends GameObject {

	constructor(x, y, h, w){
		super(x, y, h, w);

		this.img = loadImage("src/img/Ennemy.png");
		this.isDie = false;
		this.deadSince = 0;

		// update the last enemies on the right and on the left
		if(Ennemie.LAST_ENNEMIE_RIGHT == undefined || this.x > Ennemie.LAST_ENNEMIE_RIGHT.x) {
			Ennemie.LAST_ENNEMIE_RIGHT = this;
		}

		if(Ennemie.LAST_ENNEMIE_LEFT == undefined || this.x < Ennemie.LAST_ENNEMIE_LEFT.x) {
			Ennemie.LAST_ENNEMIE_LEFT = this;
		}
	}

	getXpos() {
		return this.x;
	}
	getYpos() {
		return this.y;
	}

	draw() {
		if(!this.isDie) {
			image(this.img, this.x, this.y, this.w, this.h);
		} else {
			if(!(this.deadSince > 15)) {
				image(this.img, this.x, this.y, this.w, this.h);
				this.deadSince++;
			}			
		}
	}

	updatePos(){
		switch(Ennemie.direction){
			case 1: // droite
				this.x += 3*Ennemie.SPEED;
				break;
			case 2: // gauche
				this.x -= 3*Ennemie.SPEED;
				break;
			case 3: // bas
				this.y += 15*Ennemie.SPEED;
				break;
		}
	}

	die(){
		this.img = loadImage("src/img/Boom.png");
		this.isDie = true;
	}

	isDead() {
		return this.isDie;
	}

	static updateDirection() {
		if(((Ennemie.LAST_ENNEMIE_RIGHT.x+Ennemie.LAST_ENNEMIE_RIGHT.w >= sizex)||(Ennemie.LAST_ENNEMIE_LEFT.x+Ennemie.LAST_ENNEMIE_LEFT.w <= Ennemie.LAST_ENNEMIE_LEFT.w))&&Ennemie.direction!=3){ //reach border
			Ennemie.lastDirection = Ennemie.direction; //stockage ancienne direction
			Ennemie.direction = 3;
		} else {
			if(Ennemie.lastDirection==2){ //fin descente; go right
				Ennemie.lastDirection = Ennemie.direction;
				Ennemie.direction = 1;
			}
			if(Ennemie.lastDirection==1){ //fin descente; go left
				Ennemie.lastDirection = Ennemie.direction;
				Ennemie.direction = 2;
			}
		}
	}
}

Ennemie.direction = 1;
Ennemie.lastDirection = 1;
Ennemie.SPEED = 1;
Ennemie.LAST_ENNEMIE_RIGHT = undefined;
Ennemie.LAST_ENNEMIE_LEFT = undefined;

class Missile extends GameObject {
	constructor(x, y, h, w){
		super(x, y, h, w);
	}

	updatePos(){
		this.y = this.y-5;
	}
}