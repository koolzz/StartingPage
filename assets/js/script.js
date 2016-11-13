$(function() {
  //$('body').css('background-image', 'url("' + "background.jpg" + '")');
  updateTime();

});

function updateTime() {

  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();

  var time = "";
  time = (hour < 10) ? "0" + hour : hour;
  time += ":";
  time += (min < 10) ? "0" + min : min;

  $("#clock").html(time);

  setTimeout(updateTime, 400);
}

function updateWeather() {
  $.simpleWeather({
    location: 'Arlington, VA',
    woeid: '',
    unit: 'c',
    success: function(weather) {
      html = '<p>' + weather.temp + '&deg;' + weather.units.temp + '</p>';

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>' + error + '</p>');
    }
  });
}
