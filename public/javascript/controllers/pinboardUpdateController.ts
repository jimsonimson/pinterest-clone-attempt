"use strict";
namespace app.Controllers {
  export class PinboardUpdateController {
    public pinboard;

    public update(id){
      this.HomeService.updatePinboard(this.pinboard).then((res) => {
        this.$location.path('/');
      });
    }

    constructor(
      private HomeService: app.Services.HomeService,
      private $location: ng.ILocationService,
      private $routeparams: ng.route.IRouteParamsService
    ){
      this.pinboard = HomeService.getPinboard($routeparams['id']);
    };
  }
  angular.module('app').controller('PinboardUpdateController', PinboardUpdateController);
}
