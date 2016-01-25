"use strict";
namespace app.Controllers {
  export class PinboardPageController {
    public pinboard;
    public pin;

    public addPin() {
      let pin = {
        pintitle: this.pin.title,
        pinboard: this.pinboard._id,
        imgurl: this.pin.imgurl
        // createdBy: this.UserService.status._id
      };
      this.PinService.savePin(pin).then((res) => {
        this.pinboard.pins.push(res);
        this.$location.path('/boards/:id')
      });
    }

    public deletePin(pin){
      this.PinService.deletePin(pin).then((res) =>{
        this.pinboard.pins.splice(this.pinboard.pins.indexOf(pin), 1)
      });
    };

    constructor(
      private HomeService: app.Services.HomeService,
      private PinService: app.Services.PinService,
      private $routeParams: ng.route.IRouteParamsService,
      private UserService: app.Services.UserService,
      private $location: ng.ILocationService
    ) {
      this.pinboard = HomeService.getPinboard( $routeParams['id']);
    }
  }
  angular.module('app').controller('PinboardPageController', PinboardPageController);
}
