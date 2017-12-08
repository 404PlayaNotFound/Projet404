var started = false;
var victory = false;
var defeat = false;
var allDead;

var sizex = 800;
var sizey = 600;
var bg_color = 255;
var missiles = [];
var ennemies = [];
var player = undefined;
var timerMissiles = 0;

function setup() {
	createCanvas(sizex, sizey);
    smooth();
	background(bg_color);

	for (var i = 0; i < 20; i++) {
		ennemies.push(new Ennemie(i*30,-40,20,20));		
	}
	for (var i = 0; i < 20; i++) {	
		ennemies.push(new Ennemie(i*30+10,-10,20,20));
	}

	player = new Vaisseau(0.5*sizex, 0.95*sizey, 5, 5);
}

function draw() {
  	// put drawing code here
	if(keyCode==32&&!started) {
		bg_color = 255-5*(frameCount%255);
		background(bg_color);
		started = true;
	}

	if(started) {
		background(25);
		player.draw();
		for (var i = 0; i < ennemies.length; i++) {
			ennemies[i].updatePos();
			ennemies[i].draw();
		}
		Ennemie.updateDirection();

		if(keyIsDown(LEFT_ARROW) && player.x > 3){
			player.left();
		}
		if(keyIsDown(RIGHT_ARROW) && player.x < sizex-7){
			player.right();
		}
		player.draw();
		if(keyIsDown(32)) {
			if(timerMissiles < 20) {
				timerMissiles++;
			}
			else{
				timerMissiles = 0
				missiles.push(player.shoot());
			}
		} else {
			timerMissiles++;
		}

		for (var i = 0; i < missiles.length; i++) {
			missiles[i].updatePos();
			missiles[i].draw();
		}

		for (var i = 0; i < ennemies.length; i++) {
			for (var k = 0; k < missiles.length; k++) {
				if(!ennemies[i].isDead() && ennemies[i].colideWith(missiles[k])){
					ennemies[i].die();
					missiles.splice(k, 1);
				}
			}
		}

		for (var k = 0; k < missiles.length; k++) {
			if(missiles[k].y<0) {
				missiles.splice(k, 1);
			}	
		}
		
		allDead = true;

		for (var i = 0; i < ennemies.length; i++) {
			if(!ennemies[i].isDead()) {
				allDead = false;
			}
			
			if(!ennemies[i].isDead() && ennemies[i].getYpos() > sizey) { //WIP la defaite marche pas encore
				started = false;
				defeat = true;
			}
		}

		if(allDead) {
			started = false;
			victory = true;
		}
	}


	if(victory) {
		background(0,0,0);
		textSize(32);
		fill(0, 102, 153);
		text("Victoire", 30, 30);
	}

	if(defeat) {
		background(0,0,0);
		textSize(32);
		fill(0, 102, 153);
		text("Defaite", 30, 30);
	}
}