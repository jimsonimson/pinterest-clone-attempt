'use strict';
namespace app.Controllers {
  export class HomeController {
    public pinboards;

    constructor(private HomeService: app.Services.HomeService) {
      this.pinboards = HomeService.getAll();
    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
