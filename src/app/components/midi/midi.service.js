(function() {
  'use strict';

  angular
    .module('viewSound')
    .factory('MidiService', MidiService);

  /** @ngInject */
  function MidiService() {
    var audioCtx = new AudioContext();
    var Midi = function(sounds) {

      var distortion = audioCtx.createWaveShaper(),
        filter = audioCtx.createBiquadFilter(),
        compressor = audioCtx.createDynamicsCompressor();

      compressor.threshold.value = -50;
      compressor.knee.value = 40;
      compressor.ratio.value = 12;
      compressor.reduction.value = -20;
      compressor.attack.value = 0;
      compressor.release.value = 0.75;

      angular.forEach(sounds, function(sound) {
        var oscillator = audioCtx.createOscillator(),
          osc1 = audioCtx.createOscillator(),
          osc2 = audioCtx.createOscillator();

        oscillator.type = 'triangle';
        osc1.type = 'square';
        osc2.type = 'sawtooth';
        osc2.frequency.value = osc1.frequency.value = oscillator.frequency.value = frequencyFromNoteNumber(sound.note);

        oscillator.connect(filter);
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(distortion);
        oscillator.detune.value = 400;
        osc1.detune.value = 6100;
        distortion.connect(compressor);
        compressor.connect(audioCtx.destination);

        osc1.start(audioCtx.currentTime + sound.timeStart);
        osc1.stop(audioCtx.currentTime + sound.timeEnd);
        oscillator.start(audioCtx.currentTime + sound.timeStart);
        oscillator.stop(audioCtx.currentTime + sound.timeEnd);
      });

      function frequencyFromNoteNumber(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
      }
    };
    return Midi;
  }
})();
