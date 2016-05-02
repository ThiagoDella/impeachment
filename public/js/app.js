var app = angular.module('impeachment',['ui']);

app.constant('_',window._);
app.constant('chart',window.Chart);


app.controller('mainController',function($scope,$http,_,chart){
	var data = $http({
		method: 'GET',
		url: '/data'
	}).then(function (res){
		$scope.deputados = res.data;
		
		$scope.numSim = getData.depSim($scope.deputados);
		$scope.numNao = getData.depNao($scope.deputados);
		getData.estados($scope.deputados);
		
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

	







	var getData = {
		
		depSim: function(deputados){
			var count = 0;
			angular.forEach(deputados,function (value,key){
				if(deputados[key].Voto === "A favor"){
					count ++;
				}
			});
			return count
		},

		depNao: function(deputados){
			var count = 0;
			angular.forEach(deputados,function (value,key){
				if(deputados[key].Voto === "Contra" || deputados[key].Voto === "Abstenção" || deputados[key].Voto === "Ausente"){
					count ++;
				}
			});
			return count
		},

		estados: function(deputados){
			//counting states
			var estados = (_.countBy(deputados,"UF"));
			console.log(estados);
			estados = _.sortBy(estados);
			
			//ploting chart
			var ctx = document.getElementById("myChart");
			statesChart = new chart (ctx,{
				type:'bar',
				data:{
					labels:["Acre","Amazonas","Amapá","Distrito Federal","Mato Grosso do Sul","Mato Grosso","Rondônia","Roraima","Sergipe","Tocantins","Alagoas","Espírito Santo",
					"Piauí","Paraíba","Santa Catarina","Santa Catarina","Goiás","Pará","Maranhão","Ceará","Pernambuco","Paraná","Rio Grande do Sul","Bahia","Rio de Janeiro","Minas Gerais","São Paulo",],
					datasets:[{
						label : "Número de Votantes por Unidade Federativa",
						data: estados
					}]
				},
				options: {
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero:true
							}
						}]
					}
				}
			});
		}
		
	};

});

