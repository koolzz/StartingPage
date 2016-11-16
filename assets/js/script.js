$().ready(function() {
  //$('body').css('background-image', 'url("' + "RLYWjMi.jpg" + '")');
  //$("#left").hide();
  updateTime();
  updateLinks();


  $('#input').keydown(function (event) {
     var keypressed = event.keyCode || event.which;
     if (keypressed == 13) {
         addVal();
         $('#input').val('');
         return false;//negate newline
     }
 });
 $(this).click(function(e) {
     var container= new Array()
     //container.push($("#clock"));

     container.push($("#left"));

     $.each(container, function(key,value){

         if(!$(value).is(e.target)
         && $(value).has(e.target).length === 0){
             if($(".todolist").is(":visible")) {
                 saveChanges();
                $(".todolist").hide();
             }
             else {
                load();
                $(".todolist").show();
             }

         }

     });


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
function addVal(){
    var keyword = $.trim($("textarea").val());
    if(keyword){
        if(keyword=="clear"){
             $("#todolist").empty();
        }
        else{
          $("#todolist").append("<li>"+keyword+"</li>");
        }

    }
    saveChanges();
}
function saveChanges() {
    var value="";
     $('#todolist').each(function(){
        $("li", this).each(function(i) {
            value+=$(this).text()+";";
        });
     });
     chrome.storage.sync.set({"todolist": value} );

}

function load() {
    $("#todolist").empty();
    chrome.storage.sync.get("todolist",function (result){
        var array = result.todolist.split(';');

        $.each(array,function(key,value){
            value.trim();
            if(value){
                $("#todolist").append("<li>"+value+"</li>");
            }
        });
    } );
}
function setbg(color)
{
    document.getElementById("input").style.background=color
}
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    if(key=="todolist"){
        load();
    }
  }

});

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
