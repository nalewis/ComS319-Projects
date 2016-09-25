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


	this.draw = function (can)
	{
		//this.drawImageRot(this.pic, this.x, this.y, this.width, this.height, this.deg);
		can.drawImage(this.pic, this.x, this.y);
	};
}