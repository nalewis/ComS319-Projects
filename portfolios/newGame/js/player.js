var Player = function (pic, x, y, width, height)
{
	//Thing.call(this, document.getElementById("player"), x, y, $("#player").width(), $("#player").height());
	this.pic = pic;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.deg = -90;
	this.turnSpeed = 4;
	this.bulletSpeed = 10;
	var lastCheck = false;
	var maxSpeed = 50;
	this.playerSpeed = 15;
	this.lastSpeed = 10;
	console.log("player created with x " + x + " and y " + y);
	this.tickCycle = 0;
	var TANKWIDTH = 150;

	this.draw = function (can)
	{
		//this.drawImageRot(this.pic, this.x, this.y, this.width, this.height, this.deg);
		can.drawImage(this.pic, this.x, this.y);
	};

	//The function that is called by the main loop function in the index page.
	this.tick = function (can)
	{
		this.tickCycle++;
		
		//Every 60th tick, check to see if the user is pressing a movement key, and move the tank if so.
		//If this happened every tick, movement would be extremely fast and hard to control.
		if ((this.tickCycle % 60) == 0)
		{
			checkForInput();
			this.tickCycle = 0;
		}
		can.drawImage(this.pic, x, y);
	}


	//Checks to see if the user is currently pressing one of the arrow keys or the space bar and takes action if so.	
	function checkForInput()
	{
		$(document).keydown(function (event) {
			switch(event.key)
			{
				case "ArrowUp":
					//TODO: Move turret counter clockwise			
					break;

				case "ArrowDown":
					//TODO: Move turret clockwise
					break;

				case "ArrowLeft":
					
					if (checkBorders("left"))
					{
						x--;	
					}
					break;

				case "ArrowRight":
					
					if (checkBorders("right"))
					{
						x++;
					}
					break;

				case " ":
					//TODO: implement firing actions
					break;
				}
		});

	}

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
			width = ($("#canvas").width() - TANKWIDTH);
			return (x < width);
		}
		else if (movement == "up")
		{
			//TODO: Check if the turret can be rotated counter clockwise
		}
		else if (movement == "down")
		{
			//TODO: Check if the turret can be rotated clockwise
		}
		else
			return false;
	}
}
