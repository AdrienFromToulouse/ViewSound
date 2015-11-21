(function() {
  'use strict';

  angular
    .module('viewSound')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
