var Thing = function(pic, x, y, width, height) {
	this.pic = pic;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.draw = function(c2d) {
		c2d.drawImage(this.pic, this.x, this.y);
	};

	this.update = function() {
	};

	this.hit = function(thing) {
		if (thing == null) {
			return false;
		}
		return (this.x < thing.x + thing.width &&
		this.x + this.width > thing.x &&
		this.y < thing.y + thing.height &&
		this.height + this.y > thing.y);
	};

	this.die = function () {
	}
};