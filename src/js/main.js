var started = false;
var sizex = 800;
var sizey = 600;
var bg_color = 255;

var ennemies = [];
var player = undefined;

function setup() {
	createCanvas(sizex, sizey);
    smooth();
	background(bg_color);

	for (var i = 0; i < 20; i++) {
		ennemies.push(new Ennemie(i*20+0,0,10,10));		
	}
	player = new Vaisseau(0.5*sizex, 0.95*sizey, 5, 5);
}

function keyPressed() {

	if(keyCode == 32) {
  		background(25);
	}

	return false;
}

function draw() {
  	// put drawing code here
	if(keyCode==32&&!started) {
		bg_color = 255-frameCount%255;
		background(bg_color);
	}
	if(bg_color<=25) {
		started = true;
	}

	if(started) {
		background(25);
		for (var i = 0; i < ennemies.length; i++) {
			ennemies[i].updatePos();
			ennemies[i].draw();
		}
		player.draw();
	}

	keyPressed();
	if(keyIsDown(LEFT_ARROW) && player.x > 0){
		player.left();
	}
	if(keyIsDown(RIGHT_ARROW) && player.x < 800){
		player.right();
	}
	player.draw();
}