var Player = function (pic, x, y, width, height)
{
	this.pic = pic;
	var width = width;
	var height = height;
	var x = x;
	var y = y;
	var deg = -90;
	
	//player movement speed variables
	const playerSpeed = 15;
	const turnSpeed = 4;
	
	
	var bulletSpeed = 35;
	var lastCheck = false;
	var maxSpeed = 50;
	
	this.lastSpeed = 10;
	console.log("player created with x " + x + " and y " + y);
	this.tickCycle = 0;

	this.draw = function (can)
	{
		this.drawImageRot(can, deg);
		can.drawImage(this.pic, x, y);
	};
	
	//Checks to see if the user is currently pressing one of the arrow keys or the space bar and takes action if so.
	this.update = function ()
	{
		//console.log(key);
		if (key['ArrowRight'] && checkBorders('right'))
		{
			x += playerSpeed;
		}
		if (key['ArrowLeft'] && checkBorders('left')){
			x -= playerSpeed;
		}
		if (key['ArrowDown'] && checkBorders('down')){
			deg += turnSpeed;
		}
				else if (key['ArrowUp'] && checkBorders('up')){
			deg -= turnSpeed;
		}
		if (key[' ']){//fire
			this.fire();
		}
	};
	
	this.fire = function(){
		var rad = deg * Math.PI / 180;
		var xSpeed = bulletSpeed*Math.cos(rad);
		var ySpeed = bulletSpeed*Math.sin(rad);
		
		if(key['ArrowRight'] && deg >= -90){
			xSpeed = (this.bulletSpeed + this.playerSpeed)*Math.cos(rad);
		}
		else if(key['ArrowRight'] && deg < -90){
			xSpeed = (bulletSpeed - playerSpeed)*Math.cos(rad);
		}
		else if(key['ArrowLeft'] && deg >= -90){
			xSpeed = (bulletSpeed - playerSpeed)*Math.cos(rad);
		}
		else if(key['ArrowLeft'] && deg < -90){
			xSpeed = (bulletSpeed + playerSpeed)*Math.cos(rad);
		}

		var bulletx = 50* Math.cos(rad);
		var	bullety = 50* Math.sin(rad);
		var bullet = new Bullet(x + (width/2) + bulletx, y + (height/2) + bullety, xSpeed, ySpeed, deg);
		game.add(bullet);
	}

	//The function that is called by the main loop function in the index page.
	/*this.tick = function (can, key)
	{
		this.tickCycle++;
		//Every 60th tick, check to see if the user is pressing a movement key, and move the tank if so.
		//If this happened every tick, movement would be extremely fast and hard to control.
		if ((this.tickCycle % 60) == 0)
		{
			checkForInput();
			this.tickCycle = 0;
		}

		this.drawImageRot(can, deg);
		can.drawImage(this.pic, x, y);
		
	}*/
	
	this.rect = function (can, x, y, w, h)
	{
		can.beginPath();
		can.rect(x, y, w, h);
		can.closePath();
		can.fill();
	};
	
	this.drawImageRot = function (can, deg)
	{
		//Convert degrees to radian
		var rad = deg * Math.PI / 180;
		var gunHeight = 15;
		can.save();
		can.fillStyle = "green";
		//console.log(deg);
		//Set the origin to the center of the image
		can.translate(x + (width / 2) , y + (height / 3) + gunHeight/2) ;

		//Rotate the canvas around the origin
		can.rotate(rad);

		//draw the image
		this.rect(can, 0, -3, width/2, gunHeight);

		//reset the canvas
		can.rotate(rad * ( -1 ));
		can.translate((x + (width / 2)) * (-1), (y + (height / 3) + gunHeight/2) * (-1));

		can.fill();
		can.restore();
	};

	//Checks to see if the movement given can be performed given the tank's current condions
	//Returns true or false indicating if the movement is valid or not.
	function checkBorders(movement)
	{
		if(movement == "left")
		{
			return (x > 0)
		}
		else if (movement == "right")
		{
			var size = ($("#canvas").width() - width);
			return (x < size);
		}
		else if (movement == "up")
		{
			return (deg > -180);
		}
		else if (movement == "down")
		{
			return (deg < 0);
		}
		else
			return false;
	}
}
