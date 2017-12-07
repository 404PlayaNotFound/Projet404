var started = false;
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
		ennemies.push(new Ennemie(i*20+0,0,10,10));		
	}
	player = new Vaisseau(0.5*sizex, 0.95*sizey, 5, 5);
}

function draw() {
  	// put drawing code here
	if(keyCode==32&&!started) {
		bg_color = 255-frameCount%255;
		background(bg_color);
		if(bg_color<=25) {
			started = true;
		}
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
		if(timerMissiles < 35) {
			timerMissiles++;
		}
		else{
			timerMissiles = 0;
			missiles.push(player.shoot());
		}

		for (var i = 0; i < missiles.length; i++) {
			missiles[i].updatePos();
			missiles[i].draw();
		}

		for (var i = 0; i < ennemies.length; i++) {
			for (var k = 0; k < missiles.length; k++) {
				if(ennemies[i].colideWith(missiles[k])){
					ennemies[i].die();
				}
			}

		}
	}
}