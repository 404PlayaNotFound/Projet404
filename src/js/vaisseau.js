
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
	}
}


class Missile extends GameObject {
	constructor(x, y, h, w){
		super(x, y, h, w);
	}
}