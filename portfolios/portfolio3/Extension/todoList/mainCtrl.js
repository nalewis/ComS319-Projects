app.controller("mainCtrl", function ($scope, $location) {
	$scope.addFunc = function(){
		if($scope.task){
			//get dates
			var currentdate = new Date(); 
			var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
			
			if($scope.dueDate){
				var newTask = {"creationDate" : datetime, "task" : $scope.task, "dueDate" : $scope.dueDate};
				//clear date
				$scope.dueDate = "";
			} else {
				var newTask = {"creationDate" : datetime, "task" : $scope.task, "dueDate" : "N/A"};
			}
			
			//add task to the array
			$scope.tasks.push(newTask);
			
			//clear task
			$scope.task = "";
			
			//Update the local storage
			updateStorage();
		}
	}
	
	//sets up the form to edit a task
	//TODO
	$scope.editTask = function(index){
		console.log(index);
	}
	
	$scope.deleteTask = function(index){
		//remove the index from the array
		$scope.tasks.splice(index, 1);
	}
	
	//function to initially set the tasks to the localstorage on page load
	var updateTasks = function(){
		if(localStorage.getItem("tasks") === null){
			localStorage.tasks = JSON.stringify($scope.tasks);
		} else {
			$scope.tasks = JSON.parse(localStorage.tasks);
		}
	}
	
	//sets the local tasks to localstorage
	var updateStorage = function(){
		localStorage.tasks = JSON.stringify($scope.tasks);
	}
	
	//clears all tasks
	$scope.clearTasks = function(){
		localStorage.removeItem("tasks");
		$scope.tasks = [];
	}
	
	$scope.tasks = [];
	updateTasks();
});