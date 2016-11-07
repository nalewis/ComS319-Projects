/**
 * Created by wdnick on 5/19/2015.
 */
var Enemy = function(pic,x,y,width,height){
	Thing.call(this,pic, x,y,width,height);
	var WIDTH = $("#canvas").width();
	var HEIGHT = $("#canvas").height();

	this.update = function(){
		//console.log(this.width);
		if(this.x + this.width < WIDTH)
		{
			this.x++;
		}
	}



};