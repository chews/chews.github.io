// ==UserScript==
// @name        notokay-dataupdater
// @description gets data from the not okay site.
// @version     2016.10.24
// @author      chews
// @license     none
// @icon        http://i.imgur.com/ZfKR597.png
// @include     http://*.tribute.co/*
// @include     http://tribute.com/*
// @include     https://*.tribute.co/*
// @include     https://tribute.co/*
// @connect     googleapis.com
// @connect     firebase.com
// @connect     firebaseIO.com
// @connect     *
// @grant       GM_xmlhttpRequest
// @grant       GM_notification
// @grant       GM_setClipboard
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
// @require     https://www.gstatic.com/firebasejs/3.5.0/firebase.js
// @updateURL   https://chews.github.io/notokay.user.js
// ==/UserScript==



function updateData(){
  console.log("updateing data");
	if ($('.activity-date').length > 0){
		firebase.database().ref('datapoints').set('').then( function(){
			$('.activity-date').each( function(index, element){
				if (element.parentNode.children[1].innerText)
				if (index < $('.activity-date').length-1){
					firebase.database().ref('datapoints').push({"name":element.parentNode.children[1].innerText.replace("New Video from ",""),"timecode":element.innerText}).then(console.log("added record"))
				}
			});
		});
	}
}

function init_page(){
	if (window.location.href.indexOf("7ff0ad4d251d4a559aa8077d87a4d52f") ==-1){
		console.log("on tribute but not correct page");
		return; // exit early on the wrong page.
	}
	console.log("on tribute correct page!!!!!!");
	var config = { 
    	databaseURL: "https://notokay-3e6a5.firebaseio.com"
	};
	firebase.initializeApp(config);
	setTimeout(function(){updateData()},3000);
	setTimeout(function(){window.location.reload();},5*60*1000)
}

init_page();
