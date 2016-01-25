"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.PinboardResource = $resource('/api/pinboards/:id', null, {
                    'update': { method: 'PUT' }
                });
            }
            HomeService.prototype.getAll = function () {
                return this.PinboardResource.query();
            };
            HomeService.prototype.getPinboard = function (pinboardId) {
                return this.PinboardResource.get({ id: pinboardId });
            };
            HomeService.prototype.savePinboard = function (pinboard) {
                return this.PinboardResource.save(pinboard).$promise;
            };
            ;
            HomeService.prototype.updatePinboard = function (pinboard) {
                return this.PinboardResource.update({ id: pinboard._id }, pinboard).$promise;
            };
            return HomeService;
        }());
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
