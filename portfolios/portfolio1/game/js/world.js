/**
 * Created by wdnick on 5/19/2015.
 */
var World = function() {
	this.things = [];
	this.currentId = 0;

	this.add = function(thing) {
		this.things.push(thing);
	};

	this.get = function(index) {
		return this.things[index];
	};

	this.remove = function(thing) {
		for ( var i = 0; i < this.things.length; i++ ) {
			if ( this.things[i] === thing ) {
				this.things.splice(i, 1);
				//this.things[i] = null;
			}
		}
	};
};