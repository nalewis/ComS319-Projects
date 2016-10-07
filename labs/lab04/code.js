$(document).ready(function(){
	$('p').click(function(){
		$('p').hide("slow");
	});
	$('#d1').hover(function(){
		$('#d1').css("color", "red");
	});
	$('#imp').keydown(function(){
		$('#imp').css("background-color", "green");
	});
	$('#imp').keyup(function(){
		$('#imp').css("background-color", "blue");
	});
	$('.school').hover(function(){
		$('.school').slideUp(200);
	});
	$('#d3').hover(function(){
		$('#d3').css({"color": "red",
					"background-color": "#98bf21",
					"font-family": "Arial",
					"font-size": "20px",
					"font-style": "italic"
					});
	});
	$('#butt').dblclick(function (){
		$('#toggler').toggle();
	});
	
	$('#d4').fadeIn(1000);
	$('#d5').fadeOut(2000);
});