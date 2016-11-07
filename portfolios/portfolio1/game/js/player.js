/**
 * Created by wdnick on 5/19/2015.
 */
var Player = function (x, y)
{
	Thing.call(this, document.getElementById("player"), x, y, $("#player").width(), $("#player").height());
	this.pic = document.getElementById("player");
	this.width = $("#player").width();
	this.height = $("#player").height();
	this.deg = -90;
	this.turnSpeed = 4;
	this.bulletSpeed = 10;
	var lastCheck = false;
	var maxSpeed = 50;
	this.playerSpeed = 15;
	this.lastSpeed = 10;


	this.draw = function (ctx)
	{

		this.drawImageRot(this.pic, this.x, this.y, this.width, this.height, this.deg);
		ctx.drawImage(this.pic, this.x, this.y);
	};

	this.update = function ()
	{
		if (key[KeyEvent.DOM_VK_RIGHT] && !violatesBorders(this.x, this.y, this.width, this.height) && !key[KeyEvent.DOM_VK_LEFT])
		{
			this.x += this.playerSpeed;
		}
		if (key[KeyEvent.DOM_VK_LEFT] && !violatesBorders(this.x, this.y, this.width, this.height) && !key[KeyEvent.DOM_VK_RIGHT])
		{
			this.x -= this.playerSpeed;
		}
		if (key[KeyEvent.DOM_VK_UP] && !violatesBorders(this.x, this.y, this.width, this.height) && !key[KeyEvent.DOM_VK_DOWN] && this.deg * (Math.PI / 180) > -Math.PI)
		{
			this.deg -= this.turnSpeed;
		}
		if (key[KeyEvent.DOM_VK_DOWN] && !violatesBorders(this.x, this.y, this.width, this.height) && !key[KeyEvent.DOM_VK_UP] && this.deg * (Math.PI / 180) < 0)
		{
			this.deg += this.turnSpeed;
		}
		if(key[KeyEvent.DOM_VK_SPACE]){
			if(maxSpeed > this.bulletSpeed)
			{
				this.bulletSpeed += 1;
			}
			//this.fire()
		}
		if(lastCheck == true && lastCheck != key[KeyEvent.DOM_VK_SPACE]){
			this.fire();
			this.lastSpeed = this.bulletSpeed;
			this.bulletSpeed = 10;
		}
		this.resetPlayer();
		lastCheck = key[KeyEvent.DOM_VK_SPACE];
	};

	function violatesBorders(posx, posy, width, height)
	{
		return ((posx + width) >= WIDTH || posx <= 0 || posy <= 0 || (posy + height) >= HEIGHT);
	}

	this.resetPlayer = function ()
	{
		if (this.x + this.width >= WIDTH)
		{
			this.x = WIDTH - this.width - 1;
		}
		if (this.y + this.height >= HEIGHT)
		{
			this.y = HEIGHT - this.height - 1;
		}
		if (this.x <= 0)
		{
			this.x = 1;
		}
		if (this.y <= 0)
		{
			this.y = 1;
		}
	};

	this.rect = function (x, y, w, h)
	{
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		ctx.closePath();
		ctx.fill();
	};

	this.drawImageRot = function (img, x, y, width, height, deg)
	{
		//Convert degrees to radian
		var rad = deg * Math.PI / 180;
		var gunHeight = 15;
		ctx.save();
		ctx.fillStyle = "green";

		//Set the origin to the center of the image
		ctx.translate(x + (width / 2) , y + (height / 3) + gunHeight/2) ;

		//Rotate the canvas around the origin
		ctx.rotate(rad);

		//draw the image
		//ctx.drawImage(img,x,y,width,height);
		this.rect(0, -3, this.width + 25, gunHeight);

		//reset the canvas
		ctx.rotate(rad * ( -1 ));
		ctx.translate((x + (width / 2)) * (-1), (y + (height / 3) + gunHeight/2) * (-1));

		ctx.fill();
		ctx.restore();
	};

	this.fire = function(){
		var rad = this.deg * Math.PI / 180;
		var xSpeed = this.bulletSpeed*Math.cos(rad);
		var ySpeed = this.bulletSpeed*Math.sin(rad);
		if(key[KeyEvent.DOM_VK_RIGHT] && this.deg >= -90){
			xSpeed = (this.bulletSpeed + this.playerSpeed)*Math.cos(rad);
		}
		else if(key[KeyEvent.DOM_VK_RIGHT] && this.deg < -90){
			xSpeed = (this.bulletSpeed - this.playerSpeed)*Math.cos(rad);
		}
		else if(key[KeyEvent.DOM_VK_LEFT] && this.deg >= -90){
			xSpeed = (this.bulletSpeed - this.playerSpeed)*Math.cos(rad);
		}
		else if(key[KeyEvent.DOM_VK_LEFT] && this.deg < -90){
			xSpeed = (this.bulletSpeed + this.playerSpeed)*Math.cos(rad);
		}

		var bulletx = 50* Math.cos(rad);
		var	bullety = 50* Math.sin(rad);
		var bullet = new Bullet(this.x + (this.width/2) + bulletx, this.y + (this.height/2) + bullety, xSpeed, ySpeed, this.deg);
		world.add(bullet);
	}

};