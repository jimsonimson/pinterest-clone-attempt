"use strict";
namespace app.Services {
  export class PinService {
    private pinResource;

    public savePin(pin){
      return this.pinResource.save(pin).$promise;
    }

    public deletePin(pin){
      return this.pinResource.delete({ id: pin._id }).$promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService
    ){
      this.pinResource = $resource('/api/pins/:id');
    }
  }
  angular.module('app').service('PinService', PinService);
}
