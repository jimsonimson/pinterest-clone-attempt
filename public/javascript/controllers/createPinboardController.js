"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var CreatePinboardController = (function () {
            function CreatePinboardController(HomeService, $location) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.pinboard = {};
            }
            CreatePinboardController.prototype.createPinboard = function () {
                var _this = this;
                this.HomeService.savePinboard(this.pinboard).then(function (res) {
                    _this.$location.path('/boards/:id');
                });
            };
            return CreatePinboardController;
        }());
        Controllers.CreatePinboardController = CreatePinboardController;
        angular.module('app').controller('CreatePinboardController', CreatePinboardController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
