(function() {
  'use strict';

  angular
    .module('viewSound')
    .factory('imageToMidi', imageToMidi);

  /** @ngInject */
  function imageToMidi($log, $window) {
    $log.log('IT WORKS');

    return {
      convertColorToMidi: convertColorToMidi
    };

    function convertColorToMidi(image) {
      $log.log(image);
      var vibrant = new $window.Vibrant(image, 64, 5),
        swatches = vibrant.swatches(),
        sounds = [],
        currentTime = 0,
        pixelsAmount = 0,
        totalDuration = 5, // seconds
        noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

      for (var swatch in swatches) {
        if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
          pixelsAmount += swatches[swatch].population;
        }
      }

      $log.log('pixelsAmount = ' + pixelsAmount);

      for (var swatch in swatches) {
        if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
          var colorsObj = swatches[swatch],
            hue = colorsObj.hsl[0],
            saturation = colorsObj.hsl[1],
            lightness = colorsObj.hsl[2],
            population = colorsObj.population,
            duration = (population / pixelsAmount) * totalDuration,
            octave = Math.ceil(lightness * 9) + 1,
            note = Math.ceil(hue * 11) * octave,
            sound = {
              note: note,
              velocity: Math.min(Math.floor(saturation * 127 * 2), 127),
              timeStart: currentTime,
              timeEnd: currentTime + duration,
              backgroundColor: colorsObj.getHex(),
              letterNote: noteStrings[note % 12] + octave
            };
          sounds.push(sound);

          currentTime += duration;

          //$log.log(swatch, colorsObj);
          //$log.log(swatch, sound);
        }
      }
      return sounds;
    }

    /*
     hsl: Array[3]
     population: 5494
     rgb: Array[3]
     */
  }
})();
