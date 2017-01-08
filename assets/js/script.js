$().ready(function() {
    updateTime();
    updateLinks();
    updateWeather();
    $(document).keydown(function(event) {
        var keypressed = event.keyCode || event.which;
        if (keypressed == 46) {
            $("li", "#todolist").each(function(i) {
                var target = $(this);
                if (target.css("color") == 'rgba(125, 184, 196, 0.498039)')
                    $(this).remove();
            });
            saveChanges();
        }
    });
    $("#todolist").click(function(event) {
        var target = $(event.target);
        if (target.is("li")) {
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
    $('#console').focus(function() {
        $('#console').attr('placeholder', '');
    })
    $('#console').blur(function() {
        $('#console').val('');
        $('#console').attr('placeholder', '> ...');
    });

    $("#showToDoList").click(function(e) {
        toggleToDoList();
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
    var originalString = $.trim($("textarea").val());
    var keyword = $.trim($("textarea").val()).split(' ');
    switch (keyword[0]) {
        case '!clear':
            $("#todolist").empty();
            saveChanges();
            break;
        case '!del':
            $("#todolist li").eq(parseInt(keyword[1], 10)).remove();
            saveChanges();
            break;
        default:
            var li = $('<li>')
                .text(originalString);
            if ($(".todolist").css("display") == "none") {
                load(function() {
                    $(".todolist").fadeIn(400);
                    $("#todolist").append(li);
                    saveChanges();
                });
            } else {
                $("#todolist").append(li);
                saveChanges();
            }
    }
}

function toggleToDoList() {
    if ($(".todolist").css("display") == "none") {
        load(function() {
            $(".todolist").fadeIn(400);
        });
    } else {
        saveChanges();
        $(".todolist").fadeOut(400);
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

function load(callback) {
    chrome.storage.sync.get("todolist", function(result) {
        if (result.todolist === undefined) {
            saveChanges();
            if (callback) {
                callback();
            }
            return;
        }
        var temp = $("#todolist").children();
        $("#todolist").empty();
        var children = $("#todolist").find('li');
        var array = result.todolist.split(';');
        $.each(array, function(key, value) {
            value.trim();
            if (value) {
                var li = $('<li>')
                    .text(value);;
                $("#todolist").append(li);
            }
        });
        if (callback) {
            callback();
        }
    });
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
            var html = '<p>' + weather.temp + '</p>';
            html += '<p>' + '&deg;' + weather.units.temp + '</p>';
            $("#weather").css('color', weather.temp > 0 ? '#F0B67F' : '#63D2FF');
            $("#weather").html(html);
        },
        error: function(error) { 
            console.log("Error with simpleWeather, retrying");
            setTimeout(updateWeather, 5000);
        }
    });
}
