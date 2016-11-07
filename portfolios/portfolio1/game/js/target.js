/**
 * Created by wdnick on 5/21/2015.
 */
var Target = function(pic,x,y,width,height, speed, direction){
	Thing.call(this,pic, x,y,width,height, speed, direction);

	var WIDTH = $("#canvas").width();
	var HEIGHT = $("#canvas").height();
	this.pic = pic;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.speed = speed;
	this.direction = direction;
	this.type = "target";

	this.update = function(){

		if(this.direction)
		{

			if (this.x < WIDTH)
			{
				this.x += this.speed;
			}
			else
			{
				world.remove(this);
			}
		}
		else
		{
			if (this.x > -50)
			{
				this.x -= this.speed;
			}
			else
			{
				world.remove(this);
			}
		}

		for(var i = 0; i< world.things.length; i++){
			if(world.get(i) != this){
				if(this.hit(world.get(i))){
					if(world.get(i).type == "bullet"){
						this.die();
					}
				}
			}
		}
	};

	this.draw = function (ctx)
	{
		ctx.drawImage(this.pic, this.x, this.y);
	};

	this.die = function()
	{
		if(this.speed == 10){
			score += 5;
		}
		else
		{
			score++;
		}
		world.remove(this);
	};

};