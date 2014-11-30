'use strict'

angular.module 'gomokuDavidApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
]
.config ($stateProvider, $urlRouterProvider, $locationProvider) ->
  $urlRouterProvider
  .otherwise '/'

  $locationProvider.html5Mode true
