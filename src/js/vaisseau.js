
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
		if(this.x >= other.x && this.x<=(other.x+other.w)
			&& this.y >= other.y && this.y<=(other.y+other.h)) {
			return true;
		}

		return false;
	}

	updatePos() {
		// nothing to do here
		// override this to make the magic append
	}
}


class Vaisseau extends GameObject {
	constructor(x, y, h, w){
		super(x, y, h, w);
	}
} 

class Ennemie extends GameObject {

	constructor(x, y, h, w){
		super(x, y, h, w);


		// update the last enemies on the right and on the left
		if(Ennemie.LAST_ENNEMIE_RIGHT == undefined || this.x > Ennemie.LAST_ENNEMIE_RIGHT.x) {
			Ennemie.LAST_ENNEMIE_RIGHT = this;
		}

		if(Ennemie.LAST_ENNEMIE_LEFT == undefined || this.x < Ennemie.LAST_ENNEMIE_LEFT.x) {
			Ennemie.LAST_ENNEMIE_LEFT = this;
		}
	}

	updatePos(){
		switch(Ennemie.direction){
			case 1: // droite
				this.x += Ennemie.SPEED;
				break;
			case 2: // gauche
				this.x -= Ennemie.SPEED;
				break;
			case 3: // bas
				this.y += Ennemie.SPEED;
				break;
		}
	}
}

Ennemie.direction = 1;
Ennemie.SPEED = 1;
Ennemie.LAST_ENNEMIE_RIGHT = undefined;
Ennemie.LAST_ENNEMIE_LEFT = undefined;

class Missile extends GameObject {
	constructor(x, y, h, w){
		super(x, y, h, w);
	}

	updatePos(){
		this.y = this.y+2;
	}
}