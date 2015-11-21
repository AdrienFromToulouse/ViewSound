(function() {
  'use strict';

  angular
    .module('viewSound')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(imageToMidi, instagram) {

    activate();

    function activate() {
      instagram.getImages()
        .then(digestInstaImages)
        .catch(digestInstaImagesFailed);
    }

    function digestInstaImages(images) {
      console.log(images.data[0].images.standard_resolution.url);
      var img = document.createElement('img');
      img.setAttribute('src', images.data[0].images.standard_resolution.url);
      img.addEventListener('load', function() {
        imageToMidi.extractProminentColors(img);
      });

    }

    function digestInstaImagesFailed() {
      console.log('digest InstaImages Failed');
    }
  }
})();
