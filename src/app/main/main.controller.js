(function() {
  'use strict';

  angular
    .module('viewSound')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, instagram) {
    var vm = this;

    activate();

    function activate() {
      instagram.getImages()
        .then(digestInstaImages)
        .catch(digestInstaImagesFailed);
    }

    function digestInstaImages(images) {
      console.log(images.data[0].images.standard_resolution.url);
    }
    function digestInstaImagesFailed() {
      console.log('digest InstaImages Failed');
    }
  }
})();
