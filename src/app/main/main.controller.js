(function() {
  'use strict';

  angular
    .module('viewSound')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($q, $log, $window, imageToMidi, instagram, $scope, MidiService) {

    activate();

    function activate() {
      instagram.getImages()
        .then(digestInstaImages)
        .then(imageToMidi.convertColorToMidi)
        .then(function(sounds) {
          new MidiService(sounds);
          $log.log('Sounds array', sounds);
          $window.MIDI.loadPlugin({
            soundfontUrl: "assets/soundfont/",
            instrument: "acoustic_grand_piano",
            onsuccess: function() {
              $scope.sounds = sounds;
              $scope.$apply();
              sounds.forEach(function(sound) {
                $window.MIDI.setVolume(0, 127);
                $window.MIDI.noteOn(0, sound.note, sound.velocity, sound.timeStart);
                $window.MIDI.noteOff(0, sound.note, sound.timeEnd);
              });
            }
          });
        })
        .catch(digestInstaImagesFailed);
    }

    function digestInstaImages(images) {
      var firstImageUrl = images.data[0].images.standard_resolution.url,
        img = document.createElement('img'),
        deferred = $q.defer();

      $log.log(firstImageUrl);

      img.setAttribute('crossOrigin', 'anonymous');
      img.setAttribute('src', firstImageUrl);
      img.addEventListener('load', function() {
        return deferred.resolve(img);
      });

      $scope.hash = firstImageUrl;
      return deferred.promise;
    }

    function digestInstaImagesFailed() {
      $log.log('digest InstaImages Failed');
    }

    $scope.nextPic = function() {
      activate();
    }
  }
})();
