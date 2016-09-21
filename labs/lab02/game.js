var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");
var leftBtn = document.getElementById("left");
var rightBtn = document.getElementById("right");
var direction = 0; //0 = right, 1 = down, 2 = left, 3 = up

startBtn.onclick = function () {
	// getContext() method returns an object that provides methods
	// and properties for drawing on the canvas
	var context = document.getElementById("canvasId").getContext("2d");
	context.beginPath();
	context.strokeStyle = '#ff0000';
	context.moveTo(0,300);
	var i = 0;
	var timer = setInterval(fucntion(){
		
	}, 1000);
	/*while(true){
		
		context.moveTo(0, i);
		context.lineTo(450, i);
		context.lineWidth = 5;

		context.stroke();
	}*/
	// set line color
	
}

stopBtn.onclick = clearInterval(timer);
//look at other canvas methods!