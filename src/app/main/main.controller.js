(function() {
  'use strict';

  angular
    .module('viewSound')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $window) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1448080223377;
    vm.showToastr = showToastr;


    activate();

    function activate() {
      getWebDevTec();
      $window.MIDI.loadPlugin({
        soundfontUrl: "assets/soundfont/",
        instrument: "acoustic_grand_piano",
        onsuccess: function() {
          var delay = 0; // play one note every quarter second
          var note = 63; // the MIDI note
          var velocity = 127; // how hard the note hits
          // play the note
          $window.MIDI.setVolume(0, 127);
          $window.MIDI.noteOn(0, note, velocity, delay);
          $window.MIDI.noteOff(0, note, delay + 0.75);
        }
      });

      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
