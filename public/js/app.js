var app = angular.module('impeachment',['ui']);

app.controller('mainController',function($scope,$http){
	var data = $http({
		method: 'GET',
		url: '/data'
	}).then(function (res){
		$scope.deputados = res.data;
	},function (err){
		console.log(err);
	});


	/*Filtros com operadores ternario no drop-down:
		Se TODOS, entao sem restricoes (true), se nao, é comparado UF/Partido do deputado com uf/partido selecionado
	*/
	$scope.filterUF = (x)=> new RegExp($scope.uf).test(x.UF);
	$scope.filterPartido = (x)=> new RegExp($scope.partido).test(x.Partido);
	$scope.filterVoto = (x)=> new RegExp($scope.voto).test(x.Voto);
	$scope.filterNome = (x)=> new RegExp($scope.nome, "ig").test(x.Nome);

	/*realiza os filtros*/
	$scope.search = (x) => $scope.filterNome(x) && $scope.filterPartido(x) && $scope.filterUF(x) && $scope.filterVoto(x);

});
