(function() {
  'use strict';

  angular
    .module('viewSound')
    .factory('MidiService', MidiService);

  /** @ngInject */
  function MidiService($log, $http) {

    var Midi = function() {
      var audioCtx = new AudioContext(),
        someSound = [
          {
            note: '36',
            velocity: '50',
            time: '100'
          },
          {
            note: '37',
            velocity: '100',
            time: '167'
          }
        ];

      function noteToSound() {
        $http.get('/bank.json').then(function(response) {
          angular.forEach(someSound, function(noteObj) {
            getSound(response.data, noteObj.note)
          });
        });
      }

      function getSound(bank, note) {
        var currentBest = -1,
          currentBestDelta = 255,
          thisDelta,
          source = audioCtx.createBufferSource();

        bank.samples.forEach(function(sample, index) {
          thisDelta = Math.abs(note - sample.midiNumber);

          if (thisDelta < currentBestDelta) {
            currentBest = index;
            currentBestDelta = thisDelta;
          }
        });

        if (currentBest < 0) {
          return null;
        }



        $http({
          method: 'GET',
          headers: {
            responseType: 'arraybuffer'
          },
          url: 'sounds/piano/C.wav'
        }).then(function(sound) {
          audioCtx.decodeAudioData(sound.data, function(buffer) {
            $log.log(buffer);
          });
        });
        //try {
        //  source.buffer = bank.samples[currentBest].buffer;
        //} catch (e) {
        //  // Nothing to play
        //  $log.log('MidiSoundSource: No audio available for note', note, 'in sound bank', bank.name);
        //}
        //source.playbackRate.value = Math.pow(2, (note - bank.samples[currentBest].midiNumber) / 12);
        //
        //$log.log(source);
        return source;
      }

      return {
        noteToSound: noteToSound
      }
    };

    return Midi;
  }
})();
