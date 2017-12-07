var started = false;
var sizex = 800;
var sizey = 600;
var bg_color = 255;

function setup() {
	createCanvas(800, 600);
    smooth();
	background(bg_color);
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
	return false;
}