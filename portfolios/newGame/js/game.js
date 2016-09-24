var Game = function () {
	this.objects = [];

	this.add = function(object) {
		this.objects.push(object);
	};

	this.get = function(index) {
		return this.objects[index];
	};

	this.remove = function(object) {
		for ( var i = 0; i < this.objects.length; i++ ) {
			if ( this.objects[i] === object ) {
				this.objects.splice(i, 1);
			}
		}
	};
}