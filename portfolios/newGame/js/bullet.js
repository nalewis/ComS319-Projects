var Bullet = function (x, y, xSpeed, ySpeed, deg)
{
	this.width = $("#bullet").width();
	this.height = $("#bullet").height();
	this.pic = document.getElementById("bullet");
	this.deg = deg;
	this.x = x;
	this.y = y;
	var rad = deg * Math.PI / 180;
	var bYVel = ySpeed;
	var oldBYVel = bYVel;
	var bXVel = xSpeed;
	var time = 0;
	var oldTime = 0;
	this.type = "bullet";
	const gravity = 1;


	this.draw = function (can)
	{
		this.drawImageRot(can, this.pic, this.x, this.y, this.width, this.height, rad);
	};

	this.update = function ()
	{
		this.x += bXVel;
		time++;
		var dt = time - oldTime;
		oldBYVel = bYVel;
		bYVel += gravity * dt;
		this.y += (oldBYVel + bYVel) * 0.5 * dt;
		rad = Math.atan(bYVel/bXVel);

		oldTime = time;

		if (this.checkBorders(this.x, this.y, this.width, this.height))
		{
			this.die();
		}

		/*for(var i = 0; i < world.things.length; i++)
		{
			if(world.get(i) != this)
			{


				if (this.hit(world.get(i)) && world.get(i).type == this.type)
				{
					this.die();
				}
			}
		}*/
	};

	this.die = function(){
		game.remove(this);
	};

	this.checkBorders = function (posx, posy, width, height)
	{
		return ((posx + width) >= WIDTH || posx <= 0 || (posy + height) >= HEIGHT);
	};

	this.drawImageRot = function (can, img, x, y, width, height, rad)
	{
		can.save();
		//can.fillStyle = "green";

		//Set the origin to the center of the image
		can.translate(x + width / 2, y + height / 2);

		//Rotate the canvas around the origin
		can.rotate(rad);

		//draw the image
		can.drawImage(img,0,-2,width,height);
		//this.rect(0, 0, this.width, 10);

		//reset the canvas
		can.rotate(rad * ( -1 ));
		can.translate((x + width / 2) * (-1), (y + height / 2) * (-1));

		can.fill();
		can.restore();
	};

};