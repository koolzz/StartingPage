$(function() {
    $('body').css('background-image', 'url("' + "background.jpg" + '")');
    updateTime();
    addLinks();
    updateWeather();
});

function updateTime() {
    var date=new Date();
    var hour=date.getHours();
    var min=date.getMinutes();

    var time="";
    time=(hour<10)?"0"+hour:hour;
    time+=":";
    time+=(min<10)?"0"+min:min;

    $("#clock").html(time);

    setTimeout(updateTime, 400);
}

function addLinks(){


    var name=[  ["vk","facebook"],
                ["reddit","imgur"],
                ["pandora"] ];
    var link=[  ["https://vk.com/feed","https://www.facebook.com"],
                ["https://www.reddit.com/r/all","http://imgur.com"],
                ["http://www.pandora.com/station/play/1662888871608872951"] ];


    var content = "<table>"
    console.log(name.length);
    for(y=0; y<2; y++){
        content+='<tr>';

        console.log(name[y].length);
        for(x=0;x<3;x++){
            if(name[x][y]!= null){
                console.log(link[x][y]);
                var href='<a href="'+link[x][y]+'">'+name[x][y]+'</a>';
                content += '<td>'+href+'</td>';
            }
        }

        content+='</tr>';
    }
    content += "</table>"

    $('#link').append(content);
}

function updateWeather(){
    $.simpleWeather({
      location: 'Arlington, VA',
      woeid: '',
      unit: 'c',
      success: function(weather) {
        html = '<p>'+weather.temp+'&deg;'+weather.units.temp+'</p>';

        $("#weather").html(html);
      },
      error: function(error) {
        $("#weather").html('<p>'+error+'</p>');
      }
    });
}
