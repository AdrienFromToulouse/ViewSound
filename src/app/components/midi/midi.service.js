(function() {
  'use strict';

  angular
    .module('viewSound')
    .factory('MidiService', MidiService);

  /** @ngInject */
  function MidiService() {
    var Midi = function(sounds) {
      var audioCtx = new AudioContext(),
        distortion = audioCtx.createWaveShaper(),
        filter = audioCtx.createBiquadFilter(),
        envelope = audioCtx.createGain(),
        compressor = audioCtx.createDynamicsCompressor();


      filter.frequency.value = 400;

      compressor.threshold.value = -70;
      compressor.knee.value = 40;
      compressor.ratio.value = 52;
      compressor.reduction.value = -20;
      compressor.attack.value = 0;
      compressor.release.value = 1;

      angular.forEach(sounds, function(sound) {
        var osc = audioCtx.createOscillator(),
          osc1 = audioCtx.createOscillator();

        osc.type = 'sine';
        osc1.type = 'square';
        osc.frequency.value = osc1.frequency.value = frequencyFromNoteNumber(sound.note);
        osc.connect(filter);
        filter.connect(distortion);
        osc.detune.value = 600;
        osc1.detune.value = 5000;
        distortion.connect(compressor);
        compressor.connect(envelope);
        envelope.connect(audioCtx.destination);

        envelope.gain.linearRampToValueAtTime(1.0, sound.timeStart + 0.1 * sound.velocity);
        envelope.gain.setTargetAtTime(0.68, sound.timeStart + 0.1 * sound.velocity, 0.65);
        osc1.start(audioCtx.currentTime + sound.timeStart);
        osc1.stop(audioCtx.currentTime + sound.timeEnd);
        osc.start(audioCtx.currentTime + sound.timeStart);
        osc.stop(audioCtx.currentTime + sound.timeEnd);
      });

      function frequencyFromNoteNumber(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
      }
    };
    return Midi;
  }
})();
