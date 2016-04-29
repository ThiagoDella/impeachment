var app = angular.module('impeachment',['ui']);

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


	/*Filtros com operadores ternario no drop-down:
		Se TODOS, entao sem restricoes (true), se nao, é comparado UF/Partido do deputado com uf/partido selecionado
	*/
	$scope.filterEstado = (x)=> $scope.uf==="all" ? true:x.UF==$scope.uf;
	$scope.filterPartido = (x)=> $scope.partido==="all" ? true:x.Partido==$scope.partido;
	$scope.filterVoto = (x)=> $scope.voto==="all" ? true:x.Voto==$scope.voto;
	$scope.filterNome = (x)=> new RegExp($scope.nome, "ig").test(x.Nome);

	/*realiza os filtros*/
	$scope.search = (x) => $scope.filterEstado(x) && $scope.filterPartido(x) && $scope.filterVoto(x) && $scope.filterNome(x);

	$scope.getUnique = function(x)
	{
	 var u = {}, a = [];
	 for(var i = 0, l = x.length; i < l; ++i)
	 {
	  if(u.hasOwnProperty(x[i])) {continue;}
	  a.push(x[i]);
	  u[x[i]] = 1;
	 }
	 return a;
	}


/*	$scope.searchValue = function (item){
		if($scope.search === undefined){
			return true
		}else if($scope.search.VotoContra === true){
			
			return console.log($scope.deputados.indexOf($scope.deputados.Voto == "A favor")==0);	
			
			
		}
	}*/
});
