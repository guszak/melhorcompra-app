App.controller('dashboardCtrl', function ($scope, $state, $mdDialog, Notification, Orcamento, Produto) {
	
	/**
     * Retorna a lista de produtos
     */
	function getSuccess(data) {
		$scope.produtos = data;
	};

	/**
     * Apresenta erro, caso exista algum problema na listagem de produtos
     */
	function getError(response) {
		Notification.error({title: 'Erro', message: 'Ocorreu um erro, tente novamente mais tarde!'
			+' Se o problema persistir, entre em contato com o suporte técnico.'});
	};

	/**
     * Lista produtos disponiveis
     */
	$scope.getProdutos = function () {
		$scope.promise = Produto.query($scope.query,getSuccess,getError).$promise;
	};

	/**
     * Busca produtos 
     */
	$scope.querySearch = function(query) {
		var results = query ? $scope.produtos.filter( createFilterFor(query) ) : $scope.produtos, deferred;
		return results;
	 }

	 /**
     * Filtra os produtos conforme pesquisa
     */
    function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
  
		return function filterFn(produto) {
		  return produto.descricao.includes(query);
		};
	}

	/**
     * Adiciona produto no orcamento
     */
	$scope.adicionarProduto = function() {
		
		var novoProduto = {
			produto_id: $scope.novo.produto.id,
			quantidade: $scope.novo.quantidade,
			descricao: $scope.novo.produto.descricao,
			unidade: $scope.novo.produto.unidade
		}

		$scope.orcamento.produtos.push(novoProduto);
		
		$scope.novo = {
			produto: undefined,
			quantidade: 0
		}
	};

	/**
     * Remove produto do orçamento
     */
	$scope.removerProduto = function(produto) {
		$scope.orcamento.produto.indexOf(produto);
	};

	/**
     * Solicita orçamento
     */
	$scope.solicitarOrcamento = function() {
		
		$scope.loading = true;
		$scope.orcamento.$save(success,error);
	};

	/**
     * Solicita orçamento
     */
	function success(data) {
		$scope.loading = false;
		console.log(data);
	};

	/**
     * Solicita orçamento
     */
	function error(response) {
		$scope.loading = false;
		$scope.error = response.data.error;
		Notification.error({title: 'Cadastro de Formas de Pagamento', message: 'Ocorreu um erro, tente novamente mais tarde!'
			+' Se o problema persistir, entre em contato com o suporte técnico.'});
	};

	/**
     * Inicializa controlador
     */
	function main() {
		$scope.query = {
			//limit: 10,
			//page: 1
		};
		$scope.orcamento = new Orcamento();
		$scope.orcamento.produtos = [];
		$scope.getProdutos();
		//'#1565c0'
		// $scope.loading = true;
		$scope.colors = ['#1565c0'];
		// $scope.series = {}
		// $scope.series.OBRAS = ['Obras']
		// $scope.series.AVALIACAO = ['Avaliações']
		// $scope.series.PROFISSIONAIS = ['Profissionais']
		//$scope.getDashboard();
		$scope.parametros = {
			preco: 10,
			prazo: 5,
			negociacoes: 3,
			atrasadas: 4,
			tempo: 6,
			individuos: 20,
			geracoes: 100
		}
	}

	main();

	$scope.labels = ["Geração 1", "Geração 2", "Geração 3", "Geração 4", "Geração 5", "Geração 6", "Geração 7"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
	  [50, 60, 68, 76, 82, 88, 80],
	  [28, 48, 40, 19, 86, 27, 90]
	];
	$scope.onClick = function (points, evt) {
	  console.log(points, evt);
	};
	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
	$scope.options = {
	  scales: {
		yAxes: [
		  {
			id: 'y-axis-1',
			type: 'linear',
			display: true,
			position: 'left'
		  },
		  {
			id: 'y-axis-2',
			type: 'linear',
			display: true,
			position: 'right'
		  }
		]
	  }
	};
})

