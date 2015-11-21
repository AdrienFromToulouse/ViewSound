(function() {
  'use strict';

  angular
    .module('viewSound')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(imageToMidi, instagram) {
    var vm = this,
      image = {};

    //imageToMidi.extractProminentColors(image);

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
