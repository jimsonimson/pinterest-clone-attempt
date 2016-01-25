"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var PinboardPageController = (function () {
            function PinboardPageController(HomeService, PinService, $routeParams, UserService, $location) {
                this.HomeService = HomeService;
                this.PinService = PinService;
                this.$routeParams = $routeParams;
                this.UserService = UserService;
                this.$location = $location;
                this.pinboard = HomeService.getPinboard($routeParams['id']);
            }
            PinboardPageController.prototype.addPin = function () {
                var _this = this;
                var pin = {
                    pintitle: this.pin.title,
                    pinboard: this.pinboard._id,
                    imgurl: this.pin.imgurl
                };
                this.PinService.savePin(pin).then(function (res) {
                    _this.pinboard.pins.push(res);
                    _this.$location.path('/boards/:id');
                });
            };
            PinboardPageController.prototype.deletePin = function (pin) {
                var _this = this;
                this.PinService.deletePin(pin).then(function (res) {
                    _this.pinboard.pins.splice(_this.pinboard.pins.indexOf(pin), 1);
                });
            };
            ;
            return PinboardPageController;
        }());
        Controllers.PinboardPageController = PinboardPageController;
        angular.module('app').controller('PinboardPageController', PinboardPageController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
