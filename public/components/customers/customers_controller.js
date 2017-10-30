App.controller('customersCtrl', function ($scope, $state, $mdDialog, Notification, Customer, API_URL) {
	
	$scope.API_URL = API_URL;

	/**
	*	@name: getSuccess;
	*	@description: Rest Success Response Query customers;
	*	@author: Lucas Guszak;
	*	@date: 23/06/2017;
	*	@lastUpdate: {};
	*
	*	@param {Object} ;
	*	@return null;
	*/
	function getSuccess(data) {
		$scope.customers = data;
	};

	/**
	*	@name: getError;
	*	@description: Rest Error Response Query customers;
	*	@author: Lucas Guszak;
	*	@date: 23/06/2017;
	*	@lastUpdate: {};
	*
	*	@param {Object} ;
	*	@return null;
	*/
	function getError(response) {
		Notification.error({title: 'Erro', message: 'Ocorreu um erro, tente novamente mais tarde!'
			+' Se o problema persistir, entre em contato com o suporte técnico.'});
	};

	/**
	*	@name: getCustomers;
	*	@description: Query customers;
	*	@author: Lucas Guszak;
	*	@date: 23/06/2017;
	*	@lastUpdate: {};
	*
	*	@param {Object} ;
	*	@return null;
	*/
	$scope.getCustomers = function () {
		$scope.promise = Customer.get($scope.query,getSuccess,getError).$promise;
	};

	/**
	*	@name: main;
	*	@description: Init controller;
	*	@author: Lucas Guszak;
	*	@date: 23/06/2017;
	*	@lastUpdate: {};
	*
	*	@param {Object} ;
	*	@return null;
	*/
	function main() {
		$scope.query = {
			limit: 10,
			page: 1
		};

		$scope.getCustomers();
	}

	main();
})

