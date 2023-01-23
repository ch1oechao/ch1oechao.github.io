$(document).ready(function(){
  var $shutter = $('#cameraShutter');

  function printPhoto() {
    $('.info-content').toggleClass('animate');
    $('.camera .glass').toggleClass('active');
  }

  $shutter.on('click', printPhoto);

  setTimeout(printPhoto, 500);

  console.log('©ch1oechao 2015-' + (new Date()).getFullYear());

});
