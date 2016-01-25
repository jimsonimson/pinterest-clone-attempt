"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var PinboardUpdateController = (function () {
            function PinboardUpdateController(HomeService, $location, $routeparams) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.$routeparams = $routeparams;
                this.pinboard = HomeService.getPinboard($routeparams['id']);
            }
            PinboardUpdateController.prototype.update = function (id) {
                var _this = this;
                this.HomeService.updatePinboard(this.pinboard).then(function (res) {
                    _this.$location.path('/');
                });
            };
            ;
            return PinboardUpdateController;
        }());
        Controllers.PinboardUpdateController = PinboardUpdateController;
        angular.module('app').controller('PinboardUpdateController', PinboardUpdateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
