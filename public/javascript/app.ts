'use strict';
namespace App {
  angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap'])
  .config((
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider) => {
    $routeProvider.when('/', {
      templateUrl: '/templates/Home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: '/templates/register.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: '/templates/login.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    })
    .when('/welcome', {
      templateUrl: '/templates/welcome.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .when('/upload', {
      templateUrl: '/templates/pinboardCreate.html',
      controller: app.Controllers.CreatePinboardController,
      controllerAs: 'vm'
    })
    .when('/boards/:id', {
      templateUrl: '/templates/pinboardPage.html',
      controller: app.Controllers.PinboardPageController,
      controllerAs: 'vm'
    })
    .when('/addpin/:id', {
      templateUrl: '/templates/pinCreate.html',
      controller: app.Controllers.PinboardPageController,
      controllerAs: 'vm'
    })
    .when('/changePinboard/:id', {
      templateUrl: '/templates/pinboardUpdate.html',
      controller: app.Controllers.PinboardUpdateController,
      controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('HTTPFactory');
  });
}
