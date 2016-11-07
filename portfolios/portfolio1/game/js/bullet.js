/**
 * Created by wdnick on 5/19/2015.
 */
var Bullet = function (x, y, xSpeed, ySpeed, deg)
{
	Thing.call(this, document.getElementById("bullet"), x, y, deg);
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


	this.draw = function ()
	{
		this.drawImageRot(this.pic, this.x, this.y, this.width, this.height, rad);
		//ctx.drawImage(this.pic, this.x, this.y);
	};

	this.update = function ()
	{

		//console.log(deg);
		this.x += bXVel;
		time++;
		var dt = time - oldTime;
		oldBYVel = bYVel;
		bYVel += gravity * dt;
		this.y += (oldBYVel + bYVel) * 0.5 * dt;
		rad = Math.atan(bYVel/bXVel);//IM A GENIUS

		oldTime = time;

		if (this.violatesSides(this.x, this.y, this.width, this.height))
		{
			this.die();
		}

		for(var i = 0; i < world.things.length; i++)
		{
			if(world.get(i) != this)
			{
				//if (this.hit(world.get(i))){
				//	console.log("poop");
				//}

				if (this.hit(world.get(i)) && world.get(i).type == this.type)
				{
					this.die();
				}
			}
		}
	};

	this.die = function(){
		world.remove(this);
	};

	this.violatesSides = function (posx, posy, width, height)
	{
		return ((posx + width) >= WIDTH || posx <= 0 || (posy + height) >= HEIGHT);
	};

	this.drawImageRot = function (img, x, y, width, height, rad)
	{
		//Convert degrees to radian
		//var rad = deg * Math.PI / 180;

		ctx.save();
		//ctx.fillStyle = "green";

		//Set the origin to the center of the image
		ctx.translate(x + width / 2, y + height / 2);

		//Rotate the canvas around the origin
		ctx.rotate(rad);

		//draw the image
		ctx.drawImage(img,0,-2,width,height);
		//this.rect(0, 0, this.width, 10);

		//reset the canvas
		ctx.rotate(rad * ( -1 ));
		ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));

		ctx.fill();
		ctx.restore();
	};

};