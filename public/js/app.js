var app = angular.module('impeachment',[]);

app.controller('mainController',function($scope,$http){
	var data = $http({
		method: 'GET',
		url: '/data'
	}).then(function (res){
		$scope.deputados = res.data;
		//console.log($scope.deputados);
	},function (err){
		console.log(err);
	});



/*	$scope.searchValue = function (item){
		if($scope.search === undefined){
			return true
		}else if($scope.search.VotoContra === true){
			
			return console.log($scope.deputados.indexOf($scope.deputados.Voto == "A favor")==0);	
			
			
		}
	}*/
});