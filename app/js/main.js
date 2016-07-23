$(document).ready(function() {

  // Toggles nav menu dropdown
  $('#menu').on('click', function() {
    $(this).next('div').toggleClass('display-hide');
  }); 

  /* ---------------------------------------------
  --------------- TWITCH API REQUEST -------------
  --------------------------------------------- */

  // Checks if stream is online or offline then makes appropriate function calls
  $.getJSON("https://api.twitch.tv/kraken/streams/cirewho?callback=?")
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
    $('#hrs').text('0');
    $('#mins').text('0');
    $('#game').text(' -- ');
  };

  var online = function() {
    $('#status').addClass('status-online');
    $('#status').text('ONLINE');
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
    $('#game').text(game);
  }; 

  // -------------- End Twitch API -------------------
});