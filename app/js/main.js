$(document).ready(function() {

  // Toggles hidden class for nav dropdown menu
  $('#menu').on('click', function() {
    $(this).next('div').slideToggle('slow');
  });

  // Animates opacity on page load
  $('body').animate({
    opacity: 1
  }, 1500);

  // Nav links scrolling animations
  $("#main-nav").on('click', function(e) {
    animateScroll(e);
  });

  $(".menu-dropdown").on('click', function(e) {
    animateScroll(e);
  });

  function animateScroll(e) {
    if (e.target.text === 'About' || e.target.text === 'Schedule') {
      $('html, body').animate({
        scrollTop: $("#about-schedule").offset().top
      }, 2000);
    } else if (e.target.text === 'Contact') {
      $('html, body').animate({
        scrollTop: $("#contact").offset().top
      }, 2000);
    }
  }

  /* ---------------------------------------------
  --------------- TWITCH API REQUEST -------------
  --------------------------------------------- */

  // Checks if stream is online or offline then makes appropriate function calls
  $.getJSON("https://api.twitch.tv/kraken/streams/sxyhxy?callback=?")
    .done(function(data) {
      if(data.error) {
        $('#status').text("Unknown");
        console.log(data.message);
      } else {
          if (data.stream) {
            online();
            streamStartTime(data.stream.created_at);
            displayCurrentGame(data.stream.game);
          } else {
            offline();
          }
          console.log(data);
        }
    })
    .fail(function() {
      console.log("*** Twitch JSON request error. No data was received. ***");
    });

  var offline = function() {
    $('#status').addClass('status-offline');
    $('#status').text('is OFFLINE');
    $('#title').text('CIREWHO is currently OFFLINE. Check out the link below to watch past streams.');
  };

  var online = function() {
    $('#status').addClass('status-online');
    $('#status').text('is LIVE');
    $('#header-status').text('LIVE');
  };

  var streamStartTime = function(startTime) {
    console.log(startTime);
    if (startTime === null) {
      $('h3').first().hide();
    } else {
      var timeArr = [];
      var startDate = new Date(startTime);
      timeArr.push(startDate.getHours());
      timeArr.push(startDate.getMinutes());
      currentTime(timeArr);
    }
  };

  // Creates a new date then saves current hours and minutes
  var currentTime = function(streamArr) {
    var currentArr = [];
    var currentDate = new Date();
    currentArr.push(currentDate.getHours());
    currentArr.push(currentDate.getMinutes());
    checkValidTimes(streamArr, currentArr);
  };

  // Checks if new day has started since stream start to keep hours calculation
  // accurate since hours = 00 at midnight
  var checkValidTimes = function(streamArr, currentArr) {
    if (currentArr[0] < streamArr[0]) {
      currentArr[0] += 24;
    }
    calculateUptime(streamArr, currentArr);
  };

  // Calculates uptime for current stream
  var calculateUptime = function(streamArr, currentArr) {
    var uptimeHrs = currentArr[0] - streamArr[0];
    var uptimeMins = Math.abs(currentArr[1] - streamArr[1]);
    displayUptime(uptimeHrs, uptimeMins);
  };

  var displayUptime = function(hrs, mins) {
    $('#hrs').text(hrs);
    $('#mins').text(mins);
  };

  var displayCurrentGame = function(game) {
    $('#header-game').text(game);
  }; 

  // -------------- End Twitch API -------------------

  // Contact form validation from formvalidation.js
  if (!$('body').hasClass('thanks')) {
    validateForm();
  }
});