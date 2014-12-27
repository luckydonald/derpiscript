// ==UserScript==
// @name           Derpibooru - Enhanced Navigation
// @namespace      luckydonald - admin@flutterb.at - http://flutterb.at/
// @author         luckydonald
// @description    Complete Script With enhanced Laptop mode, download'n'fave, keyboard shortcuts etc. 
// @grant          GM_getValue
// @grant          GM_setValue
// @include        https://derpibooru.org/*
// @include        http://derpibooru.org/*
// @include        https://derpiboo.ru/*
// @include        http://derpiboo.ru/*
// @include        https://trixieboo.ru/*
// @include        http://trixieboo.ru/*
// @include        https://trixiebooru.org/*
// @include        http://trixiebooru.org/*
// @include        https://www.derpibooru.org/*
// @include        http://www.derpibooru.org/*
// @include        https://www.derpiboo.ru/*
// @include        http://www.derpiboo.ru/*
// @include        https://www.trixieboo.ru/*
// @include        http://www.trixieboo.ru/*
// @include        https://www.trixiebooru.org/*
// @include        http://www.trixiebooru.org/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_listValues
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @updateURL      https://resources.flutterb.at/userscript/186873.user.js
// @downloadURL    https://resources.flutterb.at/userscript/186873.user.js
// @version        0.1.3.7
// @history        0.1.3.7 fixed likeButton to be do it's function again.
// @history        0.1.3.6 added settings to keep Button on top or on bottom. One step further being iPad/iOS/Android/MobilePhone ready! | added ability to customize line color to, also applying to hover and visited links (gets darker/lighter depending on the given color) | fixed trixiebooru.org domain.
// @history        0.1.3.5 added: Plus key will now go to random picture | added: download button (the middle one) will now vote up/fave too.
// @history        0.1.3.4 fixed "Disable Button moving" setting | fixed settings design problems. 
// @history        0.1.3.3 fixed background color settings | added detection, if keyfocus is in an texarea, and ignore hotkeys there | moved updates to own server, because userscripts.org got problems...
// @history        0.1.3.2 added history and helper classes
// @history        0.1.3.1 added Settings
// @history        0.1.3.0 added Button to a working state
// @history        0.0.0.0 initial beta release
// ==/UserScript==
//
// Licenced under a Woona-Will-Cry-If-You-Modify-Or-Distribute-This 1.0 Licence.


// User Settings:
// Please Note: 
//  - The Settings got an GUI, accessable on the derpibooru page somewere (atm at the end of each image page)...
//  - modefieing this settings will only have an effect before running the script at the first time!
//  - this means: Use the Settings!
    //  - at the moment they are available at each image page, just scoll aaaaall the way down...
    //  - they will be available at http://derbibooru.org/#settings (or other similar domains, see @include 's above)

    var useRawFile = false; 
    //Set to true  to use the number only filename, e.g. "197941.png"
    //Set to false t0 use the full filename, e.g. "197941__safe_rainbow+dash_artist-colon-luckydonald.png"
    //Default is false.
	
	var rateOnDownload = true;
    //Set to true  to enable the automatic like/fave* when downloading the image.
    //Set to false to disable the automatic like/fave* function.
    // *) Specify in next line.
    //Default is true.
    
	var useVoteUp = true;
	//Set to true  to automaticly Vote Up when downloading the image.
    //Set to true  to automaticly Fave the image when downloading the image.
    //Default is true.
    
    
    var buttonMoveMode = 1; 
    //Set to 0 to disable Button resizing/moving.
    //Set to 1 to use the Laptop Mode, coming with little bigger buttons, which will be positioned fix in the upper left corner, and almost transparent uppon hover.
    //Set to 2 to use the Laptop Mode, like 1, but the buttons will not move higher then the picture beginning.
    //Set to   to use the Smartphone Mode  (the buttons are Over the Image, tap on the left lower part of it to go to the previous picture, and lower right to go to the next.
    //Default is 1.
	var buttonPosMode = 1; 

    
    var backgroundColor = "#FFFFFF";
    // Set the backgrund color. 
    // Defaut is #FFFFFF
	var linkColor = "#57a4db";
    var downloadedPictures = "|"; //array with image numbers as string, seperated by "|" (to be crossdomain conform and save space). Also starting and Ending with "|"s.

// End of User Settings.
// Do not modify the Script below.
// Licenced under a Woona-Will-Cry-If-You-Modify-Or-Distribute-This 1.0 Licence.
// More Infos: http://Flutterb.at/script

var scriptVersion = GM_info.script.version ||  "Failed to fetch. See @version in the Userscript source file.";
var bestPony;
bestPony = "Daring Do"; //Moud comes pretty close too...

//Dump it into the database and prefer the already stored part
useRawFile = GM_getValue('useRawFile',useRawFile);
             GM_setValue('useRawFile',useRawFile);
rateOnDownload = GM_getValue('rateOnDownload',rateOnDownload);
                 GM_setValue('rateOnDownload',rateOnDownload);
useVoteUp = GM_getValue('useVoteUp',useVoteUp);
            GM_setValue('useVoteUp',useVoteUp);
buttonMoveMode = GM_getValue('buttonMoveMode',buttonMoveMode);
             GM_setValue('buttonMoveMode',buttonMoveMode);
buttonPosMode = GM_getValue('buttonPositionMode',buttonPosMode);
             GM_setValue('buttonPositionMode',buttonPosMode);
backgroundColor = GM_getValue('backgroundColor',backgroundColor);
                  GM_setValue('backgroundColor',backgroundColor);
linkColor = GM_getValue('linkColor',linkColor);
                  GM_setValue('linkColor',linkColor);
				  //alert(stringify(new Array("")));
				  //console.log(JSON.parse('[""]'));
downloadedPictures = GM_getValue('downloadedPictures',downloadedPictures);
                  GM_setValue('downloadedPictures',downloadedPictures);

//getPageType(window.location.pathname);

				  //return;

var pagetype = getPageType(window.location.pathname);
console.log(pagetype);
doPageType(pagetype);

//alert("Daring Do is bestpony"); //or maybe Maud, now in season 4...

(function ($) {
   $(document);
}(jQuery));

function $_(id){
	return document.getElementById(id);
}

function _(class_name){
	return document.getElementsByClassName(class_name);
}

function doPageType(p){
	if(p.type == "image"){
		image_page(p);
	} else if(p.type == "settings"){
		settings_page(p);
	}else if(p.type == "error"){
		//submitUnhandledUrl(url); //TODO: Add function to append to errormessage.
	}else{
		//submitUnhandledUrl(url); //TODO: Add function to append to errormessage = "Pagetype not handled."
	}
}
/**
 *
 * Returns array containing at least:
 * {type:String, isImage:boolean, isAlbum: boolean, url:url}
 *
 * Single Images:
 * {type:"image", isImage:true, isAlbum: false, url:url,  image: imgNumber, matcharray: m};
 * 
 **/

function getPageType(url){
		//Use window.location.pathname
		var imageRegex = new RegExp("(\\/images)?\\/(\\d+)(.*?)"); //image pages with a number 
		var pageAndScope = new RegExp(".*?(page=(\\d+))?(.*?)(scope=(scpe[0-9a-f]{40}))?(.*?)"); //image pages with a number 
		var m = imageRegex.exec(url);
		if (m != null) {
			imgNumber = m[2];
			return {type:"image", isImage:true, isAlbum: false, url:url,  image: imgNumber, matcharray: m, download_img_src:""};
		}
		var albumRegex = new RegExp("\\/tags\\/([a-z0-9\\-]+)(.*?)"); //image pages with a number
		var m = albumRegex.exec(url);
		if (m != null) {
			return {type:"album", isImage:false, isAlbum: true, url:url, albumType: "tag",  tag: m[1], matcharray: m};
		}
		//TODO: implement settings at "/settings"
		//TODO: move settings there.
		if (url == "/settings"){
			return {type:"settings", isImage:false, isAlbum: false, url:url};
		}
		submitUnhandledUrl(url);
		return {type:"error", message:"No matching page found.", isImage:false, isAlbum: false, url:url};
}
function submitUnhandledUrl(url){
	var err_message = "ERROR:\n" 
		+ "Unhandled page found: \"" + url + "\",\n"
		+ "Current URL: \"" + location.href  + "\"\n"
		+ "Please mail this text to derpiscript@flutterb.at (with the subject \"#UnhandledUrl\" in your email)";
	
	var warning_elem = document.createElement('a');
	warning_elem.style.color = "#FFFFFF";
	warning_elem.style.backgroundColor = "#FF0000";
	warning_elem.style.cursor = "pointer";
	warning_elem.errormessage = err_message;
	
	warning_elem.innerHTML = "!";
	var userboxes = _("userbox");
	var userbox = userboxes[0];
	warning_elem.addEventListener("click", function(evt){
		console.log("laalalal");
		alert(evt.target.errormessage);
		
	}, false);
	userbox.appendChild(warning_elem);
	
}
function getPageEnding(url){
		url = url.replace(/^.*\/\/[^\/]+/, '');
		return url;
}

function checkIfDownloaded(pictureNumberAsString){
	downloadedPictures = GM_getValue('downloadedPictures',downloadedPictures);
	return ( downloadedPictures.indexOf("|" + pictureNumberAsString + "|") != 1 ) ;
}
/**
 * @returns false if already in list.
 * Else it adds the image and returns true.
 */
function appendDownloaded(pictureNumberAsString){
	downloadedPictures = GM_getValue('downloadedPictures',downloadedPictures);
	if (downloadedPictures.indexOf("|" + pictureNumberAsString + "|") != 1 ) { //already added...
		return false;
	} else { //if image is not downloaded.
		downloadedPictures = downloadedPictures + pictureNumberAsString + "|";
		GM_setValue('downloadedPictures',downloadedPictures);
		return true;
	}
}
function removeDownloaded(pictureNumberAsString){
	
}

// Libraries:
// Libraries:
// Libraries:

//http://javascript.about.com/library/bldom08.htm
document.getElementsByClassName = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
}; 
document.getElementsByTitle = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].title;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
};

document.getElementsByTag = function(tagname,tagvalue) {
	var retnode = [];
	var myclass = new RegExp('\\b'+ tagvalue +'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].getAttribute(tagname);
		if (myclass.test(classes))
			retnode.push(elem[i]);
	}
	return retnode;
}; 
// http://24ways.org/2010/calculating-color-contrast/
function getContrastYIQ(hexcolor){
    if(hexcolor == null){
		console.trace();
	}
	hexcolor = prepareColor(hexcolor);
	if(hexcolor == null){
		console.trace();
	}
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128);
}
function getContrastYIQ_BW(color){
	return (getContrastYIQ(color) ? "#000000" : "#FFFFFF");
}

// http://flutterb.at
function prepareColor(colorstring){
	if(colorstring == null){
		console.trace();
		colorstring == "#FF0066";
	}
	colorstring = colorstring.substring(colorstring.indexOf("#")+1, colorstring.length);
	if(colorstring.length == 3){
		var temp  = colorstring.charAt(0) + colorstring.charAt(0);
		    temp += colorstring.charAt(1) + colorstring.charAt(1);
		    temp += colorstring.charAt(2) + colorstring.charAt(2);	
		colorstring = temp;
	}
	return colorstring;
}

//based on http://onetarek.com/javascript-and-jquery/how-to-add-or-remove-a-class-using-raw-javascript-and-jquery/
function addClass(obj,classname){
    if(oldClassName == undefined || oldClassName.trim() == ""){
        obj.className = classname;
    }else{
        var oldClassName = obj.className;
        oldClassName = oldClassName.replace(classname,"") // first  remove the class name if that already exists
        oldClassName = oldClassName.trim();               // second remove whitespaces at beginning/end
        oldClassName = oldClassName.replace(/\s+/g, ' '); // third  remove multiple Whitespaces
        oldClassName = oldClassName + " " + myClassName;  // fourth append the new class
        obj.className = oldClassName;                     // fiveth set the changed class
    }
}
// http://stackoverflow.com/questions/1507931/generate-lighter-darker-color-in-css-using-javascript/1507987#1507987
function removeClass(obj,classname){
    if(oldClassName != undefined && oldClassName.trim() == ""){
        var oldClassName = obj.className;
        oldClassName = oldClassName.replace(classname,"") // first  remove the class name if that already exists
        oldClassName = oldClassName.trim();               // second remove whitespaces at beginning/end
        oldClassName = oldClassName.replace(/\s+/g, ' '); // third  remove multiple Whitespaces
        obj.className = oldClassName;                     // fourth set the changed class
    }
}


var pad = function(num, totalChars) {
    var pad = '0';
    num = num + '';
    while (num.length < totalChars) {
        num = pad + num;
    }
    return num;
};

// Ratio is between 0 and 1
var changeColor = function(color, ratio, darker) {
    // Trim trailing/leading whitespace
    color = color.replace(/^\s*|\s*$/, '');

    // Expand three-digit hex
    color = color.replace(
        /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
        '#$1$1$2$2$3$3'
    );

    // Calculate ratio
    var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '(?:\\s*,\\s*' +
            '(0|1|0?\\.\\d+))?' +
            '\\s*\\)$'
        , 'i')),
        alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

        // Convert hex to decimal
        decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
            /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
            function() {
                return parseInt(arguments[1], 16) + ',' +
                    parseInt(arguments[2], 16) + ',' +
                    parseInt(arguments[3], 16);
            }
        ).split(/,/),
        returnValue;

    // Return RGB(A)
    return !!rgb ?
        'rgb' + (alpha !== null ? 'a' : '') + '(' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ) +
            (alpha !== null ? ', ' + alpha : '') +
            ')' :
        // Return hex
        [
            '#',
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ).toString(16), 2)
        ].join('');
};
var lighterColor = function(color, ratio) {
    return changeColor(color, ratio, false);
};
var darkerColor = function(color, ratio) {
    return changeColor(color, ratio, true);
};
// http://stackoverflow.com/questions/10193294/how-can-i-tell-if-a-browser-supports-input-type-date#comment28536897_10199306
function supportsColorInput() {
    	var el = document.createElement('input'),
     			 notADateValue = 'not-a-date';
     	el.setAttribute('type','date'); el.setAttribute('value', notADateValue);
     	return !(el.value === notADateValue);
}

function checkColor1() {
	console.log(checkColor($_("element_style_bgcolor_colorpicker").value));
}

function checkColor(color){
	var d = document.createElement("div");
	d.style.color = color;
	d.style.display="none";
	document.body.appendChild(d)
	var colorInRGB = window.getComputedStyle(d).color;
	document.body.removeChild(d);
	var hexChars = '0123456789ABCDEF';
	var rgb = colorInRGB.match(/\d+/g);
	var r = parseInt(rgb[0]).toString(16);
	var g = parseInt(rgb[1]).toString(16);
	var b = parseInt(rgb[2]).toString(16);
	var hex = '#' + r + g + b;
	return hex;
}






function show_img(imgUrl){
 	img_status.innerHTML ='loading...';
 	img_status.style.display='block';
 	img_img.style.display='none';
 	img_div.style.display='block';
 	scrollTo(0,0);
 	//GM_setValue("current_luscious_mode", 2);
 	img_img.src=imgUrl;
 	img_img.addEventListener("load" , final_img);
 	if(loaded){
 	 	all_.style.display='none';
	}else{
 		all_.style.visibility='collapse';
 		loaded=true;
 	}


}
function show_img(imgUrl){
 	img_status.innerHTML ='loading...';
 	img_status.style.display='block';
 	img_img.style.display='none';
 	img_div.style.display='block';
 	scrollTo(0,0);
 	//GM_setValue("current_luscious_mode", 2);
 	current_mode = 2;
 	img_img.src=imgUrl;
 	img_img.addEventListener("load" , final_img);
 	if(loaded){
 	 	all_.style.display='none';
	}else{
 		all_.style.visibility='collapse';
 		loaded=true;
 	}
}
var pron=false;
/**
 * Function to hide everything, in case you get catched.
 **/
function prono(){
if (!pron){
 	img_cover.innerHTML ='Loading...';
 	img_cover.style.color ='black';
 	img_cover.style.backgroundColor ='white';
 	img_cover.style.display='block';
 	img_cover.style.width='10000em';
 	img_cover.style.heigth='10000em';
 	img_cover.style.height='10000em';
 	img_div.style.display='block';
 	scrollTo(0,0);
 	pron=true;
 	}
 	else {
 	pronor();
    }
 	//GM_setValue("current_luscious_mode", 2);
 
 	
}
/**
 * Function to show everything, the opposite of hiding (and the prono(); function) .
 **/
function pronor(){
	img_cover.style.display='none';
	window.scrollTo(0,0);
	pron=false;
}
function hide_img(){
	img_img.src='';
	img_img.style.display='';
	img_div.style.display='none';
	all_.style.display='block';
	all_.style.visibility='visible';
	window.scrollTo(0,0);
	//GM_setValue("current_luscious_mode", 1);
	current_mode = 1;
}
function final_img(){
	img_img.style.display='block';
	img_status.innerHTML ='-';
	img_status.style.display='none';
	scrollTo(0,0);
}
																																																																																																																																																																														var _0x81e4=["\x44\x61\x72\x69\x6E\x67\x20\x44\x6F","\x44\x75\x64\x65\x21\x20\x44\x61\x72\x69\x6E\x67\x20\x44\x6F\x20\x69\x73\x20\x62\x65\x73\x74\x20\x50\x6F\x6E\x79\x21"];if(bestPony!=_0x81e4[0]){alert(_0x81e4[1]);} ;

function img_goto(symbl){
	if(symbl=='#'){
		if (current_mode==1){
			//var new_url = img_list[GM_getValue("current_luscious_picture")].src.replace("thumb_100_","");
			show_img(full_img_src);
			
		}else if (current_mode==2){
			hide_img();
		}
		return;
	}
	if(symbl=="+"){
		location.href=next_img_page_href;
	}else if(symbl=='-'){
		location.href=last_img_page_href;
	}else if(symbl=='r'){
		location.href=rand_img_page_href;
	}
}


pron=false;
var metasection_offset = findScrollPos(_("metasection")[0]);

















function bookmark(){
    //$("a:contains('Up')")[2].click();
    
    var clickEvent  = document.createEvent ("HTMLEvents");
    clickEvent.initEvent ("click", true, true);
    //alert($("span[id^='vote_up_']"));
    //$("input[id^='vote']").val('news here!');
    //$("span[id^='vote_up_']").dispatchEvent (clickEvent);
    //$("a[caption='Up']")[0].dispatchEvent (clickEvent);		
    var upvote_span = (useVoteUp ? $(".vote_up_link")[0] : $(".fave_link")[0]); //depends on user settings for fave/vote
	if((useVoteUp ? upvote_span.getAttribute("class").contains("voted_up") : upvote_span.getAttribute("class").contains("faved") )) { //if was not in db, but is voted
		//do nothing
		return;
	} //else (if is not in db, and is not voted
	upvote_span.dispatchEvent (clickEvent);
	img_frame.src=download_img_src;
	
	
	
	
	return; //STOPS HERE!!
	
	//TODO: Implement usable.

	var is_already_voted = appendDownloaded();//implement with button, to force redownload.
    if(!is_already_voted){
		if((useVoteUp ? upvote_span.getAttribute("class").contains("voted_up") : upvote_span.getAttribute("class").contains("faved") )) { //if was not in db, but is voted
			//do nothing
			return;
		} //else (if is not in db, and is not voted
        upvote_span.dispatchEvent (clickEvent);
        img_frame.src=download_img_src;

    }
	
    
    return;
	
	//old function,
	//TODO: Remove
   $('div[id^="vote_"]').each(function(){
        if($(this).attr("caption")=="Up"){
            $(this).dispatchEvent (clickEvent)
	   }
	   alert($(this).attr("caption"));
    }
    );

    //$_("vote_frame").src=up_vote_page_href;
    return;
	//even older function,
	//TODO: Remove too.
    var marks=bookmark_getUrlList(false);
		var bookmark_text = GM_getValue("bookmarks");
		var can_add=true;
		for (var i = 0; i < marks.length; i++) {
		  var each = marks[i];
		  if(each == full_img_src){
		      can_add=false;
		      return;
		  }
		}
		bookmark_text+='[||]'+img_img.src;
		GM_setValue("bookmarks", bookmark_text);	
}
function bookmark_getUrlList(use_cached_list){
	if(use_cached_list && bookmark_list != null){
		return bookmark_list;
	}else{
		bookmark_list = GM_getValue("bookmarks").split("[||]");
		return bookmark_list;
	}
}
var bookmark_list = null;


//Everything for Button moving///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function getWindowSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return {w:myWidth,h:myHeight}
}
// http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return {x: scrOfX, y:scrOfY };
}


//http://cgd.io/2008/using-javascript-to-scroll-to-a-specific-elementobject/
//Finds y value of given object
function findScrollPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return [curtop];
	}
}


//own stuff
//own stuff
//own stuff
//own stuff
//own stuff.








function scrollToPic(){
	var isHidden = (document.getElementsByClassName("image-hidden image-warning")[0].style.display=="block");
	var isSpoilerd = (document.getElementsByClassName("image-spoilered image-warning")[0].style.display=="block");
	//if(isHidden||isSpoilerd){alert(isHidden+"|"+isSpoilerd);}
	//scrollToElem($_("image_display"));
	//scrollToElem(_("image-hidden image-warning")[0]);
	//scrollToElem(_("image-spoilered image-warning")[0]);
	//alert(findScrollPos($_("image_display")) + " | " + findScrollPos(_("image-hidden image-warning")[0]) + " | " + findScrollPos(_("image-spoilered image-warning")[0]) + " |=(-)=| " + (findScrollPos($_("image_display")) || findScrollPos(_("image-hidden image-warning")[0]) || findScrollPos(_("image-spoilered image-warning")[0])));
	window.scroll(0,(findScrollPos($_("image_display")) || findScrollPos(_("image-hidden image-warning")[0]) || findScrollPos(_("image-spoilered image-warning")[0])));
	checkButtonPos(0);


}

function setBigButtonPos(button,number,mode){
	if(mode) button.style.width = "25px";
	//button.style.height = "50px";
	//button.style.textAlign = "center";
	//button.style.verticalAlign="middle";
	//button.style.backgroundColor = "#dfd";
	//button.style.color = "black";
	//button.style.position = "fixed";
	//button.style.top = "10px";
	button.style.left = (10 + 60*number) + "px";
}
function setBigButtonPos(button,number){
	//button.style.width = "50px";
	//button.style.height = "50px";
	//button.style.textAlign = "center";
	//button.style.verticalAlign="middle";
	//button.style.backgroundColor = "#dfd";
	//button.style.color = "black";
	//button.style.position = "fixed";
	//button.style.top = "10px";
	button.style.left = (10 + 60*number) + "px";
}

function checkButtonPos(y){
    if( (buttonMoveMode != 2 && buttonMoveMode != 3) || buttonPosMode == 2) { //stay on top
        return;
    }
	var button = $_("hoverboxthingie");
	var h = getWindowSize().h;
	if(buttonPosMode == 3) {
		var transform = "translateY(" + (h-60) + "px)";
		button.style.position = "fixed";
		button.style.webkitTransform = transform;
		button.style.MozTransform = transform;
		button.style.transform = transform;
	}else{
		var scroll = getScrollXY().y;
		var buttons_stops = GM_getValue('buttonMoveMode') == 3; //3 = Laptop Mode 2
		var transform = "translateY(" + (y < h/2 ? ((scroll-metasection_offset>0+30)||(!buttons_stops) ?0:metasection_offset-scroll+30) : h-60) + "px)";
		button.style.position = "fixed";
		button.style.webkitTransform = transform;
		button.style.MozTransform = transform;
		button.style.transform = transform;
	}
}
function applyStyle(css, id){
	var style = document.getElementById("stylethingie_" + id);
	if (style || document.getElementById("stylethingie_" + id)){
		style = document.getElementById("stylethingie_" + id);
	}else{
		style=document.createElement('style');
		style.id = "stylethingie_" + id;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	if (style.styleSheet){
		style.styleSheet.cssText=css;
	}else{ 
		style.appendChild(document.createTextNode(css));
	}
}

function settings_page(){
	var css = "\
	#settingsbody {                                                               \n\
		margin: 0px auto;                                                         \n\
		padding: 1em;                                                             \n\
		text-align: center;                                                       \n\
	}                                                                             \n\
	#settingsbox{                                                                 \n\
		background-color:white;                                                   \n\
		color:black;                                                              \n\
		box-shadow: 0px 0px 40px rgb(33, 33, 33);                                 \n\
		padding: 1em;                                                             \n\
		///margin: auto !important;                                               \n\
		//width: auto;                                                            \n\
		//height: auto;                                                           \n\
		//width: 740px;                                                           \n\
		display:inline-block;                                                     \n\
		//float:left;                                                             \n\
		//overflow: auto;                                                         \n\
		text-align:left;                                                          \n\
		background-color: #ffffff;                                                \n\
		width: 400px;                                                             \n\
																				  \n\
	}                                                                             \n\
	#settingsbox * {                                                              \n\
		margin: 0;                                                                \n\
		padding: 0;                                                               \n\
		text-align: left;                                                         \n\
		line-height:1.5em;                                                        \n\
		display: inline-block;                                                    \n\
	}                                                                             \n\
	#settingsbox #settingsheader{															\n\
		width: 100%;             													\n\
	}                              													\n\
	#settingsbox .version{     														\n\
		text-align: right;          												\n\
		width: 100%;             													\n\
	}                              													\n\
																				  \n\
	#settingsbox label.description {                                              \n\
		border: medium none;                                                      \n\
		color: #222;                                                              \n\
		display: block;                                                           \n\
		font-size: 150%;                                                          \n\
		font-weight: 700;                                                         \n\
		///padding: 0px 0px 1px !important;                                       \n\
		font-family: \"Lucida Grande\",Tahoma,Arial,Verdana,sans-serif;           \n\
		font-size: small;                                                         \n\
	}                                                                             \n\
	#settingsbox input{                                                           \n\
		border: 1px solid #CDCDCD;                                                \n\
		background: #EEE;                                                         \n\
		background: none repeat scroll 0% 0% #EEE;                                \n\
	}                                                                             \n\
	#settingsbox input.checkbox,#settingsbox input.radio {                        \n\
		//display: block;                                                         \n\
		height: 13px;                                                             \n\
		line-height: 1.4em;                                                       \n\
		//margin: 7px 0px 1px 5px;                                                \n\
		width: 13px;                                                              \n\
	}                                                                             \n\
	#settingsbox label.choice {                                                   \n\
		color: #444;                                                              \n\
		//display: block;                                                         \n\
		display: inline-block;                                                    \n\
		font-size: small;                                                         \n\
		line-height: 1.4em;                                                       \n\
		//margin: -1.55em 0px 0px 25px;                                           \n\
		//padding: 4px 0px 5px !important;                                        \n\
		width: 90%;                                                               \n\
	}                                                                             \n\
	#settingsbox label {                                                          \n\
		font-family: \"Lucida Grande\",Tahoma,Arial,Verdana,sans-serif;           \n\
		text-align: left;                                                         \n\
		float: clear !important;                                                  \n\
		width:auto !important;                                                    \n\
		height:auto !important;                                                   \n\
	}                                                                             \n\
	#settingsbox .li,#settingsbox .ul{                                              \n\
		//padding: 0px;                                                           \n\
		///padding:4px 5px 2px 2px;                                               \n\
		list-style-type: none;                                                    \n\
		margin: 0px;                                                              \n\
		padding: 0px;                                                             \n\
	}                                                                             \n\
	#settingsbox .li{                                                              \n\
		margin-top: 1em;                                                          \n\
	}                                                                             \n\
	#settingsbox .li:first-child{                                                  \n\
		margin-top: 0;                                                            \n\
	}                                                                             \n\
	#settingsbox .li .grouper{                                                     \n\
		margin-left: 1em;                                                         \n\
	}                                                                             \n\
	#settingsbox .li .grouper label {                                              \n\
		margin-top: 0.5em;                                                        \n\
		display: block;                                                           \n\
	}                                                                             \n\
	#settingsbox .li .grouper .guidelines{                                         \n\
		margin-left: 2em;                                                       \n\
		display: block;                                                           \n\
	}                                                                             \n\
																				  \n\
	#settingsbox #li_dl p {                                                        \n\
		///padding:4px 0px 20px 30px;                                             \n\
	}                                                                             \n\
	#settingsbox #li_move p {                                                        \n\
		///padding:4px 0px 2px 30px;                                              \n\
	}                                                                             \n\
	#settingsbox .li .description, #settingsbox #li_style .grouper{                                         \n\
		display: block;                                                           \n\
	}                                                                             \n\
																				  \n\
	#settingsbox input.button {                                                   \n\
		font-size: 100%;                                                          \n\
		///margin:20px 0px 0px 0px;                                               \n\
		border: 1px solid darkgray;                                               \n\
		padding: 5px;                                                             \n\
																				  \n\
	}                                                                             \n\
	#settingsbox input.button:hover, #settingsbox input[type=\"button\"]:hover {  \n\
		font-size: 100%;                                                          \n\
		///margin:20px 0px 0px 0px;                                               \n\
		border: 1px solid dark-gray;                                              \n\
		color: black;                                                             \n\
		   -webkit-box-shadow: inset 0 0 10px #000000;                            \n\
		   -moz-box-shadow: inset 0 0 10px #000000;                               \n\
				box-shadow: inset 0 0  5px darkgrey;                              \n\
	}                                                                             \n\
	#settingsbox .block {                                                         \n\
		display: block;                                                           \n\
	}                                                                             \n\
	#settingsbox .element_style_bgcolor_colorresult {                               \n\
		border: 1px solid darkgrey;                                               	\n\
		padding: 5px 10px 5px 10px;                                               	\n\
	}                                                                             	\n\
	";
	applyStyle(css, "settings");
	//Settings

	settingsHTML="\
	<a name=\"settings\" /></a>                                                                                                                                                                                                                                                                               \n\
	<div id=\"settingsbox\" name=\"settingbox\" class=\"settingbox\">                                                                                                                                                                                                                                                                  \n\
	<div class=\"ul\">                                                                                                                                                                                                                                                                                                          \n\
		<div class=\"li\" id=\"settingsheader\" >                                                                                                                                                                                                                                                                                                          \n\
			<div class=\"title\">Derpiscript Settings</div> 																																																																										\n\
			<div class=\"version\">Script Version: <span id=\"versionField\">Error Displaying Version...</span></div> 																																																																										\n\
		</div class=\"li\">                                                                                                                                                                                                                                                                                                          \n\
		<div class=\"li\" id=\"li_dl\" >                                                                                                                                                                                                                                                                                         \n\
			<label class=\"description\" for=\"element_dl\">Download Settings</label>                                                                                                                                                                                                                              \n\
			<div class=\"grouper\" id=\"element_dl\">                                                                                                                                                                                                                                                              \n\
			   <div class=\"row\" id=\"row_1\">                                                                                                                                                                                                                                                              \n\
					<label class=\"choice\" for=\"element_dl_1\"><input id=\"element_dl_1\" name=\"element_dl_1\" class=\"element checkbox\" type=\"checkbox\" value=\"1\" />                                                                                                                                            \n\
					Raw Filename</label>                                                                                                                                                                                                                                                                              \n\
					<p class=\"guidelines\" for=\"element_dl_1\"><small>Set to <code>true</code>  to use the number only filename, e.g. \"197941.png\"<br>Set to <code>false</code> to use the full filename, e.g. \"197941__safe_rainbow+dash_artist-colon-luckydonald.png\"<br>Default is <code>false</code>.        \n\
					</small></p>                                                                                                                                                                                                                                                                                      \n\
			   </div>                                                                                                                                                                                                                                                                                                \n\
			   <div class=\"row\" id=\"row_2\">                                                                                                                                                                                                                                                              \n\
					<label class=\"choice\" for=\"element_dl_2\"><input id=\"element_dl_2\" name=\"element_dl_2\" class=\"element checkbox\" type=\"checkbox\" value=\"1\" />                                                                                                                                            \n\
					Rate on Download</label>                                                                                                                                                                                                                                                                          \n\
				<p class=\"guidelines\" for=\"element_dl_2\"><small>Set to <code>true</code>  to enable the automatic like/fave* when downloading the image.<br>Set to <code>false</code> to disable the automatic like/fave* function.<br>*) Specify in next line.<br>Default is <code>true</code>.</small></p>   \n\
			   </div>                                                                                                                                                                                                                                                                                                \n\
			   <div class=\"row\" id=\"row_3\">                                                                                                                                                                                                                                                              \n\
					<label class=\"choice\" for=\"element_dl_3\"><input id=\"element_dl_3\" name=\"element_dl_3\" class=\"element checkbox\" type=\"checkbox\" value=\"1\" />                                                                                                                                            \n\
					Vote-Up on Download</label>                                                                                                                                                                                                                                                                       \n\
					<p class=\"guidelines\" for=\"element_dl_3\"><small> Set to <code>true</code> to automaticly Vote Up when downloading the image.<br>Set to <code>false</code> to automaticly Fave the image when downloading the image.<br>Default is <code>true</code>.                                            \n\
					</small></p>                                                                                                                                                                                                                                                                                      \n\
			   </div>                                                                                                                                                                                                                                                                                                \n\
			</div>                                                                                                                                                                                                                                                                                                \n\
		</div class=\"li\">                                                                                                                                                                                                                                                                                                     \n\
		<div class=\"li\" id=\"li_move\" >                                                                                                                                                                                                                                                                                         \n\
			<label class=\"description\" for=\"element_buttmove\">EasyButtons Mode</label>                                                                                                                                                                                                                                    \n\
			<div class=\"grouper\" id=\"element_buttmove\">                                                                                                                                                                                                                                                              \n\
			   <div class=\"row\" id=\"row_4\">                                                                                                                                                                                                                                                              \n\
					<label class=\"choice\" for=\"element_move_1\"><input id=\"element_move_1\" name=\"element_buttmove\" class=\"element radio\" type=\"radio\" value=\"1\" />                                                                                                                                                    \n\
					Disable Button moving</label>                                                                                                                                                                                                                                                            \n\
					<p class=\"guidelines\" for=\"element_move_1\"><small>Disable Button moving.</small></p>                                                                                                                                                                                                    \n\
			   </div>                                                                                                                                                                                                                                                                                                \n\
			   <div class=\"row\" id=\"row_5\">                                                                                                                                                                                                                                                              \n\
					<label class=\"choice\" for=\"element_move_2\"><input id=\"element_move_2\" name=\"element_buttmove\" class=\"element radio\" type=\"radio\" value=\"2\" />                                                                                                                                                    \n\
					Laptop Mode 1 (default)</label>                                                                                                                                                                                                                                                                   \n\
					<p class=\"guidelines\" for=\"element_move_2\"><small>Use the Laptop Mode, coming with little bigger buttons, which will be positioned fix in the upper left corner, and almost transparent uppon hover.</small></p>                                                                                 \n\
			   </div>                                                                                                                                                                                                                                                                                                \n\
			   <div class=\"row\" id=\"row_6\">                                                                                                                                                                                                                                                              \n\
					<label class=\"choice\" for=\"element_move_3\"><input id=\"element_move_3\" name=\"element_buttmove\" class=\"element radio\" type=\"radio\" value=\"3\" />                                                                                                                                                    \n\
					Laptop Mode 2</label>                                                                                                                                                                                                                                                                             \n\
					<p class=\"guidelines\" for=\"element_move_3\"><small>Use the Laptop Mode, like above, but the buttons will not move higher then the picture beginning.</small></p>                                                                                                                                  \n\
				</div>                                                                                                                                                                                                                                                                                                \n\
																																																																												 \n\
																																																																												  \n\
			</div>                                                                                                                                                                                                                                                                                                \n\
		</div class=\"li\">                                                                                                                                                                                                                                                                                                 \n\
		<div class=\"li\" id=\"li_buttpos\" >                                                                                                                                                                                                                                                                                         \n\
			<label class=\"description\" for=\"element_buttpos\">EasyButtons Position</label>                                                                                                                                                                                                                                    \n\
			<div class=\"grouper\" id=\"element_buttpos\">                                                                                                                                                                                                                                                              \n\
			   <div class=\"row\">                                                                                                                                                                                                                                                              \n\
					<label class=\"choice\" for=\"element_buttpos_1\"><input id=\"element_buttpos_1\" name=\"element_buttpos\" class=\"element radio\" type=\"radio\" value=\"1\" />                                                                                                                                                    \n\
					Automatic (Default)</label>                                                                                                                                                                                                                                                            \n\
					<p class=\"guidelines\" for=\"element_buttpos_1\"><small>Button will positioned either top or bottom, depending on the mouse position.</small></p>                                                                                                                                                                                                    \n\
			   </div>                                                                                                                                                                                                                                                                                                \n\
			   <div class=\"row\">                                                                                                                                                                                                                                                              \n\
					<label class=\"choice\" for=\"element_buttpos_2\"><input id=\"element_buttpos_buttpos\" name=\"element_buttpos\" class=\"element radio\" type=\"radio\" value=\"2\" />                                                                                                                                                    \n\
					Top</label>                                                                                                                                                                                                                                                                   \n\
					<p class=\"guidelines\" for=\"element_buttpos_2\"><small>Buttons will be positioned fix in the upper left corner.</small></p>                                                                                 \n\
			   </div>                                                                                                                                                                                                                                                                                                \n\
			   <div class=\"row\">                                                                                                                                                                                                                                                              \n\
					<label class=\"choice\" for=\"element_buttpos_3\"><input id=\"element_buttpos_3\" name=\"element_buttpos\" class=\"element radio\" type=\"radio\" value=\"3\" />                                                                                                                                                    \n\
					Bottom</label>                                                                                                                                                                                                                                                                             \n\
					<p class=\"guidelines\" for=\"element_buttpos_3\"><small>Buttons will be positioned fix in the lower left corner.</small></p>                                                                                                                                  \n\
				</div>                                                                                                                                                                                                                                                                                                \n\
			</div>                                                                                                                                                                                                                                                                                                \n\
		</div class=\"li\">  																																																									\n\
		<div class=\"li\" id=\"li_style\" >                                                                                                                                                                                                                                                                                     \n\
			<label class=\"description\" for=\"element_style\">Styles</label><br>                                                                                                                                                                                                                                         \n\
			<div class=\"grouper\" id=\"element_style\">                                                                                                                                                                                                                                                              \n\
				<div class=\"row\" id=\"row_7\">                                                                                                                                                                                                                                                              \n\
					<div class=\"block\">                                                                                                                                                                                                                                                                             \n\
						<label class=\"choice\" for=\"element_style_bgcolor_colorpicker\">Background color &nbsp; </label>                                                                                                                                                                                                                         \n\
						<input id=\"element_style_bgcolor_colorpicker\" name=\"element_style_bgcolor_colorpicker\" class=\"element colorpicker\" type=\"color\" value=\"#FFFFFF\"/>                                                                                                                                                                                             \n\
						<span class=\"colorresult\" id=\"element_style_bgcolor_colorresult\">#FFFFFF</span>                                                                                                                                                                                                                        \n\
					</div>                                                                                                                                                                                                                                                                                            \n\
					<p class=\"guidelines\" for=\"element_style_bgcolor_colorpicker\"><small>Set the backgrund color. <br> Default is <code>#FFFFFF</code>, but my recommendation is <code>#777777</code>.                                                                                                                                                                                    \n\
					</small></p>                                                                                                                                                                                                                                                                                      \n\
			   </div>                                                                                                                                                                                                                                                                                                \n\
			   <div class=\"row\">                                                                                                                                                                                                                                                              \n\
					<div class=\"block\">                                                                                                                                                                                                                                                                             \n\
						<label class=\"choice\" for=\"element_style_linkcolor_colorpicker\">Link color &nbsp; </label>                                                                                                                                                                                                                         \n\
						<input id=\"element_style_linkcolor_colorpicker\" name=\"element_style_linkcolor_colorpicker\" class=\"element colorpicker\" type=\"color\" value=\"#57A4DB\"/>                                                                                                                                                                                             \n\
						<span class=\"colorresult\" id=\"element_style_linkcolor_colorresult\">#57A4DB</span>                                                                                                                                                                                                                        \n\
					</div>                                                                                                                                                                                                                                                                                            \n\
					<p class=\"guidelines\" for=\"element_style_bgcolor_colorpicker\"><small>Set the link color. <br> Default is <code>#57A4DB</code>.                                                                                                                                                                                    \n\
						</small></p>                                                                                                                                                                                                                                                                                      \n\
				   </div>                                                                                                                                                                                                                                                                                                \n\
				</div>                                                                                                                                                                                                                                                                                                \n\
			</div class=\"li\">                                                                                                                                                                                                                                                                                                 \n\
			<div class=\"li\" id=\"li_0\" >                                                                                                                                                                                                                                                                                     \n\
				<input type=\"button\" id=\"prefResetButton\" class=\"element reset button\" value=\"Reset\"/>                                                                                                                                                                    \n\
				<input type=\"button\" id=\"prefSubmitButton\" class=\"element submit button\" value=\"Save\"/>                                                                                                                                                                    \n\
			</div class=\"li\">                                                                                                                                                                                                                                                                                                 \n\
			<div class=\"li\" id=\"li_-1\" >                                                                                                                                                                                                                                                                                    \n\
				<div id=\"successfield\" class=\"\"></div>                                                                                                                                                                                                                                                     \n\
		   </div class=\"li\">                                                                                                                                                                                                                                                                                                         \n\
		</div class=\"ul\">                                                                                                                                                                                                                                                                                                     \n\
		</div>                                                                                                                                                                                                                                                                                                    \n\
		</div>                                                                                                                                                                                                                                                                                                    \n\
	";
	var settingsBody=document.createElement('div');
	settingsBody.id = "settingsbody";
	settingsBody.innerHTML= settingsHTML;
	document.getElementsByTagName('body')[0].appendChild(settingsBody);

	$_("versionField").innerHTML = scriptVersion; 
	var buttonElem = $_("prefSubmitButton");
	var resetElem = $_("prefResetButton");
	var successfield =  $_("successfield");
	successfield.style.display = "hidden";
	buttonElem.addEventListener('click', saveoptions, false);
	resetElem.addEventListener('click', resetoptions, false);


	// Setting the init values for the Settings.

	$_("element_dl_1").checked=GM_getValue('useRawFile',false);
	$_("element_dl_2").checked=GM_getValue('rateOnDownload', true);
	$_("element_dl_3").checked=GM_getValue('useVoteUp', true);

	theButtonMode = GM_getValue('buttonMoveMode',1);
	var buttonMoveModes = document.getElementsByName("element_buttmove");
	for(var i = 0; i<buttonMoveModes.length; i++){
		buttonMoveModes[i].checked = (buttonMoveModes[i].value==theButtonMode); //buttonMoveMode
	}

	thePosMode = GM_getValue('buttonPositionMode',0);
	var buttonPosModes = document.getElementsByName("element_buttpos");
	for(var i = 0; i<buttonPosModes.length; i++){
		buttonPosModes[i].checked = (buttonPosModes[i].value==thePosMode); //buttonMoveMode
	}
	bgColor = GM_getValue('backgroundColor');
	linkColor = GM_getValue('linkColor');
	contrastBgColor = getContrastYIQ_BW(bgColor);
	setPickerColor("bgcolor", bgColor);
	setPickerColor("linkcolor", linkColor);
	bgPicker = $_("element_style_bgcolor_colorpicker");
	bgPicker.addEventListener('click', checkColor, false);
	bgPicker.addEventListener('click', function(){
		console.log(checkColor($_("element_style_bgcolor_colorpicker").value));
	}, false);
	bgPicker.addEventListener("input", function(){
		setColorOfResult("bgcolor");
	}, false);

	linkPicker = $_("element_style_linkcolor_colorpicker");
	linkPicker.addEventListener('click', checkColor, false);
	linkPicker.addEventListener("input", function(){
		setColorOfResult("linkcolor");
	}, false);

}

function image_page(pagetype){
	//get Links ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var next_img_page_href = document.getElementsByClassName("next")[0].getElementsByTagName('a')[0].href;
	var last_img_page_href = document.getElementsByClassName("prev")[0].getElementsByTagName('a')[0].href;
	var rand_img_page_href = document.getElementsByClassName("rand")[0].getElementsByTagName('a')[0].href;
	var up_vote_page_href = location.href;
	var down_vote_page_href = location.href;
	var fave_vote_page_href = location.href;

	var metasection_divs = document.getElementsByClassName("metasection");
	var full_img_src = "View is spy!";
	var download_img_src = "DL is spy!";


	for (var i2 = 0; i2 < metasection_divs.length; i2++) {
		var meta_each = metasection_divs[i2].getElementsByTagName('a');
		for (var i = 0; i < meta_each.length; i++) {
			var each = meta_each[i];
			//alert(each);
			if (each.length != 0){
				if( each.innerHTML == "View"){
					full_img_src = each.href;
					each.setAttribute('target', '_blank');
					each.setAttribute('onclick', 'this.focus()');
				}else if( each.innerHTML == "Download" && !useRawFile){
					download_img_src = each.href;
					download_img_src = download_img_src.replace('http://','https://');
				}else if( each.innerHTML == "DLS" && useRawFile){
					download_img_src = each.href;
					download_img_src = download_img_src.replace('http://','https://');
				}else if( each.innerHTML == "Up"){
					up_vote_page_href = each;
				}else if( each.innerHTML == "Down"){
					down_vote_page_href = each;
				}else if( each.innerHTML == "Fave"){
					fave_vote_page_href = each;
				}else{
					//alert(each.innerHTML + " = " + each.href);
				}
			}
		}
	}

	// Vars ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var current_mode = 1;

	var loaded=false;

	//Gui
	var all_=document.createElement('div');
	all_.id='own_content';
	var img_div = document.createElement('div');
	var img_status = document.createElement('h1');
	var img_cover = document.createElement('h1');
	img_div.style.display='none';

	img_div.style.position = "absolute";
	img_div.style.backgroundColor = "red";
	img_div.style.left = "0";
	img_div.style.top = "0";

	img_status.style.float='center';
	img_status.innerHTML ='-';
	img_status.style.display='none';

	img_cover.style.float='center';
	img_cover.innerHTML ='-';
	img_cover.style.display='none';

	var img_img=document.createElement('img');
	img_img.src='';
	img_img.style.display='none';
	img_div.appendChild(img_status);
	img_div.appendChild(img_cover);
	img_div.appendChild(img_img);

	var img_frame=document.createElement('iframe');
	img_frame.src='';
	img_frame.href='';
	img_frame.style.display='none';
	img_div.appendChild(img_frame);
	var vote_frame=document.createElement('iframe');
	vote_frame.src='';
	vote_frame.href='';
	vote_frame.id='vote_frame';
	vote_frame.style.display='none';
	img_div.appendChild(vote_frame);

	var all_note = document.createElement('h1');
	all_note.style.float='center';
	all_note.innerHTML ='-';
	all_note.style.display='none';

	all_.appendChild(all_note);

	if(false){
		while (document.body.lastChild != null ) {
		document.body.removeChild(document.body.lastChild);
		document.title=document.body.lastChild;
		}
	}

	document.body.appendChild(img_div);
	document.body.appendChild(all_);


	// The Buttons again. ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	document.body.onmousemove = function(evt){
		evt = (evt) ? evt : ((window.event) ? window.event : "");
		checkButtonPos(evt.clientY||1);
	}
	document.body.onscroll = function(evt){
		evt = (evt) ? evt : ((window.event) ? window.event : "");
		checkButtonPos(evt.clientY||1);
	}
	var last_img_button = document.getElementsByClassName("prev")[0];
	var next_img_button = document.getElementsByClassName("next")[0];
	var load_img_button = document.createElement('span');
	var button_parent = document.getElementsByClassName("metabar")[0];
	var sub_element = document.createElement('div');
	var load_img_button_link = document.createElement('a');
	load_img_button_link.addEventListener('click', bookmark, false);
	load_img_button_link.innerHTML='<span class="download-span" title="Download image and vote it up/fave it."><i class="fa fa-arrow-down"></i></span>';
	load_img_button.appendChild(load_img_button_link);
	sub_element.appendChild(last_img_button);
	//sub_element.appendChild(load_img_button);
	sub_element.appendChild(load_img_button); //TODO Download;
	sub_element.appendChild(next_img_button);
	if(GM_getValue('buttonMoveMode') == 1){
		sub_element.setAttribute("class","metasection");
	}
	sub_element.id="hoverboxthingie";


	//load_img_button.innerHTML='<i class="fa fa-arrow-down"></i>';
	if(button_parent.firstChild){
		button_parent.insertBefore(sub_element, button_parent.firstChild);
	}else {
		button_parent.appendChild(sub_element);
	}
	if(GM_getValue('buttonMoveMode') == 1){
			sub_element.style.position = "inline-block";
	}
	//sub_element.style.opacity = "0.4";
	checkButtonPos(0);
	setBigButtonPos(last_img_button,0);
	setBigButtonPos(load_img_button,1,true);
	setBigButtonPos(next_img_button,1.5);
	//setBigButtonPos(link,2);
	checkButtonPos(0);
}

var css='\
@-webkit-keyframes pusate { 							\n\
	from { box-shadow: 0 0 5px #c00; }					\n\
	to { box-shadow: 0 0 10px #c00; }					\n\
}														\n\
@-moz-keyframes pusate {								\n\
	from { box-shadow: 0 0 5px #c00; }					\n\
	to { box-shadow: 0 0 10px #c00; }					\n\
}														\n\
@keyframes pusate {										\n\
	from { box-shadow: 0 0 5px #c00; }					\n\
	to { box-shadow: 0 0 10px #c00; }					\n\
}														\n\
.warningAusruf {										\n\
    -webkit-animation: pusate 1s ease-in-out infinite	\n\
       -moz-animation: pusate 1s ease-in-out infinite	\n\
        -ms-animation: pusate 1s ease-in-out infinite	\n\
         -o-animation: pusate 1s ease-in-out infinite	\n\
            animation: pusate 1s ease-in-out infinite	\n\
}          												\n';
if(GM_getValue('buttonMoveMode') != 1) {
css +='\
	#hoverboxthingie a {           \n\
		opacity:0.3;               \n\
		height: 20px;              \n\
		width: 50px;               \n\
		color: white;              \n\
		vertical-align: center;    \n\
		background-color: rgba(81, 158, 215, 0.3);\n\
		border: 1px solid #519ED7; \n\
	}                              \n\
	#hoverboxthingie:hover a{      \n\
		opacity:0.5;               \n\
		color: black;              \n\
		background-color: #519ED7; \n\
		border: 1px solid transparent;           \n\
	}                              \n\
	#hoverboxthingie a:hover{      \n\
		opacity:1;                 \n\
		background-color: #dfd;    \n\
	}                              \n\
	#hoverboxthingie {             \n\
		height: 20px;              \n\
        position: fixed;           \n\
        top: 10px;                 \n\
        left: 10px;                \n\
    }                                            \n\
	#hoverboxthingie span {                         \n\
        padding: 0;                            \n\
	}                                            \n\
	#hoverboxthingie, #hoverboxthingie a {       \n\
		-webkit-transition:all 0.3s ease-in-out; \n\
		   -moz-transition:all 0.3s ease-in-out; \n\
		     -o-transition:all 0.3s ease-in-out; \n\
		        transition:all 0.3s ease-in-out; \n\
	}                                            \n\
	';
}else{
    css+='\
    #hoverboxthingie span {                      \n\
        padding: 2px;                            \n\
	}                                            \n\
';
}
css +='		                                         \n\
		                                         \n\
	#hoverboxthingie a {                         \n\
        width: 50px;                             \n\
		text-align: center;                      \n\
        padding: 2px;                            \n\
	}                                            \n\
\
.image_description, .image_description H3, #imagespns, #comments{               \n\
    color: black;                                                             	\n\
}                                                                             	\n\
body{                        													\n\
    color: ' + getContrastYIQ_BW(GM_getValue('backgroundColor')) + ';                     \n\
    background-color: ' + GM_getValue('backgroundColor') + ';                             \n\
}																				\n\
a{                        														\n\
    color: '+GM_getValue('linkColor')+';                                        \n\
}																				\n\
 a:visited{                       											  \n\
    color: '+(getContrastYIQ(GM_getValue('linkColor')) ? darkerColor(GM_getValue('linkColor'), .1) : lighterColor(GM_getValue('linkColor'), .1))+';                                                             \n\
}																				\n\
 a:hover{                       											  \n\
    color: '+(getContrastYIQ(GM_getValue('linkColor')) ? darkerColor(GM_getValue('linkColor'), .3) : lighterColor(GM_getValue('linkColor'), .3))+';                                                             \n\
}                                                                             \n\
';
//TODO apply style
applyStyle(css, "bla");
window.onload = scrollToPic;






//Init Key Bindings
window.addEventListener("keypress" , function(e){
	if (e.shiftKey === true){
		return false;
	}
    if (document.activeElement != document.body){
        console.log("Hotkey canceled, because "+ document.activeElement + " is focused.");
        return false;
    }
	if(e.keyCode == 35){ //kp_1
		img_goto('-');
	}else if(e.keyCode == "+"){ //Down
		bookmark();
	}else if(e.keyCode == 34){//kp_3
		img_goto('+');
	}else if(e.keyCode == 12){ //kp_5
		img_goto('#');
	} else if(e.keyCode == 13){ //Enter or Zero
		bookmark();
	} else if(e.keyCode == 0){ //Other Keys
		if(e.charCode == 45) { // "-" kp_minus
		   prono();
        }else if(e.charCode == 43){
          		img_goto('r');
        }
	}else{
	   //alert(e.keyCode);
	}
}, false);






function setColorOfResult(name){
	backgroundColor = $_("element_style_" + name + "_colorpicker").value;
	//setPickerColor(name, backgroundColor);
	var resultElement = $_("element_style_" + name + "_colorresult");
    resultElement.innerHTML = backgroundColor; //backgroundColor
    resultElement.style.backgroundColor = backgroundColor; //backgroundColor
    resultElement.style.color = getContrastYIQ_BW(backgroundColor); //backgroundColor
}
/**
 * saves the settings.
 */ 
function saveoptions(){
    var successfield =  $_("successfield");
    var elem = $_("settingsbox");
    var eins_1 = $_("element_dl_1"); //useRawFile
    GM_setValue('useRawFile',eins_1.checked);
    var eins_2 = $_("element_dl_2"); //rateOnDownload  
    GM_setValue('rateOnDownload',eins_2.checked);
    var eins_3 = $_("element_dl_3"); //useVoteUp
    GM_setValue('useVoteUp',eins_3.checked);
    
    
    theButtonMode = 0;
    var buttonMoveModes = document.getElementsByName("element_buttmove");
    for(var i = 0; i<buttonMoveModes.length; i++){
        if (buttonMoveModes[i].checked==true){
            theButtonMode =  buttonMoveModes[i].value; //buttonMoveMode
        }
    }
	thePosMode = 0;
    var buttonPosModes = document.getElementsByName("element_buttpos");
    for(var i = 0; i<buttonPosModes.length; i++){
        if (buttonPosModes[i].checked==true){
            thePosMode =  buttonPosModes[i].value; //buttonPosMode
        }
    }


    GM_setValue('backgroundColor',$_("element_style_bgcolor_colorpicker").value);//TODO: validate color as real color.
	GM_setValue('linkColor', $_("element_style_linkcolor_colorpicker").value);//TODO: validate color as real color.
    GM_setValue('buttonMoveMode',theButtonMode);
	GM_setValue('buttonPositionMode',thePosMode);

    var theArray = GM_listValues();
    //alert("{"+theArray +"}");
    successfield.innerHTML = "Successfully saved. Please <a href='javascript:location.reload();' onclick='location.reload();'>refresh</a> the page.";
    successfield.style.display = "block";
    successfield.style.color = "green";
    successfield.style.backgroundColor = "lightgreen";//drei_color;
}
/**
 * resetts the settings.
 */ 
function resetoptions(){
    var successfield =  $_("successfield");

    var useRawFile = false; 
   	var rateOnDownload = true;
	var useVoteUp = true;
    var buttonMoveMode = 2;    
    var buttonPosMode = 1;    
    var backgroundColor = "#FFFFFF";
	var linkColor = "#57A4DB";
	$_("element_dl_1").checked = useRawFile;
	$_("element_dl_2").checked = rateOnDownload;
	$_("element_dl_3").checked = useVoteUp;

	var buttonMoveModes = document.getElementsByName("element_buttmove");
	for(var i = 0; i<buttonMoveModes.length; i++){
		buttonMoveModes[i].checked = (buttonMoveModes[i].value==buttonMoveMode); //buttonMoveMode
	}
	var buttonPosModes = document.getElementsByName("element_buttpos");
	for(var i = 0; i<buttonPosModes.length; i++){
		buttonPosModes[i].checked = (buttonPosModes[i].value==buttonPosMode); //buttonPosMode
	}
	setPickerColor("bgcolor", backgroundColor);
	setPickerColor("linkcolor", linkColor);
	
    successfield.innerHTML = "Did reset the settings, but <b>not</b> saved yet!";
    successfield.style.display = "block";
    successfield.style.color = "gray";
    successfield.style.backgroundColor = "lightgray";
}
function setPickerColor(name,color){
	contrastColor = getContrastYIQ_BW(backgroundColor);
	colorPickerElement = $_("element_style_" + name + "_colorpicker");
	colorPickerElement.value = color; //backgroundColor
	colorResultElement = $_("element_style_" + name + "_colorresult");
	colorResultElement.innerHTML = color; //backgroundColor
	colorResultElement.style.backgroundColor = color; //backgroundColor
	colorResultElement.style.color = contrastColor; //backgroundColor
}