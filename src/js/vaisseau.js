
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

	left(){
		this.x = this.x-3;
	}
	right(){
		this.x = this.x+3;
	}
	shoot(){
		return new Missile(this.x, this.y+2, 5, 5);
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
				this.x += 2*Ennemie.SPEED;
				break;
			case 2: // gauche
				this.x -= 2*Ennemie.SPEED;
				break;
			case 3: // bas
				this.y += 15*Ennemie.SPEED;
				break;
		}
	}

	static updateDirection() {
		if(((Ennemie.LAST_ENNEMIE_RIGHT.x+Ennemie.LAST_ENNEMIE_RIGHT.w >= sizex)||(Ennemie.LAST_ENNEMIE_LEFT.x+Ennemie.LAST_ENNEMIE_LEFT.w <= 0))&&Ennemie.direction!=3){ //reach border
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