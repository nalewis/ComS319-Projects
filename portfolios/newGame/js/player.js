var Player = function (pic, x, y, width, height)
{
	//Thing.call(this, document.getElementById("player"), x, y, $("#player").width(), $("#player").height());
	this.pic = pic;
	var width = width;
	var height = height;
	var x = x;
	var y = y;
	var deg = -90;
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
		
		this.drawImageRot(can, deg);
		can.drawImage(this.pic, x, y);
		
	}
	
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
		this.rect(can, 0, -3, width * .75, gunHeight);

		//reset the canvas
		can.rotate(rad * ( -1 ));
		can.translate((x + (width / 2)) * (-1), (y + (height / 3) + gunHeight/2) * (-1));

		can.fill();
		can.restore();
	};


	//Checks to see if the user is currently pressing one of the arrow keys or the space bar and takes action if so.	
	function checkForInput()
	{
		$(document).keydown(function (event) {
			switch(event.key)
			{
				case "ArrowUp":
					if (checkBorders("up"))
					{
						deg = deg - 0.5;			
					}
					break;
					
				case "ArrowDown":
					if (checkBorders("down"))
					{
						deg = deg + 0.5;			
					}
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
			var width = ($("#canvas").width() - TANKWIDTH);
			return (x < width);
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
