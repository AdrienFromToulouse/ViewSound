(function() {
  'use strict';

  angular
    .module('viewSound')
    .factory('MidiService', MidiService);

  /** @ngInject */
  function MidiService() {
    var Midi = function() {
      var audioCtx = new AudioContext(),
        distortion = audioCtx.createWaveShaper(),
        filter = audioCtx.createBiquadFilter(),
        compressor = audioCtx.createDynamicsCompressor();

      compressor.threshold.value = -50;
      compressor.knee.value = 40;
      compressor.ratio.value = 12;
      compressor.reduction.value = -20;
      compressor.attack.value = 0;
      compressor.release.value = 0.75;

      var noteArray = [
        {
          noteNumber: 4,
          velocity: 100,
          time: 3
        },
        {
          noteNumber: 10,
          velocity: 127,
          time: 2
        },
        {
          noteNumber: 20,
          velocity: 90,
          time: 4
        },
        {
          noteNumber: 6,
          velocity: 50,
          time: 1
        }
      ];


      angular.forEach(noteArray, function(note) {
        var oscillator = audioCtx.createOscillator(),
          osc1 = audioCtx.createOscillator(),
          osc2 = audioCtx.createOscillator();

        oscillator.type = 'triangle';
        osc1.type = 'square';
        osc2.type = 'sawtooth';
        osc2.frequency.value = osc1.frequency.value = oscillator.frequency.value = frequencyFromNoteNumber(note.noteNumber) * 10;

        oscillator.connect(filter);
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(distortion);
        oscillator.detune.value = 400;
        osc1.detune.value = 6100;
        distortion.connect(compressor);
        compressor.connect(audioCtx.destination);

        osc1.start(audioCtx.currentTime + note.time);
        osc1.stop(audioCtx.currentTime + note.time + 2);
        oscillator.start(audioCtx.currentTime + note.time);
        oscillator.stop(audioCtx.currentTime + note.time + 2);
      });

      function frequencyFromNoteNumber(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
      }
    };
    return Midi;
  }
})();
