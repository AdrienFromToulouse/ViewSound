(function() {
  'use strict';

  angular
    .module('viewSound')
    .factory('imageToSong', imageToSong);

  /** @ngInject */
  function imageToSong($log) {
    $log.log('IT WORKS');

    return {
      extractProminentColors: extractProminentColors
    };

    function extractProminentColors(image) {
      var vibrant = new window.Vibrant(image),
        swatches = vibrant.swatches();
      for (var swatch in swatches) {
        if (swatches.hasOwnProperty(swatch) && swatches[swatch])
          $log(swatch, swatches[swatch].getHex());
      }
      /*
      * Results into:
        * Vibrant #7a4426
      * Muted #7b9eae
      * DarkVibrant #348945
      * DarkMuted #141414
      * LightVibrant #f3ccb4
      */
    }
  }
})();