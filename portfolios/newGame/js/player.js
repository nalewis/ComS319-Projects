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

	this.tick = function (can)
	{
		this.tickCycle++;
		
		//Every 60th tick, update the tank's positon.
		//If this happened every tick, movement would be extremely fast
		if ((this.tickCycle % 60) == 0)
		{
			checkForInput();
			this.tickCycle = 0;
		}
		can.drawImage(this.pic, x, y);
	}


	
	function checkForInput()
	{
		$(document).keydown(function (event) {
			switch(event.key)
			{
				case "ArrowUp":
					//Move turret counter clockwise			
					break;
				case "ArrowDown":
					//Move turret clockwise
					break;
				case "ArrowLeft":
					
//					console.log(x);
					if (checkBorders("left"))
					{
						x--;	
					}
					break;
				case "ArrowRight":
					
//					console.log(x);
					if (checkBorders("right"))
					{
						x++;
					}
					break;
				}
/*			if (event.key == "ArrowUp")
			{
				console.log("up pressed");
			}
			else if (event.key == */
		});

	}

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
			//Check if the turret can be rotated counter clockwise
		}
		else if (movement == "down")
		{
			//Check if the turret can be rotated clockwise
		}
		else
			return false;
	}
}
