function verifyInput() 
{
	if(($("#username").val() == 'admin') && ($("#password").val() == 'admin'))
	{
		document.cookie = ("role=admin");
		
		$("#failure").hide(500);
		var user = new User($("#username").val(), getCookie("role"));
		window.location = "./index.html?User="+user;
	}
	else if (($("#username").val().substring(0,1).toLowerCase()) == "u")
	{
		document.cookie = ("role=undergraduate");
		$("#failure").hide(500);

		var user = new User($("#username").val(), getCookie("role"));
		window.location = "./index.html?User="+user;
	}
	else
	{
		document.cookie = ("role=; expires=Thu, 01 Jan 2015 00:00:00 UTC");
		$("#failure").show(500);
	} 

}

//taken from stack overflow http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
