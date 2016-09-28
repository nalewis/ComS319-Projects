var Target = function (image)
{


	this.image = image;

	//1= start on right, 0 = start on left
	this.startingSide = Math.floor( Math.random() * 2);
	this.speed = Math.floor(Math.random() * 5);
	this.y = Math.floor(Math.random() * 200);

	if (this.startingSide == 0)
	{
		this.x = -150;
	}
	else
	{
		this.x = (WIDTH + 150);
	}

	this.update = function()
	{
		if (this.startingSide)
		{
			if (this.x > -150)
			{
				this.x -= this.speed;
			}
			else
			{
				game.remove(this);
			}
		}
		else
		{
			if (this.x < (WIDTH + 150))
			{
				this.x += this.speed;
			}
			else
			{
				game.remove(this);
			}
		}
	};

	this.draw = function (can)
	{
		can.drawImage(this.image, this.x, this.y);
	};

}	
	
