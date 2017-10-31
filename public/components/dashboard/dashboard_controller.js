App.controller('dashboardCtrl', function ($scope, $state, $mdDialog, $http,API_URL,Notification, Orcamento, Produto) {
	
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

		$scope.solicitacao.orcamento.produtos.push(novoProduto);
		
		$scope.novo = {
			produto: undefined,
			quantidade: 0
		}
		$scope.solicitarOrcamento();
	};

	/**
     * Remove produto do orçamento
     */
	$scope.removerProduto = function(produto) {
		$scope.solicitacao.orcamento.produto.indexOf(produto);
		$scope.solicitarOrcamento();
	};

	/**
     * Solicita orçamento
     */
	$scope.solicitarOrcamento = function() {
		
		$scope.loading = true;
		if( $scope.solicitacao.orcamento.produtos.length > 0){
		$http.post(API_URL + '/orcamento', $scope.solicitacao)
		.then(success,error);
		}
		//$scope.solicitacao.$save(success,error);
	};

	/**
     * Solicita orçamento
     */
	function success(response) {
		$scope.loading = false;
		$scope.labels = response.data.labels
		$scope.data = [response.data.scores]
	};

	/**
     * Solicita orçamento
     */
	function error(response) {
		$scope.loading = false;
		$scope.error = response.data.error;
		Notification.error({title: 'Erro', message: 'Ocorreu um erro, tente novamente mais tarde!'
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
		$scope.solicitacao = new Orcamento();
		$scope.getProdutos();
		$scope.colors = ['#1565c0'];
		$scope.solicitacao.preco = 10
		$scope.solicitacao.prazo = 5
		$scope.solicitacao.negociacoes = 3
		$scope.solicitacao.atrasadas = 4
		$scope.solicitacao.tempo = 6
		$scope.solicitacao.individuos = 20
		$scope.solicitacao.geracoes = 100
		$scope.solicitacao.cruzamento = 0.7
		$scope.solicitacao.mutacao = 1
		$scope.solicitacao.orcamento = {
				produtos: []
		}

		$scope.labels = [0];
		$scope.series = ['Score'];
		$scope.data = [
			[0]
		];
		
	}

	main();

	
})

