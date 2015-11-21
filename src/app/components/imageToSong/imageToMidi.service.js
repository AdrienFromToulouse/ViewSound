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
        currentTime = 0;

      for (var swatch in swatches) {
        if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
          currentTime += 1;
          var colorsObj = swatches[swatch],
            hue = colorsObj.hsl[0],
            saturation = colorsObj.hsl[1],
            lightness = colorsObj.hsl[2],
          sound = {
            note: Math.floor(hue * 96 + 1),
            velocity: Math.floor(saturation * 127),
            time: currentTime
          };
          sounds.push(sound);
          $log.log('hue', hue);
          $log.log(swatch, colorsObj);
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