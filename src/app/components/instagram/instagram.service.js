(function() {
  'use strict';

  angular
    .module('viewSound')
    .factory('instagram', instagram);

  /** @ngInject */
  function instagram($log, $http) {
    var apiHost = 'https://api.instagram.com/v1/media/popular?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK';

    var service = {
      apiHost: apiHost,
      getImages: getImages
    };

    return service;

    function getImages() {

      console.log('Instagram');
      return $http.jsonp(apiHost)
        .then(getImagesComplete)
        .catch(getImagesFailed);

      function getImagesComplete(response) {
        return response.data;
      }

      function getImagesFailed(error) {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();
