//Directions are mapped to degrees on the unit circle
//0 = right, 90 = up, 180 = left, 270 = down
var direction = 0;

var currentX = 0;
var currentY = 300;
var currentDirection = 0;

var canvasInitialized = false;
var isRunning = false;
var timer;

function toggle() {
	
	var toggleBtn = document.getElementById("toggle");
	if (!isRunning) {
		
		if (!canvasInitialized) {
		
			context = document.getElementById("canvasId").getContext("2d");
			context.moveTo(0,300);
			context.strokeStyle = '#ff0000';
			context.stroke();
	
			canvasInitialized = true;
		}

		if (!timer) {
			timer = setInterval(canvasTick, 75);
		}
		
		isRunning = true;
		toggleBtn.value = "Stop";
	} else {
		
		clearInterval(timer);
		timer = null;
		isRunning = false;
		toggleBtn.value = "Start";
	}
}

function stop() {
}

function canvasTick() {
	
	context.moveTo(currentX, currentY); 
	var moveSize = 1;

	if (currentDirection == 0) {
	
		currentX += moveSize;
	} else if (currentDirection == 90) {
		
		currentY -= moveSize;
	} else if (currentDirection == 180) {

		currentX -= moveSize;
	} else if (currentDirection == 270) {

		currentY += moveSize;
	}
	context.lineTo(currentX, currentY);
	context.stroke();
}

function leftTurn() {

	if (currentDirection >= 270) {
		currentDirection = 0;
	} else {
		currentDirection += 90;
	}
}

function rightTurn() {

	if (currentDirection <= 0) {
		currentDirection = 270;
	} else {
		currentDirection -= 90;
	}
}
