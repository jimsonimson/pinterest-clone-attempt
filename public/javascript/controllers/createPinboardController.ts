"use strict";
namespace app.Controllers {
  export class CreatePinboardController {
    public pinboard = {};

    public createPinboard(){
      this.HomeService.savePinboard(this.pinboard).then((res)=>{
        this.$location.path('/boards/:id')
      })
    }

    constructor(
      private HomeService: app.Services.HomeService,
      private $location: ng.ILocationService
    ){}
  }
  angular.module('app').controller('CreatePinboardController', CreatePinboardController);
}
