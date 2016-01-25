'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(HomeService) {
                this.HomeService = HomeService;
                this.pinboards = HomeService.getAll();
            }
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('app').controller('HomeController', HomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
