/**
* @Title: RouteProvider Definitions;
* @Description: Defines system routing conditions based on url parameters;
* @Author: Lucas Guszak;
* @Date: 07/06/2017;
*/
App.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('index', {
		url: '/index',
		templateUrl: 'public/components/dashboard/dashboard.html' + bustUrl,
		controller: 'dashboardCtrl',
		cache: false
	})

	$urlRouterProvider.otherwise('/index')
})