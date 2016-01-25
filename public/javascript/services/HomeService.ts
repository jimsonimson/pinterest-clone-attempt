"use strict";
namespace app.Services {
  export class HomeService {
    public PinboardResource;

    public getAll() {
      //GET: /api/pinboards
      return this.PinboardResource.query();
    }

    public getPinboard(pinboardId){
      // GET: /api/pinboards/{{pinboardId}}
      return this.PinboardResource.get({ id: pinboardId });
    }

    public savePinboard(pinboard){
      //POST: /api/pinboards
      return this.PinboardResource.save(pinboard).$promise;
    };

    public updatePinboard(pinboard){
      return this.PinboardResource.update({ id: pinboard._id }, pinboard).$promise;
    }


    constructor(
      private $resource: ng.resource.IResourceService
    ) {
      this.PinboardResource = $resource('/api/pinboards/:id', null, {
        'update': { method: 'PUT'}
      });
    }
  }

  angular.module('app').service('HomeService', HomeService);
}
