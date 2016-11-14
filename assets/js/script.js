$().ready(function() {
  //$('body').css('background-image', 'url("' + "background.jpg" + '")');
  updateTime();
  updateLinks();

  load();
  $('#list').keydown(function (event) {
     var keypressed = event.keyCode || event.which;
     if (keypressed == 13) {
         saveChanges();
     }
 });

});
function updateLinks(){
    var link = [
        ["top-l","https://calendar.google.com/calendar/render"],
        ["top-r","https://www.reddit.com/r/funny/"],
        ["mid-l","https://www.facebook.com/"],
        ["mid","https://github.com/"],
        ["mid-r","https://vk.com/feed"],
        ["bot-l","https://mail.google.com/mail/u/0/#inbox"],
        ["bot-r","https://blackboard.gwu.edu/webapps/login/"],
    ]
    for(i=0;i<link.length;i++){
        $("."+link[i][0]).attr("href",link[i][1]);
    }

}
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

function saveChanges() {
  // Get a value saved in a form.

  var keywords = $.trim($("textarea").val());

    chrome.storage.sync.set({'channels': keywords});

}
function load() {
    var channels = "";
    chrome.storage.sync.get('channels', function (result) {
        channels = result.channels;
        //alert(result.channels);
        if(!channels)
            $("#list").val("empty");
        else {
            $("#list").val(channels);
        }
    });
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
