(function() {
  'use strict';

  angular
    .module('viewSound')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($q, $log, imageToMidi, instagram) {

    activate();

    function activate() {
      instagram.getImages()
        .then(digestInstaImages)
        .then(imageToMidi.convertColorToMidi)
        .then(function(sounds) {
          $log.log('Sounds array', sounds);
        })
        .catch(digestInstaImagesFailed);
    }

    function digestInstaImages(images) {
      var firstImageUrl = images.data[0].images.standard_resolution.url,
        img = document.createElement('img'),
        deferred = $q.defer();

      $log.log(firstImageUrl);

      img.setAttribute('crossOrigin','anonymous');
      //img.setAttribute('src', 'assets/images/protractor.png');
      img.setAttribute('src', firstImageUrl);
      img.addEventListener('load', function() {
        return deferred.resolve(img);
      });

      return deferred.promise;
    }

    function digestInstaImagesFailed() {
      console.log('digest InstaImages Failed');
    }
  }
})();


