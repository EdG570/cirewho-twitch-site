$(document).ready(function() {
  $('#menu').on('click', function() {
    var menu = $(this).next('div');

    menu.toggleClass('display-hide');
  }); // closes menu click function

});