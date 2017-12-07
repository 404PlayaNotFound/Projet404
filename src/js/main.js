function setup() {
	createCanvas(800, 600);
	background(256);
}

function keyPressed() {

	if(keyCode==32) {
  		background(25);
	}

	return false;
}

function draw() {
  	// put drawing code here
	keyPressed();
}