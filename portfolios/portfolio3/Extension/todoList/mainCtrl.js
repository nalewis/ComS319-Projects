app.controller("mainCtrl", function ($scope, $location) {
	$scope.addFunc = function(){
		if($scope.task){
			//get dates
			var currentdate = new Date(); 
			var datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate() + "/" 
                + currentdate.getFullYear() + ", "  
                + currentdate.getHours() + ":";
				
			if(currentdate.getMinutes().length == 1){
				datetime += "0" + currentdate.getMinutes();
			} else {
				datetime += currentdate.getMinutes();
			}
			
			if($scope.dueDate){
				var newTask = {"creationDate" : datetime, "task" : $scope.task, "dueDate" : $scope.dueDate, "color" : "white"};
				//clear date
				$scope.dueDate = "";
			} else {
				var newTask = {"creationDate" : datetime, "task" : $scope.task, "dueDate" : "N/A", "color" : "white"};
			}
			
			//add task to the array
			$scope.tasks.push(newTask);
			
			//clear task
			$scope.task = "";
			
			//Update the local storage
			updateStorage();
			checkExpired();
		}
	}
	
	$scope.deleteTask = function(index){
		//remove the index from the array
		$scope.tasks.splice(index, 1);
		updateStorage();
		checkExpired();
	}
	
	//function to initially set the tasks to the localstorage on page load
	var updateTasks = function(){
		if(localStorage.getItem("tasks") === null){
			checkExpired();
			localStorage.tasks = JSON.stringify($scope.tasks);
		} else {
			$scope.tasks = JSON.parse(localStorage.tasks);
		}
	}
	
	//sets the local tasks to localstorage
	var updateStorage = function(){
		checkExpired();
		localStorage.tasks = JSON.stringify($scope.tasks);
	}
	
	//clears all tasks
	$scope.clearTasks = function(){
		localStorage.removeItem("tasks");
		$scope.tasks = [];
	}
	
	var checkExpired = function(){
		angular.forEach($scope.tasks, function(value, key){
			if($scope.tasks[key].dueDate < new Date() && $scope.tasks[key].dueDate != "N/A"){
				$scope.tasks[key].color = "IndianRed";
			}
		});
	}
	
	$scope.tasks = [];
	updateTasks();
	checkExpired();
});