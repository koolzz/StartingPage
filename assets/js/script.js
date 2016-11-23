$().ready(function() {
    //$('body').css('background-image', 'url("' + "fyzWfa7.png" + '")');
    updateTime();
    updateLinks();
    updateWeather();
    $(document).keydown(function(event) {
        var keypressed = event.keyCode || event.which;
        if (keypressed == 46) {
            $("li", "#todolist").each(function(i) {
                var target = $(this);
                console.log(target.css("color"));
                if (target.css("color") == 'rgba(125, 184, 196, 0.498039)')
                    $(this).remove();
            });
        }
    });
    $("#todolist").click(function(event) {
        var target = $(event.target);
        if (target.is("li")) {

            console.log(target.css("color"));
            if (target.css("color") == 'rgba(125, 184, 196, 0.498039)') {
                target.css("color", '');
            } else {
                target.css("color", 'rgba(125, 184, 196, 0.5)');
            }
        }
    });

    $('#console').keydown(function(event) {
        var keypressed = event.keyCode || event.which;
        if (keypressed == 13) {
            addVal();
            $('#console').val('');
            return false; //negate newline
        }
    });

    $(this).click(function(e) {
        var container = new Array()
        container.push($("#center"));

        $.each(container, function(key, value) {

            if (!$(value).is(e.target) &&
                $(value).has(e.target).length === 0) {
                    $(".console").css("visibility","visible");
                    $("#console").focus();

            }

        });


    });

});

function updateLinks() {
    var link = [
        ["top-l", "https://calendar.google.com/calendar/render"],
        ["top-r", "https://www.reddit.com/r/funny/"],
        ["mid-l", "https://www.facebook.com/"],
        ["mid", "https://github.com/"],
        ["mid-r", "https://vk.com/feed"],
        ["bot-l", "https://mail.google.com/mail/u/0/#inbox"],
        ["bot-r", "https://blackboard.gwu.edu/webapps/login/"],
    ]
    for (i = 0; i < link.length; i++) {
        $("." + link[i][0]).attr("href", link[i][1]);
    }

}

function updateTime() {

    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();

    var time = ((hour < 10) ? "0" + hour : hour) + ":";
    time += (min < 10) ? "0" + min : min;

    $("#clock").html(time);

    setTimeout(updateTime, 400);
}

function addVal() {
    var originalString=$.trim($("textarea").val());
    var keyword = $.trim($("textarea").val()).split(' ');
    switch (keyword[0]) {
        case 'clear':
            $("#todolist").empty();
            break;
        case 'info':
            showInfo();
            return;
            break;
        case 'clear':
            $("#todolist").empty();
            break;
        case 'del':
            $("#todolist li").eq(parseInt(keyword[1],10)).remove();
            break;
        default:
            $("#todolist").append("<li>" + originalString + "</li>");
    }
    saveChanges();
}

function showInfo() {
    if ($(".todolist").css("visibility")=="hidden") {
        load();
        $(".todolist").css("visibility","visible");
    } else {
        saveChanges();
        $(".todolist").css("visibility","hidden");
    }
    if ($("#weather").css("visibility")=="hidden") {
        $("#weather").css("visibility","visible");
    } else {
        $("#weather").css("visibility","hidden");
    }
}

function saveChanges() {
    var value = "";
    $('#todolist').each(function() {
        $("li", this).each(function(i) {
            value += $(this).text() + ";";
        });
    });
    chrome.storage.sync.set({
        "todolist": value
    });

}

function load() {
    $("#todolist").empty();
    chrome.storage.sync.get("todolist", function(result) {
        var array = result.todolist.split(';');

        $.each(array, function(key, value) {
            value.trim();
            if (value) {
                $("#todolist").append("<li>" + value + "</li>");
            }
        });
    });
}

function setbg(color) {
    document.getElementById("input").style.background = color
}
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        if (key == "todolist") {
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
            html = weather.temp + '&deg;' + weather.units.temp;

            $("#weather").html(html);

        },
        error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
}
