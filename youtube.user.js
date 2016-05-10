// ==UserScript==
// @name        Youtube Snipertool
// @description Highlights the most worthwhile videos on YouTube. In addition to a ratings bar, there's also a blue "Power Meter" which measures people's enthusiasm for videos.
// @version     2016.04.02
// @author      chews
// @license     none
// @icon        http://i.imgur.com/ZfKR597.png
// @include     http://*.youtube.com/*
// @include     http://youtube.com/*
// @include     https://*.youtube.com/*
// @include     https://youtube.com/*
// @connect     googleapis.com
// @connect     firebase.com
// @connect     firebaseIO.com
// @connect     *
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_notification
// @grant       GM_setClipboard
// @namespace   https://openuserjs.org/users/lednerg
// @require     http://code.jquery.com/jquery-1.11.1.min.js
// @require     https://cdn.firebase.com/js/client/2.4.2/firebase.js
// ==/UserScript==


var FIREBASE_URL = "n01";
//var GOOGLE_API_KEY = "AIzaSyBbU7SUrqWYiZPaYIt6fIeMGC5R8rpf02U";
var GOOGLE_API_KEY = "AIzaSyBw1ecqBONqO4y8L9nRK0vBByMliYJHhto";

var myFirebaseRef = new Firebase('https://n01.firebaseio.com/');
Firebase.INTERNAL.forceWebSockets();
//Firebase.enableLogging(true,true);


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
"   height: 8px; "+
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
var report_results = false; // whether or not to report total views on page
var total_veiws_on_page = 0;
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
document.addEventListener("spfprocess", pageChange);
document.addEventListener("spfdone", pageChange);

function pageChange(){
    total_veiws_on_page = 0;
    if (window.location.href.indexOf('/watch') !== -1) {
        console.log('on watch page');
        setTimeout(watchpage,1500);
    } 
    if (window.location.href.indexOf('results?search_query') == -1) {
        console.log('on normal page');
        scanVideos();
    } else {
        console.log('on Search page');
        report_results = true;
        scanVideos();
    }
}

// Detecting Load More button animation
var feedContainer = $(".feed-container, #body-container, #watch-related");
if (feedContainer) { buttonListen(); }
function buttonListen(feedContainer) {
    $("#body-container, .feed-container, #watch-related, .grid-lockups-container").bind("animationstart webkitAnimationStart oAnimationStart MSAnimationStart", function(){ scanVideos();});
    $("#body-container, .feed-container, #watch-related, .grid-lockups-container").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){ scanVideos();});
}

function watchpage(){
    console.log("WATCHPAGE");
    if (jQuery("#n01-header").length === 0)
    {
        jQuery("#watch-header").after("<div id='n01-header' class='yt-card yt-card-has-padding'><p>ucid:<input id='#ucid' type='text' style='width:300px;' onfocus='this.select()' readonly='readonly' value='"+ytplayer.config.args.ucid+"'></p>  <p>ptk:<input id='#ptk' type='text' style='width:300px;' onfocus='this.select()' readonly='readonly' value='"+ytplayer.config.args.ptk+"'></p>   <p>oid:<input id='#oid' type='text' style='width:300px;' onfocus='this.select()' readonly='readonly' value='"+ytplayer.config.args.oid+"'></p>   <p>keywords:"+ytplayer.config.args.keywords+"</p><p>in buytool:</p></div>");
        jQuery("#action-panel-overflow-button").click();
        jQuery("button[data-trigger-for='action-panel-stats']").click();
        jQuery('.watch-action-panels').css('display','block');
        jQuery('.watch-action-panels').height(393);
        jQuery("button[data-mode-css='stats-mode-daily']").click();
    }
}


function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}


function scanVideos() {
    if(window.top !== window.self) return; // bail if not top frame.
    lastScanTime = new Date().getTime();
    //console.log('scanningvideos');
    // makes a list of video links which are not in the ".scanned" class yet. Once they are scanned, they will be added to it.
    var videoList = document.querySelectorAll('a.yt-uix-sessionlink[href^="/watch"] > .yt-thumb:not(.scanned):not(.gettingData), a.yt-uix-sessionlink[href^="/watch"] > .yt-uix-simple-thumb-wrap:not(.scanned):not(.gettingData)') ;
    var wallList = document.querySelectorAll('a.videowall-still[href*="/watch"]:not(.scanned):not(.gettingData)');
    if (videoList.length > 0) {
        //console.log('got video list');
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

function displayNotice(){
    //GM_notification("Total Views for Search:"+format(total_veiws_on_page));
    //total_veiws_on_page = 0;
}

function getGdata(node,videoId) {
    if ( !node.classList.contains("gettingData") ) {
        node.classList.add('gettingData');
        setTimeout(function(){node.classList.toggle("gettingData");},1000);

        GM_xmlhttpRequest({
            method: 'GET',
            url: "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&key="+GOOGLE_API_KEY+"&part=snippet,statistics,topicDetails&fields=items/statistics,items/snippet/publishedAt,items/topicDetails",
            onload: function(response) {
                if (response.status === 200) {
                    //var rsp = eval( '(' + response.responseText + ')' ); // if you know a way to do this without eval, let me know
                    var rsp = JSON.parse(response.responseText); // if you know a way to do this without eval, let me know
                    if (rsp && rsp.items[0] && rsp.items[0].snippet && rsp.items[0].statistics) {
                        var daysAgo = (lastScanTime - new Date(rsp.items[0].snippet.publishedAt).getTime())/1000/60/60/24;
                        var views = parseInt(rsp.items[0].statistics.viewCount, 10);
                        var likes = parseInt(rsp.items[0].statistics.likeCount, 10);
                        var dislikes = parseInt(rsp.items[0].statistics.dislikeCount, 10);
                        //console.log(rsp.items[0]);
                        if (isNaN(likes) || isNaN(dislikes)) {
                            views = 0;
                            likes = 0;
                            dislikes = 0;
                        }
                        total_veiws_on_page = total_veiws_on_page+views;
                        if (jQuery('.num-results').length > 0 && jQuery('.total_veiws_on_page').length ==0 ) {
                            jQuery('.num-results').append("<br><p class='total_veiws_on_page'>total views:"+total_veiws_on_page+"</p>");

                        } else{
                            if (jQuery('.total_veiws_on_page').length == 1){
                                jQuery('.total_veiws_on_page').text("total views on page:"+format(total_veiws_on_page)); 
                            }
                        }

                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: "https://www.youtube.com/watch?v=" + videoId,
                            onload: function(response) {
                                if (response.status === 200) {
                                    var ptkreg = /\"ptk\" *: *\"([a-zA-Z0-9_-]+((.[a-zA-Z0-9_-]+)*))\"/ig;
                                    var ptkrsp = ptkreg.exec(response.responseText);
                                    var ucidreg = /\"ucid\" *: *\"([a-zA-Z0-9_-]+((.[a-zA-Z0-9_-]+)*))\"/ig;
                                    var ucidrsp = ucidreg.exec(response.responseText);
                                    var ptk = 853853853;
                                    try {
                                        ptk = ptkrsp[1];
                                    } catch(e) {
                                        //do nothing
                                    }
                                    try {
                                        if (ucidrsp[1].indexOf(ptkrsp[1]) !== -1){
                                            ptk = "youtube_self";
                                        }
                                    } catch(e){
                                        //do nothing
                                    }

                                    json2save = {
                                        views: views,
                                        likes: likes,
                                        dislikes: dislikes,
                                        ptk:ptk
                                    };
                                    var myFirebaseRef = new Firebase('https://n01.firebaseio.com/videos/'+videoId);
                                    myFirebaseRef.set(json2save);
                                    makeBar(node, daysAgo, views, likes, dislikes, ptk);
                                }
                            }
                        });


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
function makeBar(node, daysAgo, views, likes, dislikes, ptk) {
    var container = document.createElement('div');
    container.classList.add('ratingsBar');
    var barMsg = "";
    var pausedMsg = ptk;
    var pausedBar = false;
    var totalVotes = likes + dislikes;
    var dislikesBar = document.createElement('div');
    if (dislikes > 0) {
        dislikesBar.setAttribute("style","width:100%;");
        container.appendChild(dislikesBar);
    }
    switch(ptk){
        case "youtube_none":
        var bartype = 'likesBar';
        break;
        case "youtube_self":
        var bartype = 'pausedBar';
        break;
        default:
        var bartype = 'dislikesBar';
        break;
    }
    dislikesBar.classList.add(bartype);

    if (likes > 0 || dislikes > 0) {
      var textContainer = document.createElement('span');
      textContainer.classList.add('textContainer');
      //if (((likes + dislikes) > 0) && (powerMeterScore < 0.0455 || pausedBar)) {textContainer.classList.add('short');}
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
