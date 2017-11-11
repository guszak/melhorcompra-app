
/**
* @File: app.js;
* @Description: App Modules, configs and definitions;
* @Author: Lucas Guszak;
* @Date: 06/06/2017;
*/
var App = angular.module('app', ['ngMaterial', 'ui-notification',
  'ui.utils.masks', 'md.data.table', 'ngResource', 'ui.router', 
  'chart.js','app.config'])

var bustUrl = '?bust=' + Math.random().toString(36).slice(2)

/**
* @name: config;
* @description: Define primary color theme;
* @author: Lucas Guszak;
* @date: 08/06/2017;
*/
App.config(function ($mdThemingProvider) {
	$mdThemingProvider.theme('default')
	.primaryPalette('blue', {
      'default': '800'
  })
	.accentPalette('green', {
      'default': '500'
  })
})
