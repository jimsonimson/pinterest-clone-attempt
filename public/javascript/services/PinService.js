"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var PinService = (function () {
            function PinService($resource) {
                this.$resource = $resource;
                this.pinResource = $resource('/api/pins/:id');
            }
            PinService.prototype.savePin = function (pin) {
                return this.pinResource.save(pin).$promise;
            };
            PinService.prototype.deletePin = function (pin) {
                return this.pinResource.delete({ id: pin._id }).$promise;
            };
            return PinService;
        }());
        Services.PinService = PinService;
        angular.module('app').service('PinService', PinService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
