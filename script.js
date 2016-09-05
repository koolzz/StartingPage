function main(){
    updateTime();
    addLinks();

}

function updateTime(){
  var date=new Date()
  var hour=date.getHours();
  var min=date.getMinutes();

  var time="";
  if(hour<10)
    time+="0";
  time+=hour+":";
  if(min<10)
    time+="0"
  time+=min;

  document.getElementById("clock").innerHTML=time;

  setTimeout(function() { updateTime(); }, 400);

}

function addLinks(){

var sb = window.chrome.embeddedSearch.searchBox;
sb.startCapturingKeyStrokes();

    var name=["reddit","vk","imgur"]
    var link=["https://www.reddit.com/r/funny/","https://vk.com/feed","http://imgur.com/"]

    for( i=0;i<3;i++){
        /*
        var p = document.createElement('a');
        var linkText = document.createTextNode(name[i]);
        p.appendChild(linkText);
        p.title = "my title text";
        p.href = link[i];
        document.body.appendChild(p);*/
         document.getElementById("link"+i).href=link[i];

    }
}

function addImg(){
    var img = document.createElement("img");
    img.src = "star.png";
    img.id="star"
    img.style.position= 'relative';
    img.style.left = '0px';
    img.style.top = '0px';
    document.body.appendChild(img);
    moveStar();
}

function moveImg(){
    var img= document.getElementById("star");
    img.style.left = parseInt(img.style.left) + 1 + 'px';
    img.style.top = parseInt(img.style.left) + 0.7 + 'px';
    setTimeout(function() { moveStar(); }, 10);
    }
