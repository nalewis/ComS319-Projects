function verifyInput() 
{
	if(($("#username").val() == 'admin') && ($("#password").val() == 'admin'))
	{
		document.cookie = ("role=admin");
		$("#failure").hide(500);

		window.location = "./index.html";
	}
	else if (($("#username").val().substring(0,1).toLowerCase()) == "u")
	{
		document.cookie = ("role=undergraduate");
		$("#failure").hide(500);

		window.location = "./index.html";
	}
	else
	{
		document.cookie = ("role=; expires=Thu, 01 Jan 2015 00:00:00 UTC");
		$("#failure").show(500);
	} 

}
