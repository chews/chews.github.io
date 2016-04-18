// ==UserScript==
// @name        Youtube Video Ratings Bar with Power Meter
// @description Highlights the most worthwhile videos on YouTube. In addition to a ratings bar, there's also a blue "Power Meter" which measures people's enthusiasm for videos.
// @version     2016.04.02
// @author      lednerg
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @icon        http://i.imgur.com/ZfKR597.png
// @include     http://*.youtube.com/*
// @include     http://youtube.com/*
// @include     https://*.youtube.com/*
// @include     https://youtube.com/*
// @connect     *
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @namespace   https://openuserjs.org/users/lednerg
// @require     http://code.jquery.com/jquery-1.11.1.min.js
// @require     https://cdn.firebase.com/js/client/2.4.2/firebase.js
// ==/UserScript==

GM_addStyle(""+
".ratingsBar:hover > .likesBar, "+
".ratingsBar:hover > .dislikesBar, "+
".ratingsBar:hover > .pausedBar, "+
".ratingsBar:hover > .powerBar, "+
".ratingsBar:hover > .hatesBar { "+
"  transition: height .25s .0s; "+
"   height: 18px; "+
"  } "+
"                    .likesBar, "+
"                    .dislikesBar, "+
"                    .pausedBar,"+
"                    .ratingsBar, "+
"                    .powerBar, "+
"                    .hatesBar { "+
"  transition: height .25s .0s; "+
"   height: 4px; "+
"  position: absolute; "+
"  bottom: 0px; "+
"  } "+
".ratingsBar:hover { "+
"  transition: height .25s .0s; "+
"   height: 26px; "+
"  }"+
"      .ratingsBar { "+
"  width: 100%; "+
"  } "+
".powerBar,"+
".hatesBar { "+
"  position: absolute; "+
"  top: 0px; "+
"  } "+
".textContainer { "+
"  display: table; "+
"  position: absolute; "+
"  bottom: 0px; "+
"  height: 26px; "+
"  width: 100%; "+
"} "+
".textContainer:hover.short { "+
"  transition: height .15s .0s !important; "+
"   height: 18px; "+
"  padding-top: 8px; "+
"} "+
"      .textContainer.short { "+
"  transition: height .5s .15s; "+
"   height: 26px; "+
"} "+
".dislikesBar { "+
"  width: 100%; "+
"  right: 0px; "+
"  background-color: #CC0000; "+
"  } "+
".likesBar { "+
"  background-color: #00BB22; "+
"  } "+
".powerBar { "+
"  background-color: #0029FF; "+
"  background-position: right; "+
"  background-size: 10px 100%; "+
"  } "+
".hatesBar { "+
"  background-image: linear-gradient(90deg, rgba(200,200,255,.65) 40%, #0029FF 40%); "+
"  background-position: left; "+
"  background-size: 10px 100%; "+
"  } "+
" .pausedBar { "+
"  background-color: #00bb22; "+
"  background-image: linear-gradient(-45deg, #99e449 25%, transparent 25%, transparent 50%, #99e449 50%, #99e449 75%, transparent 75%, transparent); "+
"  background-size: 20px 20px; "+
"  } "+
".yt-uix-simple-thumb-wrap:hover .textBar, "+
"             .video-thumb:hover .textBar { "+
"  transition: opacity .15s .0s; "+
"   opacity: 1; "+
"  } "+
"                                         .textBar { "+
"  transition: opacity .25s .25s; "+
"   opacity: 0; "+
"  display: table-cell; "+
"  position: relative; "+
"  vertical-align: middle; "+
"  width: 100%; "+
"  color: #f0f0c0; "+
"  font-family: arial,​sans-serif; "+
"  font-size: 11px; "+
"  font-weight: 700; "+
"  text-align: left; "+
"  text-shadow: black 0px 0px 7px, black 1px 1px 5px, black 1px 1px 4px, black 1px 1px 3px, black 1px 1px 0px; "+
"  } "+
".textBar:hover > *:hover { "+
"  transition: opacity .25s .15s; "+
"   opacity: .5; "+
"    } "+
".powerScore { "+
"  display: inline-block; "+
"  padding-left: 2px; "+
"  } "+
".ratingsScore { "+
"  display: inline-block; "+
"  padding-left: 2px; "+
"  } "+
".likesScore { "+
"  color: #77ff77; "+
"  } "+
".dislikesScore { "+
"  color: #ff9977; "+
"  padding-right: 2px; "+
"  } "+
".ratingsBar:hover > .shadingBar { "+
"  transition: opacity .25s .15s; "+
"   opacity: .85; "+
"  } "+
"                   .shadingBar { "+
"  transition: opacity .25s .15s; "+
"   opacity: 0; "+
"  height: 100%; "+
"  width: 100%; "+
"  background: linear-gradient( to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,.2) 90%, rgba(0,0,0,.6) 100% ) ; "+
"  } "+
".video-actions,"+
"   .video-time { "+
"  margin-bottom: 4px; "+
"  } "+
".video-actions { "+
"  top: 2px; "+
"  } "+
".related-list-item:hover .video-time { "+
"  right: -100px; "+
"  } "+
".watched .video-thumb { "+
"  opacity: 1 !important; "+
"  } "+
".watched .video-thumb img { "+
"  transition: opacity 1s .25s; "+
"   opacity: .5 !important; "+
"  -webkit-transform: translate3d( 0px, 0px, 0px ); "+
"  transform: translate3d( 0px, 0px, 0px ); "+
"  } "+
"               .watched:hover .video-thumb img, "+
".feed-item-main-content:hover .video-thumb img { "+
"  transition: opacity .15s 0s; "+
"   opacity: 1 !important; "+
"  } "+
".scanned .yt-thumb-clip { "+
"  bottom: -96px; "+
"  } "+
".scanned .yt-thumb-default { "+
"  margin-bottom: 4px; "+
"  } "+
".yt-thumb-72.scanned > .ratingsBar > *, "+
" .yt-thumb-64.scanned > .ratingsBar > * { "+
"  zoom: .8 !important; "+
"  } "+
".playlist-video > .scanned > .ratingsBar > * { "+
"  zoom: .8; "+
"  } "+
".load-more-button,"+
" .video-list-item { "+
"    animation-duration: 3s; "+
"    -webkit-animation-duration: 3s; "+
"    animation-name: addedThumbnails; "+
"    -webkit-animation-name: addedThumbnails; "+
"    -webkit-animation-iteration-count: 1; "+
"} "+
".yt-pl-thumb .blacklist, .thumb-wrapper .blacklist, .yt-lockup-thumbnail .blacklist { "+
"    right: 26px !important; "+
"    top: 2px !important; "+
"} "+
".yt-pl-thumb .popoutmode, .thumb-wrapper .popoutmode, .yt-lockup-thumbnail .popoutmode { "+
"    bottom: auto !important; "+
"    top: 2px !important; "+
"    left: 2px !important; "+
"} "+
".videowall-still:hover .textBar { "+
"    opacity: 1 !important; "+
"    transition: opacity .25s 0s !important; "+
"} "+
"@keyframes addedThumbnails { "+
"    from { "+
"        outline-color: #0ff; "+
"    } "+
"    to { "+
"        outline-color: #f00; "+
"    } "+
"} "+
"@-webkit-keyframes addedThumbnails {  "+
"    from { "+
"        outline-color: #0ff; "+
"    } "+
"    to { "+
"        outline-color: #f00; "+
"    } "+
"} ");

var myFirebaseRef = new Firebase("https://n01.firebaseio.com/");
Firebase.enableLogging(true,true);

myFirebaseRef.set({
  title: "Hello 2324323423",
  author: "Firebase",
  location: {
    city: "San Francisco",
    state: "California",
    zip: 94103
  }
});

var lastScanTime = new Date().getTime();

scanVideos();

// On some pages, YouTube adds thumbnails as you scroll down the page,
// so this waits for scroll events and starts the scan for new video thumbnails.
// (it's a bit lazy, and something I want to change later)
window.onscroll = function() {
    var timeNow = new Date().getTime();
    var timeDiff = timeNow - lastScanTime;
    if (timeDiff >= 1000) {
        scanVideos();
    }
};

// Detecting YouTube's SPF processes, which redraw pages without reloading
document.addEventListener("spfprocess", scanVideos);
document.addEventListener("spfdone", scanVideos);

// Detecting Load More button animation
var feedContainer = $(".feed-container, #body-container, #watch-related");
if (feedContainer) { buttonListen(); }
function buttonListen(feedContainer) {
    $("#body-container, .feed-container, #watch-related, .grid-lockups-container").bind("animationstart webkitAnimationStart oAnimationStart MSAnimationStart", function(){ scanVideos();});
    $("#body-container, .feed-container, #watch-related, .grid-lockups-container").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){ scanVideos();});
}

function scanVideos() {
    lastScanTime = new Date().getTime();
    // makes a list of video links which are not in the ".scanned" class yet. Once they are scanned, they will be added to it.
    var videoList = document.querySelectorAll('a.yt-uix-sessionlink[href^="/watch"] > .yt-thumb:not(.scanned):not(.gettingData), a.yt-uix-sessionlink[href^="/watch"] > .yt-uix-simple-thumb-wrap:not(.scanned):not(.gettingData)') ;
    var wallList = document.querySelectorAll('a.videowall-still[href*="/watch"]:not(.scanned):not(.gettingData)');
    if (videoList.length > 0) {
        for ( var i = 0; i < videoList.length; i++ ) {
            // searches for the video id number which we'll use to poll YouTube for ratings information
            var videoId = videoList[i].parentNode.getAttribute("href").replace(/.*[v|s]=([^&%]*).*/, "$1");
            getGdata(videoList[i],videoId);
        }
    }
    // Similar procedure for the post-playback video wall.
    if (wallList.length > 0) {
        for ( var j = 0; j < wallList.length; j++ ) {
            var wallId = wallList[j].getAttribute("href").replace(/.*[v|s]=([^&%]*).*/, "$1");
            wallList[j].classList.add('scanned');
            var wallCont = document.createElement('div');
            wallCont.classList.add('wallCont');
            wallCont = wallList[j].appendChild(wallCont);
            getGdata(wallCont,wallId);
        }
    }
}

function getGdata(node,videoId) {
    if ( !node.classList.contains("gettingData") ) {
        node.classList.add('gettingData');
        setTimeout(function(){node.classList.toggle("gettingData");},1000);
        GM_xmlhttpRequest({
            method: 'GET',
            url: "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&key=AIzaSyBbU7SUrqWYiZPaYIt6fIeMGC5R8rpf02U&part=snippet,statistics&fields=items/statistics,items/snippet/publishedAt",
            onload: function(response) {
                if (response.status === 200) {
                    //var rsp = eval( '(' + response.responseText + ')' ); // if you know a way to do this without eval, let me know
                    var rsp = JSON.parse(response.responseText); // if you know a way to do this without eval, let me know
                    if (rsp && rsp.items[0] && rsp.items[0].snippet && rsp.items[0].statistics) {
                        var daysAgo = (lastScanTime - new Date(rsp.items[0].snippet.publishedAt).getTime())/1000/60/60/24;
                        var views = parseInt(rsp.items[0].statistics.viewCount, 10);
                        var likes = parseInt(rsp.items[0].statistics.likeCount, 10);
                        var dislikes = parseInt(rsp.items[0].statistics.dislikeCount, 10);
                        if (isNaN(likes) || isNaN(dislikes)) {
                            views = 0;
                            likes = 0;
                            dislikes = 0;
                        }
                        makeBar(node, daysAgo, views, likes, dislikes);
                    }
                }
            }
        });
    }
}

// reformat long numbers for textBar [10,394,235 = "10.4m"]
var pow=Math.pow, floor=Math.floor, abs=Math.abs, log=Math.log;
function round(n, precision) {
    var prec = Math.pow(10, precision);
    return Math.round(n*prec)/prec;
}
function format(n) {
    var base = floor(log(abs(n))/log(1000));
    var suffix = 'kmb'[base-1];
    return suffix ? round(n/pow(1000,base),1)+suffix : ''+n;
}

// the ratings bar is made up of differently colored divs stacked on top of each other
function makeBar(node, daysAgo, views, likes, dislikes) {
    var container = document.createElement('div');
    container.classList.add('ratingsBar');
    var barMsg = "";
    var pausedMsg = "";
    var pausedBar = false;
    var totalVotes = likes + dislikes;
    if (dislikes > 0) {
        var dislikesBar = document.createElement('div');
        dislikesBar.classList.add('dislikesBar');
        container.appendChild(dislikesBar);
    }
    // Checks to see if there are more votes than views, which would mean the view count is wrong.
    // We do this because we need an accurate view count to calculate the Power Meter.
    // The green/yellow 'pausedBar' lets the user know that we can't make one yet, but at least the likesBar/red ratings bar is still available
    if (totalVotes > views) {
        if (likes > 0) {
            pausedBar = document.createElement('div');
            pausedBar.classList.add('pausedBar');
            pausedBar.setAttribute("style","width:"+ (100 * likes / totalVotes) +"%;");
            container.appendChild(pausedBar);
        }
        pausedMsg = '<span class="powerScore"><i>&nbsp;View Count Error&nbsp;</i></span>';
    }
    else {
        powerMeterScore = powerMeter(views, likes, dislikes);
        if (likes > 0) {
            var likesBar = document.createElement('div');
            likesBar.classList.add('likesBar');
            likesBar.setAttribute("style","width:"+(100 * likes / totalVotes)+"%;");
            container.appendChild(likesBar);
        }
       // shadingBar gives the ratings bar a 3D look when hovered
       var shadingBar = document.createElement('div');
        if ((likes + dislikes) > 0) { shadingBar.classList.add('shadingBar'); }
       container.appendChild(shadingBar);
        if ((100 * likes / totalVotes) < powerMeterScore) {
            var hatesBar = document.createElement('div');
            hatesBar.classList.add('hatesBar');
            hatesBar.setAttribute("style","width:"+(powerMeterScore - (100 * likes / totalVotes))+"%; margin-left: "+(100 * likes / totalVotes)+"%;");
            container.appendChild(hatesBar);
        } 
        if (powerMeterScore >= 0.0455) {
            var powerBar = document.createElement('div');
            powerBar.classList.add('powerBar');
            if ((100 * likes / totalVotes) > powerMeterScore) {
                powerBar.style.width = powerMeterScore+"%";
            }
            else {
                powerBar.style.width = ((100 * likes / totalVotes))+"%";
            }
            barMsg = '<span class="powerScore">&nbsp;<span style="color:#99ddff">'+ Math.round(powerMeterScore*10)/10 +'</span>&nbsp;</span>';
            container.appendChild(powerBar);
        }
    }
    if (likes > 0 || dislikes > 0) {
      var textContainer = document.createElement('span');
      textContainer.classList.add('textContainer');
      if (((likes + dislikes) > 0) && (powerMeterScore < 0.0455 || pausedBar)) {textContainer.classList.add('short');}
      var textBar = document.createElement('span');
      textBar.classList.add('textBar');
      textBar.innerHTML = barMsg+pausedMsg +'<span class="ratingsScore">&nbsp;<span class="likesScore">+'+ format(likes) +'&nbsp;</span>/<span class="dislikesScore">&nbsp;-'+ format(dislikes) +'</span></span>';
      textContainer.appendChild(textBar);
      container.appendChild(textContainer);
    }
    if ( !node.classList.contains("scanned") ) {
        node.insertBefore(container,node.childNodes[2]);
        node.classList.add('scanned');
    }
}

// trade secrets
function powerMeter(view1, likes, dislikes) {
    var viewLikeRatio;
    var views = view1 - dislikes;
    if (views < 2000) {
        var viewLikeRatio2k = Math.round( (views + views * ((3000-views)/2000)) / (likes) );
        if (views < 255) {
            viewLikeRatio = Math.round( viewLikeRatio2k / (views/255) );
        } 
        else {
            viewLikeRatio = viewLikeRatio2k;
        }
    }
    else {
        viewLikeRatio = Math.round( (views+7000) / 3 / (likes) );
    }
    if ((viewLikeRatio < 1) || (viewLikeRatio > 255)) {
        return 0;
    }
    var powerMeterScore = Math.round(Math.pow(((255-viewLikeRatio)/2.55), 3)) / 10000;
    return powerMeterScore;
}
