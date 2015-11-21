(function() {
  'use strict';

  angular
    .module('viewSound')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($q, $log, $window, imageToMidi, instagram) {

    activate();

    function activate() {
      instagram.getImages()
        .then(digestInstaImages)
        .then(imageToMidi.convertColorToMidi)
        .then(function(sounds) {
          $log.log('Sounds array', sounds);
          $window.MIDI.loadPlugin({
            soundfontUrl: "assets/soundfont/",
            instrument: "acoustic_grand_piano",
            onsuccess: function() {
              sounds.forEach(function(sound) {
                var delay = sound.time; // play one note every quarter second
                var note = sound.note; // the MIDI note
                var velocity = sound.velocity; // how hard the note hits
                // play the note
                $log.log('velocity', velocity);
                $log.log('note', note);
                $log.log('delay', delay);

                $window.MIDI.setVolume(0, 127);
                $window.MIDI.noteOn(0, note, velocity, delay);
                $window.MIDI.noteOff(0, note, delay + 0.75);

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


