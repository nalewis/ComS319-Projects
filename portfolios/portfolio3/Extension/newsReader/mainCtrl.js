var headlineSources = ["cnn", "bbc-news", "the-washington-post", "usa-today"];
var technologySources = ["ars-technica", "engadget", "polygon", "techcrunch", "techradar"];
var businessSources = ["business-insider", "fortune", "the-economist"];

var newsAPIKey = "e2b27f40609a49199733710f76ced68a";
var tableStyling = 1;
app.controller("mainCtrl", function ($scope, $location, $http) {
	
	//Makes a call to the NewsAPI service to load the top 10 news stories from that given news source
	$scope.loadSource = function(sourceName) {
		request = "https://newsapi.org/v1/articles?source=" + sourceName + "&apiKey=" + newsAPIKey;
		
		$http.get(request).then( function(response) { 
			
			if (response.data.status == "ok"){
				articles = response.data.articles;
				articles.forEach( function(article) {
	
					//Construct an HTML row to be displayed in the table of stores
					var articleRow = "";
					if (tableStyling > 0){
						articleRow = "<tr>";
					} else {
						articleRow = "<tr bgcolor=\"#cccccc\">";
					}
					tableStyling *= -1;

					if (article.urlToImage){

						articleRow += "<td> <img src=\"" + article.urlToImage + "\" style=\"width:300px\"> </td> <td> <h2> " + article.title + "</h2> <br>"
					} else {
						articleRow += "<td>No article image was provided</td> <td> <h2>" + article.title + "</h2><br>";
					}

					if (article.description){
						articleRow += " <h4> " + article.description + "</h4>";
					} else {
						articleRow += "<h4>No article description was provided</h4>";
					}		

					if (article.author){
						articleRow += " <h5>Article by: " + article.author + "</h5>";
					} else {
						articleRow += " <h5>No article author was provided</h5>";
					}

					articleRow += " </td> <td> <button type=\"button\"><a href=\"" + article.url + "\">View article</a></button></td>  </tr>";

					document.getElementById("body").innerHTML += articleRow;

				});
			}
		 });
	}

	//Handles loading a given category of stories. Modifies the view and loads new stories.
	$scope.switchTab = function($tabToLoad) {

		document.getElementById("body").innerHTML = "";
		switch ($tabToLoad) {
		
			case "headlines":
				document.getElementById("headlines").style.color = "#cccccc";	
				document.getElementById("technology").style.color = "#000000";	
				document.getElementById("business").style.color = "#000000";	
				
				headlineSources.forEach($scope.loadSource);	
				break;
			case "technology":
				document.getElementById("headlines").style.color = "#000000";	
				document.getElementById("technology").style.color = "#cccccc";	
				document.getElementById("business").style.color = "#000000";	
				
				technologySources.forEach($scope.loadSource);	
				break;

			case "business":
				document.getElementById("headlines").style.color = "#000000";	
				document.getElementById("technology").style.color = "#000000";	
				document.getElementById("business").style.color = "#cccccc";	
				
				businessSources.forEach($scope.loadSource);	
				break;
			
		}
	}
	document.onload = $scope.switchTab("headlines");
});
